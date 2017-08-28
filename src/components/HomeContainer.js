import { connect } from 'react-redux';
import { getLastActionForSystem } from '../selectors/system';
import Home from './Home';

function mapStateToProps (state) {
  return {
    lastActionForSystem: getLastActionForSystem(state)
  };
}

export default connect(mapStateToProps)(Home);
