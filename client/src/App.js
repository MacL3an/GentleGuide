import React, { Component } from 'react';
import './App.css';
import Table from './Table';

class App extends Component {
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
              //TODO: Get [0] this safely
              routeCopy.avalancheDanger = forecast[0].DangerLevel;
              let routesCopy = this.state.routesData.slice();
              routesCopy[i] = routeCopy;
              this.setState({ routesData: routesCopy});
            }).catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
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
            {/* <GoogleApiWrapper/> */}
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
