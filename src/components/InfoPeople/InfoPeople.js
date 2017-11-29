import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InfoPeople.css';
import { extractId } from '../../utils/functions';
import Store from '../../utils/Store';

class InfoPeople extends Component {
  constructor() {
    super();

    this.store = new Store();

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
    let localHomeworld = this.store.get(this.props.data.homeworld);
    if(localHomeworld !== null) {
      this.setState({
        homeworld: localHomeworld
      });
    }
    else {
      fetch(this.props.data.homeworld)
      .then( response => response.json())
      .then( (res) => {
        this.setState({
          homeworld: res
        });
        this.store.set(this.props.data.homeworld, res);
      });
    }
    

    // get the species if only one
    if(this.props.data.species.length === 1) {
      let localSPecies = this.store.get(this.props.data.species[0]);
      if(localSPecies !== null) {
        this.setState({
          species: [localSPecies]
        });
      }
      else {
        fetch(this.props.data.species[0])
        .then( response => response.json())
        .then( (res) => {
          this.setState({
            species: [res]
          });
          this.store.set(this.props.data.species[0], res);
        });
      }
    }
  }

  render() {
    return (
    <div className="info-people box container">
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
      <div className="columns is-centered">
        <div className="column is-two-thirds links-container">

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

        </div>
      </div>
    </div>
    )
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

export default InfoPeople