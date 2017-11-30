import React, { Component } from 'react';
import './SearchBar.css';
import SearchBarResult from '../SearchBarResults/SearchBarResults';
import { API_ROOT, FETCH_DELAY } from '../../utils/constants';

const SEARCH = "?search=";

class SearchBar extends Component {
  constructor() {
    super();

    // the id returned by setTimeout, used to fetch data with a delay (see below)
    this.fetchLock = null;

    this.state = {
      search: "",
      type: "",
      isSearching: false,
      showResults: false,
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
    clearTimeout(this.fetchLock);
    this.fetchLock = setTimeout(() => {
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
    }, FETCH_DELAY);
  }

  render() {
    return (
      <div className="searchbar columns is-centered">
        <div className="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-hone-third-fullhd">
          <div className="searchbar-header columns is-mobile">
            <div className="column is-narrow">
              <div className="select">
                <select name="type" value={this.state.type} onChange={this.handleSelectChange.bind(this)}>
                  { Object.keys(this.state.types).map((t) => {
                    return <option key={t}>{t}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="field column">
              <p className="control">
                <input 
                  className="input" 
                  ref={(input) => { this.searchInput = input; }}
                  type="text" 
                  placeholder="Search" 
                  value={this.state.search} 
                  onChange={this.handleSearchChange.bind(this)} 
                  onFocus={this.handleSearchFocus.bind(this)} 
                  onBlur={this.handleSearchBlur.bind(this)} />
              </p>
            </div>
          </div>
          {
            this.state.showResults 
            ? <SearchBarResult 
                isSearching={this.state.isSearching} 
                results={this.state.results} 
                type={this.state.type} 
                onClickPrevious={this.handlePreviousResultsClick.bind(this)} 
                onClickNext={this.handleNextResultsClick.bind(this)} />
            : null
          }
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

  handleSearchFocus(e) {
    this.setState({
      showResults: true
    });
  }

  handleSearchBlur(e) {
    // set timeout so that the click on an item Link effectively happen
    setTimeout(() => {
      this.setState({
        showResults: false
      });
    },300);
    
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
      isSearching: true,
      showResults: true
    });
    this.searchInput.focus();

    const fetchUrl = isNext ? this.state.results.next : this.state.results.previous;

    fetch(fetchUrl)
    .then( response => response.json())
    .then( (res) => {
      
      return this.setState({
        results: res,
        isSearching: false,
        showResults: true
      });
    });
  }
}

export default SearchBar;
