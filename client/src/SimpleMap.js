import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const RouteMarker = ({ text }) => <div>{text}</div>;
 
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

    // console.log(this.props.routesData);
    // console.log(this.props.routesData && 
    //   this.props.routesData[0] && 
    //   this.props.routesData[0].trailHead.x);

  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBZXW3WjjoeCFtlafikDXWFySDMtH1CawM' }}
          center={this.props.center}
          zoom={this.props.zoom}
          // initialCenter={this.props.initialCenter}
          // initialCenter={{
          //   lat: this.props.routesData && 
          //   this.props.routesData[0] && 
          //   this.props.routesData[0].trailHead.x,
          //   lng: this.props.routesData && 
          //   this.props.routesData[0] && 
          //   this.props.routesData[0].trailHead.y
          // }}
        >
          {/* <Marker name='test' position={{lat: 69.57584871428, lng: 20.20654}}/> */}
          {routes}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;