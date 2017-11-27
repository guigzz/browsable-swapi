import React, { Component } from 'react';
import './SearchBarResultItem.css';

class SearchBarResultItem extends Component {
  render() {
    return (
      <div className="searchbar-results-item">
        <div className="main-text">{this.props.text}</div>
        <div className="sub-text">{this.props.subText}</div>
      </div>
    )
  }
}

export default SearchBarResultItem