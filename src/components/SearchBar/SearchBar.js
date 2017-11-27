import React, { Component } from 'react';
import './SearchBar.css';
import SearchBarResult from '../SearchBarResults/SearchBarResults';
import { API_ROOT } from '../../utils/constants';

const SEARCH = "?search=";

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      search: "",
      type: "",
      isSearching: false,
      types: {},
      results: []
    };
  }

  componentDidMount() {
    // get all types which can be queried
    fetch(API_ROOT)
    .then( response => response.json())
    .then( (list) => {
      const types = Object.keys(list);
      const selectedType = types[0];
      return this.setState({
        types: list,
        type: selectedType
      });
    });
  }

  search(what) {
    fetch(this.state.types[this.state.type] + SEARCH + what.toLowerCase())
    .then( response => response.json())
    .then( (res) => {
      // just in case we receive un previous search result while searching an empty string
      if(this.state.search.length !== 0) {
        return this.setState({
          results: res,
          isSearching: false
        });
      }
      else {
        return this.setState({
          results: [],
          isSearching: false
        });
      }
    });
  }

  render() {
    return (
      <div className="searchbar level is-centered">
        <div className="level-item">
          <div>
            <div className="searchbar-header columns is-mobile">
              <div className="select column is-narrow">
                <select name="type" value={this.state.type} onChange={this.handleSelectChange.bind(this)}>
                  { Object.keys(this.state.types).map((t) => {
                    return <option key={t}>{t}</option>
                  })}
                </select>
              </div>
              <div className="field column">
                <p className="control">
                  <input 
                    className="input" 
                    type="text" 
                    placeholder="Search" 
                    value={this.state.search} 
                    onChange={this.handleSearchChange.bind(this)}/>
                </p>
              </div>
            </div>
            <SearchBarResult 
              isSearching={this.state.isSearching} 
              results={this.state.results} 
              type={this.state.type} 
              onClickPrevious={this.handlePreviousResultsClick.bind(this)} 
              onClickNext={this.handleNextResultsClick.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

  handleSearchChange(e) {
    const what = e.target.value;
    if(what.length === 0) {
      this.setState({
        search: "",
        results: [],
        isSearching: false
      })
    }
    else {
      this.setState({
        search: what,
        isSearching: true,
        results: []
      });
      this.search(what);
    }
  }

  handleSelectChange(e) {
    this.setState({
      type: e.target.value,
      search: "",
      results: []
    });
  }

  handlePreviousResultsClick(e) {
    this.handleNavResultsClick(false);
  }

  handleNextResultsClick(e) {
    this.handleNavResultsClick(true);
  }

  handleNavResultsClick(isNext) {
    this.setState({
      isSearching: true
    });

    const fetchUrl = isNext ? this.state.results.next : this.state.results.previous;

    fetch(fetchUrl)
    .then( response => response.json())
    .then( (res) => {
      return this.setState({
        results: res,
        isSearching: false
      });
    });
  }
}

export default SearchBar;
