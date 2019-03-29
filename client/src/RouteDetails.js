import React, {Component} from 'react';

class RouteDetails extends Component {
    render() {
        return (
            <div>
              <h2>Route Details: {this.props.match.params.routeName}</h2>
                            
            </div>
            );
          }
}

export default RouteDetails;
