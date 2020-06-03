import React, { Component } from "react";
import MapDisplay from "./page_components/MapDisplay";

import Form from 'react-bootstrap/Form';

export class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Track the parameters that are checked in a dictionary to make updating simple
      checkboxes: {
        'strategyChecked': true,
        'engineeringChecked': true,
        'infrastructureChecked': true
      },
    }

    this.checkedClick = this.checkedClick.bind(this);
  }

  /**
   * Update the checked
   * @param {*} evt - checked object 
   */
  checkedClick(evt) {
    // Note: not conventional in React, but we are following this up with 'forceUpdate'
    // (does not matter as shouldComponentUpdate() is not needed here)
    this.state.checkboxes[evt.target.name] = !(this.state.checkboxes[evt.target.name])
    this.forceUpdate()
  }
  render() {
    return (
      <div className="App" >
        <div key='inline-checkbox' className="mb-3" style={{'margin': '8px 12px'}}>
          <Form.Check inline label="Strategy" name="strategyChecked" type='checkbox' id='inline-checkbox-1' checked={this.state.checkboxes['strategyChecked']} onClick={this.checkedClick}/>
          <Form.Check inline label="Engineering" name="engineeringChecked" type='checkbox' id='inline-checkbox-1' checked={this.state.checkboxes['engineeringChecked']} onClick={this.checkedClick}/>
          <Form.Check inline label="Infrastructure" name="infrastructureChecked" type="checkbox" id='inline-checkbox-1' checked={this.state.checkboxes['infrastructureChecked']} onClick={this.checkedClick}/>
        </div>
        <MapDisplay />
      </div>
    );
  }
}

export default MainPage;
