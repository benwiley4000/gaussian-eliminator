import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import HomeContainer from './HomeContainer';
import './App.css';

const App = () =>
  <Switch>
    <Route exact path="/" component={HomeContainer} />
  </Switch>;

export default App;
