import React, {Component} from 'react';

class RouteDetails extends Component {
    render() {
        return (
            <div  align="left">
              <h1>Route Details: {this.props.match.params.routeName}</h1>
              <h2>Recommendation for date: &lt; yyyy-mm-dd &gt;</h2>
              <p>Ok / Caution / Avoid</p>
              <h2>Avalanche danger</h2>
              <p>Current avalanche danger. Link to Varsom.</p>
              <h2>Elevation</h2>
              <p>xxxx m</p>
              <h2>Ascent</h2>
              <p>yyyy m.</p>
              <h2>Description</h2>
              <p>How magnificient the route is.</p>
              <h2>Duration</h2>
              <p>Expected duration of the route.</p>
              <h2>Map</h2>
              <p>A map showing the route. Perhaps also which parts are affected by avalanche problems.</p>
            </div>
            );
          }
}

export default RouteDetails;
