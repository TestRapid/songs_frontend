import { combineReducers } from "redux";

// importing auth reducer
import auth from "./auth";
import songs from "./songs";

// implementing combined reducer
const reducers = combineReducers({
	auth,
	songs
});

export default reducers;
