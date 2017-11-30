import React, { Component } from 'react';
import './HomePage.css';
import Store from '../../utils/Store';
import { API_ROOT } from '../../utils/constants';
import FilmTile from '../FilmTile/FilmTile';

const FILMS_COUNT = 7;

class HomePage extends Component {

  constructor() {
    super();

    this.store = new Store();

    this.existingFilms = [];
    this.toBeFetchedFilms = [];

    this.state = {
      films: null
    };
  }
  componentDidMount() {
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

    if(this.toBeFetchedFilms.length === 0) {
      // nothing to fetch, we already have all we need
      this.setState({
        films: this.sort(this.existingFilms)
      });
    }
    else {
      for(let url of this.toBeFetchedFilms) {
        console.log("fetching ", url);
        fetch(url)
        .then( response => response.json())
        .then( (res) => {
          this.existingFilms.push(res);
          this.store.set(url, res);
          if(this.existingFilms.length === FILMS_COUNT) {
            // we have all we need now
            this.setState({
              films: this.sort(this.existingFilms)
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
            : <div className="columns"><h1>Loading...</h1></div>
          }
        </div>
      </div>
    )
  }

  sort(arr) {
    return arr.sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    });
  }
}

export default HomePage