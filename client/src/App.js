import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import SimpleMap from './SimpleMap';

class App extends Component {
  // const recommendations = { "ok": 0,
  //                           "caution": 1,
  //                           "avoid": 2 }

  state = {
    routesData: [],
  };

  //TODO: Investigate if this is apporiate. 
  //Seems wrong according to here: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    this.getRoutes()
      .then(res => this.setState({ routesData: res }))
      .then(() => 
      {
        for (let i = 0; i < this.state.routesData.length; i++) {
          let x = this.state.routesData[i].trailHead.x;
          let y = this.state.routesData[i].trailHead.y;
          this.getAvalancheForecast(x,y).then(forecast => 
            {
              let routeCopy = { ...this.state.routesData[i] };
              if (forecast && forecast[0]) {
                routeCopy.avalancheDanger = forecast[0].DangerLevel;
                routeCopy.recommendation = this.getRecommendation(routeCopy);
                console.log(routeCopy.recommendation);

                let routesCopy = this.state.routesData.slice();
                routesCopy[i] = routeCopy;
                this.setState({ routesData: routesCopy});  
              }
            }).catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  getRecommendation(route) {
    //TODO: Use enums
    let dangerLevel = parseInt(route.avalancheDanger);
    let warningClass = null;
    if (dangerLevel >= 3) {
        warningClass = "avoid";
    } else if (dangerLevel === 2 && route.terrainComplexity > 1) {
        warningClass = "caution";
    } else if (dangerLevel <= 2) {
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

  getAvalancheForecast2 = async (x) => {
    return x;
  }

  getAvalancheForecast = async (x,y) => {
    const url = `/api/avalancheForecast/${x}/${y}/`;
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
        {/* <h1>Routes</h1> */}
        <div id="container">
          <div id="map">
            <SimpleMap routesData={this.state.routesData}/>
          </div>
          <div id="routeList">
            <Table routesData={this.state.routesData}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
