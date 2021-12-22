import axios from "axios";
import { GOOGLE_MAP_KEY } from "../config";


export const placeAutocompleteApi = (input) => {
    var nonSpaceInput = input.replace(" ", "%20");
    const path = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${nonSpaceInput}&components=country:vn&language=vi&key=${GOOGLE_MAP_KEY}`;
    const config = {
        method: 'get',
        url: path,
        secure: false
    }
    
    return axios(config)
        .then(res => res.data.predictions)
        .catch(err => {
            console.error(err);
            throw(err);
        })
}

export const placeDetailsApi = (place_id) => {
    const path = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&region=vn&language=vi&key=${GOOGLE_MAP_KEY}`;
    const config = {
        method: 'get',
        url: path,
        secure: false
    }
    return axios(config)
        .then(res => res.data.result)
        .catch(err => {
            console.error(err);
            throw(err);
        })
}