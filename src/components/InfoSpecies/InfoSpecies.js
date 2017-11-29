import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InfoSpecies.css';
import { extractId } from '../../utils/functions';
import Store from '../../utils/Store';

class InfoSpecies extends Component {
  constructor() {
    super();

    this.store = new Store();

    this.generalFields = [
      "classification", "designation", "average_height", "skin_colors", "hair_colors", "eye_colors", "average_lifespan", "language"
    ];

    this.state = {
      people: null,
      films: null,
      homeworld: null
    };
  }

  /**
   * Additional fetch, get the name of the homeworld
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
  }

  render() {
    return (
    <div className="info-species box container">
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
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-two-thirds links-container">

          {/* PEOPLE */}
          <div>
          {
            this.props.data.people.length > 0 
            ? (
              <div className="people-section">
                <div>
                  {
                    this.state.people === null 
                    ? (
                        <div>
                          <h2>
                            <span className="section-title clickable" onClick={this.handlePeopleClick.bind(this)}>PEOPLE <span className="caret">&#10225;</span></span>
                          </h2>
                        </div>
                      )
                    : (
                        <div>
                          <h2>
                            <span className="section-title">PEOPLE <span className="caret">&#10225;</span></span>
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
    this.handleGenericClick('people', 'people');
  }

  handleFilmClick(e) {
    this.handleGenericClick('films', 'films');
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

export default InfoSpecies