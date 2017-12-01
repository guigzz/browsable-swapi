import React, { Component } from 'react';
import './InfoPage.css';
import { API_ROOT } from '../../utils/constants';
import Store from '../../utils/Store';
import InfoPeople from '../InfoPeople/InfoPeople';
import InfoFilm from '../InfoFilm/InfoFilm';
import InfoPlanet from '../InfoPlanet/InfoPlanet';
import InfoSpecies from '../InfoSpecies/InfoSpecies';
import InfoVehicle from '../InfoVehicle/InfoVehicle';
import InfoStarship from '../InfoStarship/InfoStarship';
import Loader from '../Loader/Loader';

class InfoPage extends Component {
  constructor() {
    super();

    this.store = new Store();

    this.state = {
      data: null
    };
  }

  /**
   * Called the when infopage is mounted
   */
  componentDidMount() {
    console.log("did mount");
    this.fetchData(this.props);
  }

  /**
   * Called when navigating from one info to another
   */
  componentWillReceiveProps(nextProps) {
    console.log("will receive props");
    this.fetchData(nextProps);
  }

  componentDidUpdate() {
    // scroll to top of the page whenever the info page content updates itself
    window.scrollTo(0, 0);
  }

  render() {
    let infoComponent = null;
    if(this.state.data !== null) {
      switch(this.props.match.params.type) {
        case "people":
          infoComponent = <InfoPeople data={this.state.data} />
          break;
        case "films":
          infoComponent = <InfoFilm data={this.state.data} />
          break;
        case "planets":
          infoComponent = <InfoPlanet data={this.state.data} />
          break;
        case "species":
          infoComponent = <InfoSpecies data={this.state.data} />
          break;
        case "vehicles":
          infoComponent = <InfoVehicle data={this.state.data} />
          break;
        case "starships":
          infoComponent = <InfoStarship data={this.state.data} />
          break;
        default:
          break;
      }
    }
    else {
      infoComponent = <Loader text="Loading data..." />
    }
    
    return (
    <div className="info-page">
      {infoComponent}
    </div>
    )
  }

  fetchData(props) {
    const resourceUrl = `${API_ROOT}${props.match.params.type}/${props.match.params.id}/`;
    const localData = this.store.get(resourceUrl);
    if(localData !== null) {
      // set data we already have from local storage into state
      this.setState({
        data: localData
      });
    }
    else {
      this.setState({ // reset, so we can use this transition-state to display a loader
        data: null
      });
      // fetch data we don't have yet
      fetch(resourceUrl)
      .then( response => response.json())
      .then( (data) => {
        // set retrieved data into state
        this.setState({
          data: data
        });
        // and store it in local storage for future use
        this.store.set(resourceUrl, data);
      });
    }
  }
}

export default InfoPage