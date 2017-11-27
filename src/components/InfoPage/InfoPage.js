import React, { Component } from 'react';
import './InfoPage.css';

class InfoPage extends Component {
  render() {
    return (
    <div className="info-page">
      <h1>InfoPage content</h1>
      <p>
        type: {this.props.match.params.type}, id: {this.props.match.params.id}
      </p>
    </div>
    )
  }
}

export default InfoPage