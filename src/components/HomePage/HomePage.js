import React, { Component } from 'react';
import './HomePage.css';
import Store from '../../utils/Store';
import { API_ROOT } from '../../utils/constants';
import FilmTile from '../FilmTile/FilmTile';
import Loader from '../Loader/Loader';

const FILMS_COUNT = 7;

/**
 * Home page main container
 */
class HomePage extends Component {

  constructor() {
    super();

    // access to local storage
    this.store = new Store();

    // list of films
    this.existingFilms = [];
    this.toBeFetchedFilms = [];

    this.state = {
      films: null
    };
  }
  
  componentDidMount() {
    // first, sort all films according to
    // whether we already have it in local storage
    // or not
    for(let i = 1; i <= FILMS_COUNT; i++) {
      const filmUrl = `${API_ROOT}films/${i}/`;
      const oneFilm = this.store.get(filmUrl);
      if(oneFilm !== null) {
        this.existingFilms.push(oneFilm);
      }
      else {
        this.toBeFetchedFilms.push(filmUrl);
      }
    }

    // we already have all films
    if(this.toBeFetchedFilms.length === 0) {
      this.setState({
        films: this.sort(this.existingFilms)
      });
    }
    else { // some things need to be fetched
      for(let url of this.toBeFetchedFilms) {
        console.log("fetching ", url);
        fetch(url)
        .then( response => response.json())
        .then( (res) => {
          // add the fetched film to the existing films list
          this.existingFilms.push(res);
          // store it in local storage
          this.store.set(url, res);
          // only if we now have all films, set state
          if(this.existingFilms.length === FILMS_COUNT) {
            this.setState({
              films: this.sort(this.existingFilms) // sort by DESC episode id
            });
          }
        });
      }
    }
  }

  render() {
    return (
      <div className="homepage">
        <div className="container">
        <div className="columns"><div className="column homepage-header"><h1>...Or start exploring the Star Wars universe here:</h1></div></div>
          {
            this.state.films !== null 
            /* there are films in the state */
            ? (
              <div className="columns">
                <div className="column">
                {
                  this.state.films.map((film) => {
                  return (
                    <FilmTile key={film.title} data={film} />
                  )})
                }
                </div>
              </div>
            )
            /* there is no film in the state, means we are currently retrieving them, wait... */
            : <Loader text="Loading the Star Wars universe..." />
          }
        </div>
      </div>
    )
  }

  /**
   * Sort the list of film by descending episode id
   * @param {array} arr an array of film objects 
   */
  sort(arr) {
    return arr.sort((a, b) => {
      return b.episode_id - a.episode_id;
    });
  }
}

export default HomePage