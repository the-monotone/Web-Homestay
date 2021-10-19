import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import beHostReducer from "./beHostSlice";

const reducer = combineReducers({
    beHost: beHostReducer,
    form: formReducer
});

const store = createStore(reducer);
export default store;