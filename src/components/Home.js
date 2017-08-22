import React, { Component } from 'react';
import { linearsystems, linearequations } from 'pure-linear-algebra';
import './Home.css';
import LinearSystemEditor from './LinearSystemEditor';

const defaultSystem = new linearsystems.LinearSystem([
  new linearequations.LinearEquation([3, 4, 5, 4], 19),
  new linearequations.LinearEquation([54, 2, -2, 5], -1)
]);

class Home extends Component {
  render () {
    return (
      <div className="Eliminator">
        <div className="Eliminator-header">
          <h1>The Gaussian Eliminator</h1>
        </div>
        <div className="Eliminator-body container">
          <div className="row justify-content-center">
            <p className="col-12">Welcome to the Gaussian Eliminator.</p>
            <LinearSystemEditor system={defaultSystem} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
