import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InfoPlanet.css';
import { extractId } from '../../utils/functions';

class InfoPlanet extends Component {
  constructor() {
    super();

    this.generalFields = [
      "rotation_period", "orbital_period", "diameter", "climate", "gravity", "terrain", "surface_water", "population"
    ];

    this.state = {
      people: null,
      films: null
    };
  }

  render() {
    return (
    <div className="info-planet box container">
      <div className="title"><span>{this.props.data.name}</span></div>
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column is-half-tablet illustration">
              <img className="" src="http://via.placeholder.com/200x300" alt={this.props.data.name} />
            </div>
            <div className="column is-half-tablet general-info">
              {this.generalFields.map((field) => {
                return <p key={field}><span className="field-name">{field}: </span><span className="field-value">{this.props.data[field]}</span></p>
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-two-thirds links-container">

          {/* RESIDENTS (PEOPLE) */}
          <div>
          {
            this.props.data.residents.length > 0 
            ? (
              <div className="people-section">
                <div>
                  {
                    this.state.people === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handlePeopleClick.bind(this)}>RESIDENTS <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">RESIDENTS <span className="caret">&#10225;</span></span>
                          </h2>
                          <ul className="elements-container">
                            {this.state.people.map((elm) => {
                              return (
                                <Link key={elm.name} to={`/info/people/${extractId(elm.url)}`}>
                                  <li>{elm.name}</li>
                                </Link>
                              )
                            })}
                          </ul>
                        </div>
                      )
                  }
                </div>
              </div>
            )
            : null
          }
          </div>

          {/* FILMS */}
          <div>
          {
            this.props.data.films.length > 0 
            ? (
              <div className="films-section">
                <div>
                  {
                    this.state.films === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handleFilmClick.bind(this)}>FILMS <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">FILMS <span className="caret">&#10225;</span></span>
                          </h2>
                          <ul className="elements-container">
                            {this.state.films.map((elm) => {
                              return (
                                <Link key={elm.episode_id} to={`/info/films/${extractId(elm.url)}`}>
                                  <li>{elm.title}</li>
                                </Link>
                              )
                            })}
                          </ul>
                        </div>
                      )
                  }
                </div>
              </div>
            )
            : null
          }
          </div>


        </div>
      </div>
    </div>
    )
  }

  handlePeopleClick(e) {
    for(let people of this.props.data.residents) {
      fetch(people)
      .then( response => response.json())
      .then( (res) => {
        if(this.state.people === null) {
          this.setState({
            people: [res]
          });
        }
        else {
          this.setState({
            people: [...this.state.people, res]
          });
        }
      });
    }
  }

  handleFilmClick(e) {
    for(let film of this.props.data.films) {
      fetch(film)
      .then( response => response.json())
      .then( (res) => {
        if(this.state.films === null) {
          this.setState({
            films: [res]
          });
        }
        else {
          this.setState({
            films: [...this.state.films, res]
          });
        }
      });
    }
  }
}

export default InfoPlanet