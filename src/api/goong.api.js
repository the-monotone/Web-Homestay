import axios from 'axios';
import { GOONG_API_KEY } from '../config';
export const autocompleteApi = (input, callback, error) => {
    var nonSpaceInput = input.replace(" ", "%20");
    if (nonSpaceInput.length < 5) return null;
    const key = GOONG_API_KEY[Math.floor(Math.random() * GOONG_API_KEY.length)]
    const path = `https://rsapi.goong.io/Place/AutoComplete?api_key=${key}&input=${nonSpaceInput}`;
    
    axios
        .get(path)
        .then(callback)
        .catch(error);
}

export const placeDetailApi = (place_id, callback, error) => {
    const key = GOONG_API_KEY[Math.floor(Math.random() * GOONG_API_KEY.length)]
    const path = `https://rsapi.goong.io/geocode?place_id=${place_id}&api_key=${key}`;
    axios   
        .get(path)
        .then(callback)
        .catch(error)
}