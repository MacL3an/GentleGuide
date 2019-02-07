import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: '',
  };

  //TODO: Investigate if this is apporiate. 
  //Seems wrong according to here: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res[0].name }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/routes');
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
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
