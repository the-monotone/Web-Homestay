import '@goongmaps/goong-js/dist/goong-js.css';
import '@goongmaps/goong-geocoder/dist/goong-geocoder.css'
import React, { useEffect } from 'react';
import { useField, ErrorMessage } from 'formik';
import { GOONG_MAP_KEY, GOONG_API_KEY } from '../../config';

const GoongGeocoder = require('@goongmaps/goong-geocoder');
const goongjs = require('@goongmaps/goong-js');
goongjs.accessToken = GOONG_MAP_KEY[Math.floor(Math.random() * GOONG_MAP_KEY.length)];

let map, geocoder;

const MapField = ({label, ...props}) => {
  const [field,,helper] = useField(props);
  useEffect(() => {
    if (map == null) {
      map = new goongjs.Map({
        container: 'map',
        style: 'https://tiles.goong.io/assets/goong_map_web.json',
        center: [105.853460, 21.026975],
        zoom: 14
      })
      geocoder = new GoongGeocoder({
        accessToken: GOONG_API_KEY[Math.floor(Math.random() * GOONG_API_KEY.length)],
        goongjs: goongjs,
        marker: {
          draggable: true
        }
      })
      map.addControl(geocoder);
    }

    return () => {
      if (geocoder && geocoder.mapMarker) {
        helper.setValue({
          latitude: geocoder.mapMarker._lngLat.lat,
          longitude: geocoder.mapMarker._lngLat.lng
        })
      }
      map.remove();
      map = null;
    }
  }, [helper]);
    

  return (
    <div className="w-100 h-100">
      <div className="w-100 h-100" id="map" />
      <ErrorMessage name={field.name} component='div' style={{color:'red'}}/>
    </div>
  )
}

export default MapField