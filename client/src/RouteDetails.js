import React, {Component} from 'react';
import SimpleMap from './SimpleMap';

class RouteDetails extends Component {
    render() {
        return (
            <div  align="left">
              <h1>Route Details: {this.props.match.params.routeName}</h1>
              <h2>Description</h2>
              <h2>Duration</h2>
              <h2>Map</h2>
            </div>
            );
          }
}

export default RouteDetails;
