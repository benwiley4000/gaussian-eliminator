import React, { Component } from 'react';
import logo from './react.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Eliminator">
        <div className="Eliminator-header">
          <h1>The Gaussian Eliminator</h1>
        </div>
        <div className="Eliminator-body container">
          <div className="row justify-content-center">
            <p className="col-12">Welcome to the Gaussian Eliminator.</p>
            <div className="linear-system">
              <div className="row linear-equation align-items-center">
                <div className="input-group variable">
                  <input className="form-control" pattern="[0-9]*" type="number" />
                  <span className="input-group-addon"><var>x</var></span>
                </div>
                <span className="operator">+</span>
                <div className="input-group variable">
                  <input className="form-control" pattern="[0-9]*" type="number" />
                  <span className="input-group-addon"><var>y</var></span>
                </div>
                <span className="operator">=</span>
                <span className="constant">19</span>
              </div>
              <div className="row linear-equation align-items-center">
                <div className="input-group variable">
                  <input className="form-control" pattern="[0-9]*" type="number" />
                  <span className="input-group-addon"><var>x</var></span>
                </div>
                <span className="operator">+</span>
                <div className="input-group variable">
                  <input className="form-control" pattern="[0-9]*" type="number" />
                  <span className="input-group-addon"><var>y</var></span>
                </div>
                <span className="operator">=</span>
                <span className="constant">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
