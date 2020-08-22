import React, { Component } from "react";
import { compose, lifecycle, withState } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const google = window.google;

const _ = require("lodash");
const MapWithAMarker = compose(
  lifecycle({
    componentWillMount() {
      const refs = {
        map: undefined,
        searchBox: undefined,
      };
      
      this.setState({
        bounds: null,
        center: {
          lat: -1.331515,
          lng: 36.894271
        },
        // markers : [],
        
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(nextMarkers, "0.position", this.state.center);
          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          // refs.map.fitBounds(bounds);
        }
      });
    }
  }),
  withScriptjs,
  withState("selectedPlace", "updateSelectedPlace", null),
  withGoogleMap
)(props => {
  return (
    <GoogleMap ref={props.onMapMounted} defaultZoom={15} center={props.center} onBoundsChanged={props.onBoundsChanged}>
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search Apartment"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `14px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>

      {props.markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          {props.selectedPlace === index && (
            <InfoWindow>
              <div>
                {props.markers[props.selectedPlace].name}
                <br />
                {props.markers[props.selectedPlace].id}
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}

      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker);
        return (
          <Marker key={marker.id} onClick={onClick} position={{ lat: marker.latitude, lng: marker.longitude }}>
            {props.selectedMarker === marker && (
              <InfoWindow>
                <div>{marker.shelter}</div>
              </InfoWindow>
            )}
            
          </Marker>
        );
      })}
    </GoogleMap>
  );
});
type MapState = {
  statusMessage: any,
  isShowError: boolean,
  isLoading: boolean,
  shelters: undefined[],
  selectedMarker: boolean
};
export default class Map extends Component<{}, MapState> {
  constructor(props) {
    super(props);
    this.state = {
      shelters: [],
      isLoading:true,
      isShowError:false,
      statusMessage:"",
      selectedMarker: false
    };
  }
  componentDidMount() {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ` + TOKEN
    //   }
    // };
    // axios.get(baseURL + "entities", config).then(res => {
    //   this.setState({ statusMessage: res.data.status_message, isShowError: false, isLoading: false });
    //   //console.log("LOOG" , res.data.status_message);
    //   this.setState(
    //     {
    //       // shelters: res.data,
    //       isLoading: false
    //     },
    //     function() {
    //       console.log("school", res.data);
    //     }
    //   );
    // });
  }
  onPlacesChanged() {
    const bounds = new google.maps.LatLngBounds();
    console.log("Logss", bounds);
    // refs.map.fitBounds(bounds);
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker });
  };
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJnDn_O0nybXXsBypZ_5wTu1lVXOgHIjU&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `70vh` }} />}
        containerElement={<div style={{ height: `70vh` }} />}
        mapElement={<div style={{ height: `70vh` }} />}
      />
    );
  }
}
