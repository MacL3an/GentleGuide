import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const RouteMarker = ({ recommendation, text }) => {
  let color = "grey";
  if (recommendation === "ok") {
    color = "green";
  } else if (recommendation === "caution") {
    color = "orange";
  } else if (recommendation === "avoid") {
    color = "red";
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
    zoom: 6,
  };
 
  render() {
    const routes = this.props.routesData.map((route, index) => {
      return (<RouteMarker
        key={index}
        lat={route.trailHead.x}
        lng={route.trailHead.y}
        text={route.name}
        recommendation={route.recommendation}
      />);
    //   return (<Marker
    //     position=
    //       {{
    //         lat: route.trailHead.x,
    //         lng: route.trailHead.y
    //       }}
    //     name={route.name}
    //   />);
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