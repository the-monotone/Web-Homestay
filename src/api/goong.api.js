import axios from 'axios';
import { GOONG_API_KEY } from '../config';
export const autocompleteApi = (input, callback, error) => {
    var nonSpaceInput = input.replace(" ", "%20");
    const path = `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&input=${nonSpaceInput}`;
    axios
        .get(path)
        .then(callback)
        .catch(error);
}

export const placeDetailApi = (place_id, callback, error) => {
    const path = `https://rsapi.goong.io/geocode?place_id=${place_id}&api_key=${GOONG_API_KEY}`;
    axios   
        .get(path)
        .then(callback)
        .catch(error)
}