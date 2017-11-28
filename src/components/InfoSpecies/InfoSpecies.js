import React, { Component } from 'react';
import './InfoSpecies.css';

class InfoSpecies extends Component {

  render() {
    return (
    <div className="info-species">
      <h1>{this.props.data.name}</h1>
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    </div>
    )
  }
}

export default InfoSpecies