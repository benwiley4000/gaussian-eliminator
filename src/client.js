import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './components/App';
import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    applyMiddleware(sagaMiddleware)
  ),
);

sagaMiddleware.run(rootSaga);

function renderApp (AppComponent) {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => renderApp(App));
  module.hot.accept('./reducer', () => store.replaceReducer(reducer));
}
