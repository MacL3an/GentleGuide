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
          this.getAvalancheForecast(0,0).then(avalancheForecast => 
            {
              let routeCopy = { ...this.state.routesData[i] };
              //TODO: Get [0] this safely
              routeCopy.avalancheDanger = avalancheForecast[0].DangerLevel;
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
    const url = `/api/avalancheForecast/`;
    // const url = `/api/avalancheForecast/${x}/${y}/`;
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
        <h1>Routes</h1>
        <div className="container" align="center">
          <Table routesData={this.state.routesData}/>
        </div>
      </div>
    );
  }
}

export default App;
