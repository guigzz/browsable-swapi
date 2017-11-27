import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import HomePage from '../HomePage/HomePage';
import InfoPage from '../InfoPage/InfoPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title is-1">Browsable SWAPI SPA</h1>

        <SearchBar />

        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/info/:type/:id" component={InfoPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
