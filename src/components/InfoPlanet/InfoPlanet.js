import React, { Component } from 'react';
import './InfoPlanet.css';

class InfoPlanet extends Component {

  render() {
    return (
    <div className="info-planet">
      <h1>{this.props.data.name}</h1>
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    </div>
    )
  }
}

export default InfoPlanet