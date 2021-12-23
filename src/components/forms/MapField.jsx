import React, { useState } from 'react';
import { useField } from 'formik';
import { Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 21.028195403,
  lng: 105.854159778
};

const MapField = ({label, ...props}) => {
  const [,,helper] = useField(props);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);;
  const [marker, setMarker] = useState(null);

  const onLoadMap = (mapItem) => {
    setMap(mapItem);
  }
  const onLoadAutocomplete = (autocompleteItem) => {
    setAutocomplete(autocompleteItem);
  }
  const onLoadMarker = (markerItem) => {
    setMarker(markerItem);
  }

  const onPlaceChanged = () => {
    if (autocomplete != null) {
      map.panTo({
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng()
      })
      marker.setPosition({
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng()
      })
      helper.setValue({
        latitude: marker.getPosition().lat(),
        longitude: marker.getPosition().lng(),
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  const handleDragMarker = () => {
    helper.setValue({
      latitude: marker.getPosition().lat(),
      longitude: marker.getPosition().lng(),
    })
  }
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} onLoad={onLoadMap}>
      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged} fields={["geometry.location"]}>
        <input
            type="text"
            placeholder="Nhập vị trí phòng"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
            }}
          />
      </Autocomplete>
      <Marker onLoad={onLoadMarker} draggable position={center} onDragEnd={handleDragMarker}/>
    </GoogleMap>
  )
}

export default MapField