import React, { Component } from 'react';
import './InfoFilm.css';

class InfoFilm extends Component {

  render() {
    return (
    <div className="info-film">
      <h1>{this.props.data.title}</h1>
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    </div>
    )
  }
}

export default InfoFilm