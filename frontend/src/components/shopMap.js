import React from 'react';
import { connect } from "react-redux";
import GoogleMapReact from 'google-maps-react';
const UserMap = (props) => {
let userInfo = {
center: {
lat: props.userLat,
lng: props.userLong
},
zoom: 10
};
const renderMarker = (map, maps) => {
let marker = new maps.Marker({
position: userInfo.center,
map,
title: "User Location"
});
return marker;
};
return (
<div className="user-map" style={{ height: '600px', width: '600px' }}>
<GoogleMapReact
bootstrapURLKeys={{ key: process.env.REACT_APP_googleKey }} // My Google API is stored in the .env file in front-end
defaultCenter={userInfo.center}
defaultZoom={userInfo.zoom}
yesIWantToUseGoogleMapApiInternals={true}
onGoogleApiLoaded={({ map, maps }) => {
renderMarker(map, maps)
}}
>
</GoogleMapReact>
</div>
);
}
const mapStateToProps = (state) => {
return {
userLat: state.userState.userLat,
userLong: state.userState.userLong,
}
}
export default connect(mapStateToProps)(UserMap);
