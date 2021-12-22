import axios from "axios";

export const placeAutocompleteApi = (input) => {
    var nonSpaceInput = input.replace(" ", "%20");
    const path = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${nonSpaceInput}&components=country:vn&language=vi&key={}`;
    return axios.get(path)
        .then(res => res.data.predictions)
        .catch(err => {
            console.error(err);
            throw(err);
        })
}

export const placeDetailApi = (place_id) => {
    const path = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&region=vn&language=vi&key={}`;
    return axios.get(path)
        .then(res => res.data)
        .catch(err => {
            console.error(err);
            throw(err);
        })
}