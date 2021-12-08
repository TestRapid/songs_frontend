import { LOGIN, LOGOUT } from "../constants/auth";
import swal from "sweetalert";

// importing api
import * as api from "../apis/auth";

// action login
export const login = (user) => async (dispatch) => {
	try {
		dispatch({
			type: LOGIN,
			payload: user
		});
	} catch (err) {
		console.log(err.message);
	}
};

// action for logout
export const logout = () => async (dispatch) => {
	try {
		swal({
			icon: "warning",
			title: "Are you sure to logout!",
			dangerMode: true,
			buttons: true
		}).then((res) => {
			if (res) {
				dispatch({
					type: LOGOUT
				});
				swal({
					title: "success",
					icon: "success",
					timer: 2000
				});
			}
		});
	} catch (err) {
		console.log(err.message);
	}
};

// adding to playlist
export const add_to_list = (user, id, list) => async (dispatch) => {
	try {
		if (!user.playlist[list]) {
			user.playlist[list] = [id];
		} else if (!!user.playlist[list].includes(id)) {
			swal({
				title: `Already it's in ${list}`,
				icon: "warning",
				timer: 2300
			});
			throw new Error("already have it");
		} else {
			user.playlist[list].push(id);
		}

		const { data } = await api.updateUser(user);

		swal({
			title: "Added successfully",
			text: `Song added to your ${list}`,
			icon: "success",
			timer: 2200
		});

		dispatch({
			type: LOGIN,
			payload: data
		});
	} catch (err) {
		console.log(err.message);
	}
};

// action remove playlist
export const remove_list = (id, user) => async (dispatch) => {
	try {
		delete user.playlist[id];
		const { data } = await api.updateUser(user);

		dispatch({
			type: LOGIN,
			payload: data
		});
	} catch (err) {
		console.log(err.message);
	}
};

// action to remove song from the list
export const remove_from_playlist = (pid, id, user) => async (dispatch) => {
	try {
		user.playlist[pid] = user.playlist[pid].filter((s) => s !== id);
		const { data } = await api.updateUser(user);
		dispatch({
			type: LOGIN,
			payload: data
		});
	} catch (err) {
		console.log(err.message);
	}
};
