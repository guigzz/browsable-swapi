import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InfoFilm.css';
import { extractId } from '../../utils/functions';
import Store from '../../utils/Store';
import { POSTERS } from '../../utils/constants';

class InfoFilm extends Component {
  constructor() {
    super();

    this.store = new Store();

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
              <img className="" src={POSTERS[this.props.data.episode_id - 1]} alt={this.props.data.title} />
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

          {/* OPENING CRAWL */}
          <div>
            <div className="opening-section">
              <h2>
                <span className="section-title">OPENING CRAWL</span>
              </h2>
              <p>
                {this.props.data.opening_crawl}
              </p>
            </div>
          </div>

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
    this.handleGenericClick("characters", "people");
  }

  handleFilmClick(e) {
    this.handleGenericClick('films', 'films');
  }

  handleSpeciesClick(e) {
    this.handleGenericClick('species', 'species');
  }

  handleVehicleClick(e) {
    this.handleGenericClick('vehicles', 'vehicles');
  }

  handleStarshipClick(e) {
    this.handleGenericClick('starships', 'starships');
  }

  handlePlanetClick(e) {
    this.handleGenericClick('planets', 'planets');
  }

  /**
   * generic method to handle retrieving of data
   * @param {string} propsType the name of the props.data property that we handle
   * @param {string} stateType the name of the state property that we handle
   */
  handleGenericClick(propsType, stateType) {
    let localDataArray = [];
    let toBeFetchedData = [];
    for(let elm of this.props.data[propsType]) {
      const localData = this.store.get(elm);
      if(localData !== null) { // we already have this piece of data in local storage
        console.log(`get ${elm} from store`);
        localDataArray.push(localData);
      }
      else {
        console.log(`add ${elm} to the fetch list`);
        toBeFetchedData.push(elm);
      }
    }

    if(localDataArray.length !== 0) {
      this.addToState(stateType, localDataArray);
    }
    if(toBeFetchedData.length !== 0) {
      for(let d of toBeFetchedData) {
        fetch(d)
        .then( response => response.json())
        .then( (res) => {
          this.addToState(stateType, [res]);
          console.log("has been fetched :");
          console.log(res);
          this.store.set(d, res);
        });
      }
    }
  }

  addToState(type, val) {
    if(this.state[type] === null) {
      this.setState({
        [type]: [...val]
      });
    }
    else {
      this.setState({
        [type]: [...this.state[type], ...val]
      });
    }
  }
}

export default InfoFilm