import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InfoFilm.css';
import { extractId } from '../../utils/functions';

class InfoFilm extends Component {
  constructor() {
    super();

    this.generalFields = [
      "episode_id", "director", "producer", "release_date"
    ];

    this.state = {
      people: null,
      species: null,
      vehicles: null,
      starships: null,
      planets: null
    };
  }

  render() {
    return (
    <div className="info-film box container">
      <div className="title"><span>{this.props.data.title}</span></div>
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column is-half-tablet illustration">
              <img className="" src="http://via.placeholder.com/200x300" alt={this.props.data.title} />
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

          {/* CHARACTERS (PEOPLE) */}
          <div>
          {
            this.props.data.characters.length > 0 
            ? (
              <div className="people-section">
                <div>
                  {
                    this.state.people === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handlePeopleClick.bind(this)}>CHARACTERS <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">CHARACTERS <span className="caret">&#10225;</span></span>
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

          {/* PLANETS */}
          <div>
          {
            this.props.data.planets.length > 0 
            ? (
              <div className="planets-section">
                <div>
                  {
                    this.state.planets === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handlePlanetClick.bind(this)}>PLANETS <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">PLANETS <span className="caret">&#10225;</span></span>
                          </h2>
                          <ul className="elements-container">
                            {this.state.planets.map((elm) => {
                              return (
                                <Link key={elm.name} to={`/info/planets/${extractId(elm.url)}`}>
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

          {/* STARSHIPS */}
          <div>
          {
            this.props.data.starships.length > 0 
            ? (
              <div className="starships-section">
                <div>
                  {
                    this.state.starships === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handleStarshipClick.bind(this)}>STARSHIPS <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">STARSHIPS <span className="caret">&#10225;</span></span>
                          </h2>
                          <ul className="elements-container">
                            {this.state.starships.map((elm) => {
                              return (
                                <Link key={elm.name} to={`/info/starships/${extractId(elm.url)}`}>
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
          
          {/* VEHICLES */}
          <div>
          {
            this.props.data.vehicles.length > 0 
            ? (
              <div className="vehicles-section">
                <div>
                  {
                    this.state.vehicles === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handleVehicleClick.bind(this)}>VEHICLES <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">VEHICLES <span className="caret">&#10225;</span></span>
                          </h2>
                          <ul className="elements-container">
                            {this.state.vehicles.map((elm) => {
                              return (
                                <Link key={elm.name} to={`/info/vehicles/${extractId(elm.url)}`}>
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

          {/* SPECIES */}
          <div>
          {
            this.props.data.species.length > 1 
            ? (
              <div className="species-section">
                <div>
                  {
                    this.state.species === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handleSpeciesClick.bind(this)}>SPECIES <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">SPECIES <span className="caret">&#10225;</span></span>
                          </h2>
                          <ul className="elements-container">
                            {this.state.species.map((elm) => {
                              return (
                                <Link key={elm.name} to={`/info/species/${extractId(elm.url)}`}>
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


        </div>
      </div>
    </div>
    )
  }

  handlePeopleClick(e) {
    for(let people of this.props.data.characters) {
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

  handleSpeciesClick(e) {
    for(let species of this.props.data.species) {
      fetch(species)
      .then( response => response.json())
      .then( (res) => {
        if(this.state.species === null) {
          this.setState({
            species: [res]
          });
        }
        else {
          this.setState({
            species: [...this.state.species, res]
          });
        }
      });
    }
  }

  handleVehicleClick(e) {
    for(let vehicles of this.props.data.vehicles) {
      fetch(vehicles)
      .then( response => response.json())
      .then( (res) => {
        if(this.state.vehicles === null) {
          this.setState({
            vehicles: [res]
          });
        }
        else {
          this.setState({
            vehicles: [...this.state.vehicles, res]
          });
        }
      });
    }
  }

  handleStarshipClick(e) {
    for(let starships of this.props.data.starships) {
      fetch(starships)
      .then( response => response.json())
      .then( (res) => {
        if(this.state.starships === null) {
          this.setState({
            starships: [res]
          });
        }
        else {
          this.setState({
            starships: [...this.state.starships, res]
          });
        }
      });
    }
  }

  handlePlanetClick(e) {
    for(let planets of this.props.data.planets) {
      fetch(planets)
      .then( response => response.json())
      .then( (res) => {
        if(this.state.planets === null) {
          this.setState({
            planets: [res]
          });
        }
        else {
          this.setState({
            planets: [...this.state.planets, res]
          });
        }
      });
    }
  }
}

export default InfoFilm