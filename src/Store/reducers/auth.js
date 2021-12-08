import { LOCAL_AUTH, LOGIN, LOGOUT } from "../constants/auth";

const initState = JSON.parse(localStorage.getItem(LOCAL_AUTH));

export const auth = (auth = initState, action) => {
	switch (action.type) {
		case LOGIN: {
			auth = { user: action.payload };
			localStorage.setItem(LOCAL_AUTH, JSON.stringify(auth));
			return auth;
		}
		case LOGOUT: {
			localStorage.removeItem(LOCAL_AUTH);
			return null;
		}
		default:
			return auth;
	}
};

export default auth;
