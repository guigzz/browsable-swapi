import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
  render() {
    const sizeClass = (this.props.size && this.props.size === "small") ? "small" : "";
    const colorClass = (this.props.color && this.props.color === "reversed") ? "reversed" : "";
    return (
      <div className={`loading level is-mobile ${sizeClass} ${colorClass}`}>
        <div className="level-item">
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
            <div className="loader-text"><p>{this.props.text}</p></div>
        </div>
      </div>
    )
  }
}

export default Loader