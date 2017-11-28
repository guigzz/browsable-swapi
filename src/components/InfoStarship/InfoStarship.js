import React, { Component } from 'react';
import './InfoStarship.css';

class InfoStarship extends Component {

  render() {
    return (
    <div className="info-starship">
      <h1>{this.props.data.name}</h1>
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    </div>
    )
  }
}

export default InfoStarship