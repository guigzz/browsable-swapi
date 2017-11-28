import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InfoPeople.css';
import { extractId } from '../../utils/functions';

class InfoPeople extends Component {
  constructor() {
    super();

    this.generalFields = [
      "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"
    ];

    this.state = {
      homeworld: null,
      species: null,
      vehicles: null,
      starships: null,
      films: null
    };
  }

  /**
   * Additional fetch, get the name of the homeworld
   * and the name of the species if only one
   */
  componentDidMount() {
    // get the homeworld
    fetch(this.props.data.homeworld)
    .then( response => response.json())
    .then( (res) => {
      this.setState({
        homeworld: res
      });
    });

    // get the species if only one
    if(this.props.data.species.length === 1) {
      fetch(this.props.data.species[0])
      .then( response => response.json())
      .then( (res) => {
        this.setState({
          species: [res]
        });
      });
    }
  }

  render() {
    return (
    <div className="info-people box container">
      <div className="title is-2"><span>{this.props.data.name}</span></div>
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column is-half illustration">
              <img className="is-pulled-right" src="http://via.placeholder.com/200x300" alt={this.props.data.name} />
            </div>
            <div className="column general-info">
              {this.generalFields.map((field) => {
                return <p key={field}><span className="field-name">{field}: </span><span className="field-value">{this.props.data[field]}</span></p>
              })}
              {
                this.state.homeworld !== null
                ? (
                  <p>
                    <span className="field-name">homeworld: </span>
                    <Link to={`/info/planets/${extractId(this.state.homeworld.url)}`}>
                      <span className="field-value">
                        {this.state.homeworld.name}
                      </span>
                    </Link>
                  </p>
                )
                : null
              }
              {
                this.state.species !== null && this.state.species.length === 1
                ? (
                  <p>
                    <span className="field-name">species: </span>
                    <Link to={`/info/species/${extractId(this.state.species[0].url)}`}>
                      <span className="field-value">
                        {this.state.species[0].name}
                      </span>
                    </Link>
                  </p>
                )
                : null
              }
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column links-container">

          {/* FILMS */}
          <div>
          {
            this.props.data.films.length > 0 
            ? (
              <div className="films-section">
                <h2>FILMS</h2>
                <div>
                  {
                    this.state.films === null 
                    ? <button className="button is-outlined" onClick={this.handleFilmClick.bind(this)}>Show films</button>
                    : (
                      <ul className="elements-container">
                        {this.state.films.map((elm) => {
                          return (
                            <Link key={elm.episode_id} to={`/info/films/${extractId(elm.url)}`}>
                              <li>{elm.title}</li>
                            </Link>
                          )
                        })}
                      </ul>
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
                <h2>SPECIES</h2>
                <div>
                  {
                    this.state.species === null 
                    ? <button className="button is-outlined" onClick={this.handleSpeciesClick.bind(this)}>Show Species</button>
                    : (
                      <ul className="elements-container">
                        {this.state.species.map((elm) => {
                          return (
                            <Link key={elm.name} to={`/info/species/${extractId(elm.url)}`}>
                              <li>{elm.name}</li>
                            </Link>
                          )
                        })}
                      </ul>
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
                <h2>VEHICLES</h2>
                <div>
                  {
                    this.state.vehicles === null 
                    ? <button className="button is-outlined" onClick={this.handleVehicleClick.bind(this)}>Show Vehicles</button>
                    : (
                      <ul className="elements-container">
                        {this.state.vehicles.map((elm) => {
                          return (
                            <Link key={elm.name} to={`/info/vehicles/${extractId(elm.url)}`}>
                              <li>{elm.name}</li>
                            </Link>
                          )
                        })}
                      </ul>
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
                <h2>STARSHIPS</h2>
                <div>
                  {
                    this.state.starships === null 
                    ? <button className="button is-outlined" onClick={this.handleStarshipClick.bind(this)}>Show Starships</button>
                    : (
                      <ul className="elements-container">
                        {this.state.starships.map((elm) => {
                          return (
                            <Link key={elm.name} to={`/info/starships/${extractId(elm.url)}`}>
                              <li>{elm.name}</li>
                            </Link>
                          )
                        })}
                      </ul>
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
}

export default InfoPeople