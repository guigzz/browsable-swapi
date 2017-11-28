import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchBarResults.css';
import SearchBarResultItem from '../SearchBarResultItem/SearchBarResultItem';
import { extractId } from '../../utils/functions';

class SearchBarResults extends Component {
  render() {
    return (
      <div className="searchbar-results columns">
        <div className="column">
          {
            this.props.isSearching 
            ? <div className="results-content"><div className="results-status">Searching...</div></div>
            : (
              this.props.results.length === 0 
              ? null 
              : (
                this.props.results.results.length === 0 
                ? <div className="results-content"><div className="results-status">No results</div></div>
                : (<div className="results-content">
                    <div className="results-status">{this.props.results.count} results</div>
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
                          return <Link key={text} to={`/info/${this.props.type}/${extractId(r.url)}`}><SearchBarResultItem text={text} subText={subtext} /></Link>
                        })}
                      </ul>
                    </div>
                    {
                      this.props.results.next !== null || this.props.previous !== null 
                      ? (
                        <div className="results-nav">
                          <div className="results-nav-previous">
                            {
                              this.props.results.previous !== null 
                              ? <span>previous</span> 
                              : null
                            }
                          </div>
                          <div className="results-nav-next">
                            {
                              this.props.results.next !== null 
                              ? <span>next</span> 
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
      </div>
    )
  }
}

export default SearchBarResults