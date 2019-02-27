import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import SimpleMap from './SimpleMap';
import DatePicker from './DatePicker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routesData: [],
      date: new Date(),
    };
  }
  // const recommendations = { "ok": 0,
  //                           "caution": 1,
  // //                           "avoid": 2 }

  //TODO: Investigate if this is apporiate. 
  //Seems wrong according to here: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    this.getAvalancheForecastAndRecommendations();
  }

  updateDateAndRecommendations(newDate) {
    this.setState({date: newDate});
    this.getAvalancheForecastAndRecommendations();
  }

  getAvalancheForecastAndRecommendations() {
    this.getRoutes()
      .then(res => this.setState({ routesData: res }))
      .then(() => {
        for (let i = 0; i < this.state.routesData.length; i++) {
          let x = this.state.routesData[i].trailhead.x;
          let y = this.state.routesData[i].trailhead.y;
          this.getAvalancheForecast(x, y, this.state.date).then(forecast => {
            let routeCopy = { ...this.state.routesData[i] };
            if (forecast && forecast[0]) {
              routeCopy.avalancheForecast = forecast[0];
              routeCopy.recommendation = this.getRecommendation(routeCopy);
              let routesCopy = this.state.routesData.slice();
              routesCopy[i] = routeCopy;
              this.setState({ routesData: routesCopy });
            }
          }).catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  isAspectExposed(expostitions, aspect) {
    switch (aspect) {
      case ("N"):
        return expostitions[0] === "1";
      case ("NE"):
        return expostitions[1] === "1";
      case ("E"):
        return expostitions[2] === "1";
      case ("SE"):
        return expostitions[3] === "1";
      case ("S"):
        return expostitions[4] === "1";
      case ("SW"):
        return expostitions[5] === "1";
      case ("W"):
        return expostitions[6] === "1";
      case ("NW"):
        return expostitions[7] === "1";
      default:
        return true; //rather safe than sorry?
      }
    }

  getRecommendation(route) {
    let slopeExposed = false;
    for (let i = 0; i < route.avalancheForecast.AvalancheProblems.length; i++) {
      const problem = route.avalancheForecast.AvalancheProblems[i];
      const problemFrom = problem.ExposedHeight2;
      const problemTo = problem.ExposedHeight1;

      for (let j = 0; j < route.terraindetails.length; j++) {
        const terrain = route.terraindetails[j];
        if ((problemFrom <= terrain.from && terrain.from <= problemTo) ||
          (problemFrom <= terrain.to && terrain.to <= problemTo)) {
          if (this.isAspectExposed(problem.ValidExpositions, terrain.aspect)) {
            slopeExposed = true;
            break;
          }
        }
      }      
    }

    //TODO: Use enums
    let dangerLevel = parseInt(route.avalancheForecast.DangerLevel);
    let warningClass = null;
    if (dangerLevel === 5 || dangerLevel === 4 || (dangerLevel === 3 && slopeExposed)) {
      warningClass = "avoid";
    } else if (dangerLevel === 3 || (dangerLevel === 2 && slopeExposed)) {
      warningClass = "caution";      
    } else {
      warningClass = "ok";
    }
    return warningClass;
  }

  getRoutes = async () => {
    const response = await fetch('/api/routes');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getAvalancheForecast = async (x,y,date) => {
    const dateString = date.toISOString().substr(0, 10);
    const url = `/api/avalancheForecast/${x}/${y}/${dateString}`;
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to the Gentle Guide.
          </p>
        </header>
        <div><DatePicker date={this.state.date} 
          updateRecommendations={this.updateDateAndRecommendations.bind(this)}/></div>
        <div id="container">
          <div id="map">
            <SimpleMap routesData={this.state.routesData}/>
          </div>
          <div id="routeList">
            <Table routesData={this.state.routesData} date={this.state.date.toISOString().substr(0, 10)}/>
          </div>
        </div>
        <div><p>You can edit the routes <a href="https://docs.google.com/spreadsheets/d/1-aIFZ5EafxqlgcVrkI_n_1Pp_NAikdjWALZXPypCp9U/edit#gid=0" target="_blank" rel="noopener noreferrer">here</a>.</p></div>
      </div>
    );
  }
}

export default App;
