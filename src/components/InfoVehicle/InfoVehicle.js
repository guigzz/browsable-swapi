import React, { Component } from 'react';
import './InfoVehicle.css';

class InfoVehicle extends Component {

  render() {
    return (
    <div className="info-vehicle">
      <h1>{this.props.data.name}</h1>
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    </div>
    )
  }
}

export default InfoVehicle