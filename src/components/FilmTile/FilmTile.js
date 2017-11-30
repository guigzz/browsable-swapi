import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FilmTile.css';
import { POSTERS } from '../../utils/constants';

class FilmTile extends Component {
  render() {
    return (
      <div className="columns is-centered film-tile-container">
        <div className="column film-tile is-four-fifths-tablet is-two-thirds-widescreen">
          <Link to={`/info/films/${this.props.data.episode_id}`}>
            <div className="columns is-mobile">
              <div className="column is-narrow film-image">
                <img className="" src={POSTERS[this.props.data.episode_id -1]} alt={this.props.data.title} /> 
              </div>
              <div className="column film-data">
                <div className="film-data-content">
                  <h1>Ep. {this.formatEpisode(this.props.data.episode_id)}: {this.props.data.title}</h1>
                  <p><span className="field-name">Director: </span><span className="field-value">{this.props.data.director}</span></p>
                  <p><span className="field-name">Producer: </span><span className="field-value">{this.props.data.producer}</span></p>
                  <p><span className="field-name">Release Date: </span><span className="field-value">{this.props.data.release_date}</span></p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  formatEpisode(ep) {
    switch (ep) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
      case 5:
        return "V";
      case 6:
        return "VI";
      case 7:
        return "VII";
      default:
        return ""
    }
  }
}

export default FilmTile