// the root url of swapi
export const API_ROOT = "https://swapi.co/api/";

// number of ms of inactivity on the search input to trigger an actual api search request
export const FETCH_DELAY = 500;

// placeholder image url
export const PLACEHOLDER_IMAGE = "http://via.placeholder.com/182x268";

// posters images stored by episode_id, from IMDB API
// we could have fetched these programatically,
// but the imdb API is terribly slow, so for films at least we get the images directly here
export const POSTERS = [
  // Ep. 1 : The Phantom Menace
  "https://images-na.ssl-images-amazon.com/images/M/MV5BM2FmZGIwMzAtZTBkMS00M2JiLTk2MDctM2FlNTQ2OWYwZDZkXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
  // Ep. 2 : Attack of the Clones
  "https://images-na.ssl-images-amazon.com/images/M/MV5BOWNkZmVjODAtNTFlYy00NTQwLWJhY2UtMmFmZTkyOWJmZjZiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UY268_CR10,0,182,268_AL_.jpg",
  // Ep. 3 : Revenge of the Sith
  "https://images-na.ssl-images-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_UY268_CR9,0,182,268_AL_.jpg",
  // Ep. 4 : A New Hope
  "https://images-na.ssl-images-amazon.com/images/M/MV5BZDk2NmNhZDgtZDgzZS00NTRkLWFiYjUtNGMzZTYwNTFhYjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
  // Ep. 5 : The Empire Strikes Back
  "https://images-na.ssl-images-amazon.com/images/M/MV5BMjk2M2FiMTEtMzFlNS00MzcyLWFjYTAtODBiMDJjMWVlZTUwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
  // Ep. 6 : 
  "https://images-na.ssl-images-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  // Ep. 7 : The Force Awakens
  "https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_UX182_CR0,0,182,268_AL_.jpg"

];