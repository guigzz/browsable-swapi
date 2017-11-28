import React, { Component } from 'react';
import './InfoPeople.css';

class InfoPeople extends Component {

  render() {
    return (
    <div className="info-people">
      <h1>{this.props.data.name}</h1>
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    </div>
    )
  }
}

export default InfoPeople