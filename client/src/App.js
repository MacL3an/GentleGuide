import React, { Component } from 'react';
import { BrowserRouter, Route as BrowserRoute, Link } from "react-router-dom";
import './App.css';
import Table from './Table';
import SimpleMap from './SimpleMap';
import DatePicker from './DatePicker';
import { RecommendationEnum } from './recommendations.js'
import RouteDetails from './RouteDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routesData: [],
      date: new Date(),
    };
  }

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
    // console.log(aspect);
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
    if (!route.terraindetails || route.terraindetails.length === 0) {
      return null;
    }
    // console.log(route.name);
    // console.log(route.avalancheForecast);
    let slopeExposed = false;

    for (let i = 0; i < route.avalancheForecast.AvalancheProblems.length; i++) {
      const problem = route.avalancheForecast.AvalancheProblems[i];
      const problemHeightMain = problem.ExposedHeight1;
      const problemHeightLower = problem.ExposedHeight2;
      const problemHeightFill = problem.ExposedHeightFill;

      for (let j = 0; j < route.terraindetails.length; j++) {
        const terrain = route.terraindetails[j];
        if (this.isHeightExposed(terrain, problemHeightMain, problemHeightLower, problemHeightFill)) {
            // console.log("height");
            for (let k = 0; k < terrain.aspect.length; k++) {
              const aspect = terrain.aspect[k];
              if (this.isAspectExposed(problem.ValidExpositions, aspect)) {
                // console.log("aspect"); 
                slopeExposed = true;
                break;
              }  
            }
        }
      }      
    }

    let dangerLevel = parseInt(route.avalancheForecast.DangerLevel);
    let recommendation = null;
    if (dangerLevel === 5 || dangerLevel === 4 || (dangerLevel === 3 && slopeExposed)) {
      recommendation = RecommendationEnum.AVOID;
    } else if (dangerLevel === 3 || (dangerLevel === 2 && slopeExposed)) {
      recommendation = RecommendationEnum.CAUTION;
    } else {
      recommendation = RecommendationEnum.OK;
    }
    return recommendation;
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


  isHeightExposed(terrain, problemHeight, problemHeightLower, problemHeightFill) {
    if (problemHeightFill === 1) //Gjelder over gitt høyde (ExposedHeight1)	 
    {
      return (problemHeight <= terrain.to) //TODO: Test!
    } else if (problemHeightFill === 2) //Gjelder under gitt høyde (ExposedHeight1)	
    {
      return (terrain.from <= problemHeight) //TODO: Test!      
    } else if (problemHeightFill === 3) //Gjelder over og under gitt høyde (ExposedHeight1, ExposedHeight2)	
    {
      console.log("TODO!! fill 3")
      return true;
    } else if (problemHeightFill === 4) //Gjelder mellom gitt høyde (ExposedHeight1, ExposedHeight2)
    {
      return (terrain.from <= problemHeightLower && problemHeightLower <= terrain.to) ||
              (terrain.from <= problemHeight && problemHeight <= terrain.to) ||
              (problemHeightLower <= terrain.from && terrain.from <= problemHeight) ||
              (problemHeightLower <= terrain.to && terrain.to <= problemHeight);      
    }
    return true; //rather safe than sorry...

  }

  render() {
    const Routes = () =>  {
      return (
        <div>
        <DatePicker date={this.state.date} updateRecommendations={this.updateDateAndRecommendations.bind(this)}/>
        <div id="map">
          <SimpleMap routesData={this.state.routesData}/>
        </div>
        <div id="routeList">
          <Table routesData={this.state.routesData} date={this.state.date.toISOString().substr(0, 10)}/>
        </div>
        <div><p>You can edit the routes <a href="https://docs.google.com/spreadsheets/d/1-aIFZ5EafxqlgcVrkI_n_1Pp_NAikdjWALZXPypCp9U/edit#gid=0" target="_blank" rel="noopener noreferrer">here</a>.</p></div>
      </div>
    );
    }

    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            The Gentle Guide <Link to="/">.</Link>
          </p>
        </header>
        <div id="container">        
          <BrowserRoute exact path="/" component={Routes} />
          <BrowserRoute path="/details/:routeName" component={RouteDetails}  />
        </div>
      </div>
      </BrowserRouter>
    );
  }

}

export default App;
