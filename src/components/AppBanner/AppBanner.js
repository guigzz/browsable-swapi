import React, { Component } from 'react';
import './AppBanner.css';


class AppBanner extends Component {
  render() {
    return (
      <div className="app-banner">
        <div className="app-banner-logo"><span className="swg swg-starwars swg-3x"></span></div>
        <div className="app-banner-subtitle"><span>Browsable API</span></div>
      </div>
    );
  }
}

export default AppBanner;
