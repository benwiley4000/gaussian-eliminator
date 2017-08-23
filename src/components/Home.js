import React, { Component } from 'react';
import './Home.css';
import LinearSystemEditor from './LinearSystemEditor';

class Home extends Component {
  render () {
    return (
      <div className="Eliminator">
        <div className="Eliminator-header">
          <h1>The Gaussian Eliminator</h1>
        </div>
        <div className="Eliminator-body container">
          <div className="row justify-content-center">
            <h4 className="col-12 prompt">Enter a linear system to solve</h4>
            <LinearSystemEditor />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
