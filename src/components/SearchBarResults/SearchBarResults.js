import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchBarResults.css';
import SearchBarResultItem from '../SearchBarResultItem/SearchBarResultItem';
import { extractId } from '../../utils/functions';

class SearchBarResults extends Component {
  render() {
    return (
      <div className="searchbar-results">
        {
          this.props.isSearching 
          /* a search into the api is pending */
          ? <div className="results-content"><div className="results-status">Searching...</div></div> 
          /* we are not in a 'search pendiong' state */
          : (
            this.props.results.length === 0 
            /* No results */
            ? null 
            /* there is something to display */
            : (
              this.props.results.results.length === 0 
              /* the result to display is 'no result' */
              ? <div className="results-content"><div className="results-status">No results</div></div>
              /* we have actual results to display */
              : (<div className="results-content">
                  <div className="results-status">{this.props.results.count} result(s)</div>
                  <div className="results-items">
                    <ul>
                      {this.props.results.results.map(r => {
                        let text = "";
                        let subtext = "";
                        switch (this.props.type) {
                          case "people":
                            text = r.name;
                            subtext = `Gender: ${r.gender}`;
                            break;
                          case "films":
                            text = r.title;
                            subtext = `Release date: ${r.release_date}`;
                            break;
                          case "planets":
                            text = r.name;
                            subtext = `Population: ${r.population}`;
                            break;
                          case "species":
                            text = r.name;
                            subtext = `Classification: ${r.classification}`;
                            break;
                          case "vehicles":
                            text = r.name;
                            subtext = `Model: ${r.model}`;
                            break;
                          case "starships":
                            text = r.name;
                            subtext = `Model: ${r.model}`;
                            break;
                          default:
                            text = "<Unknown>";
                            subtext = "<Unknown>";
                            break;
                        }
                        return (
                          <Link key={text} to={`/info/${this.props.type}/${extractId(r.url)}`}>
                            <SearchBarResultItem text={text} subText={subtext} />
                          </Link>
                        )
                      })}
                    </ul>
                  </div>
                  {
                    this.props.results.next !== null || this.props.previous !== null 
                    /* there is more than one result page */
                    ? (
                      <div className="results-nav columns is-mobile">
                        <div className="results-nav-previous column is-half">
                          {
                            this.props.results.previous !== null 
                            /* we need to be able to see previous result set */
                            ? <button 
                              className="button is-outlined is-pulled-right" 
                              onClick={this.props.onClickPrevious} >&larr; previous</button>
                            : null
                          }
                        </div>
                        <div className="results-nav-next column is-half">
                          {
                            this.props.results.next !== null 
                            /* we need to be able to see next result set */
                            ? <button 
                              className="button is-outlined" 
                              onClick={this.props.onClickNext} >next &rarr;</button> 
                            : null
                          }
                        </div>
                      </div>
                    )
                    : null
                  }
                </div>
              )
            )
          )
        }
      </div>
    )
  }
}

export default SearchBarResults