import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { RecommendationEnum } from './recommendations.js'

const RouteMarker = ({ recommendation, text }) => {
  //TODO: Define colours in one common place
  let color = "grey";
  if (recommendation) {
    color = RecommendationEnum.properties[recommendation].color;
  }

  return (<div>
      <svg  width="10"  height="10">
        <circle cx={5} cy={5} r={5} fill={color} />
      </svg>
      {text}
  </div>)};
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 69.583331,
      lng: 20.2166658
    },
    zoom: 5,
  };
 
  render() {
    const routes = this.props.routesData.map((route, index) => {
      return (<RouteMarker
        key={index}
        lat={route.trailhead.x}
        lng={route.trailhead.y}
        text={route.name}
        recommendation={route.recommendation}
      />);
    });
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBZXW3WjjoeCFtlafikDXWFySDMtH1CawM' }}
          center={this.props.center}
          zoom={this.props.zoom}>
          {routes}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;