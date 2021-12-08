import { v4 } from "uuid";

// importing api
import * as api from "../apis/songs";

// importing constants
import {
	FETCH_SONGS,
	ADD_SONG,
	UPDATE_SONG,
	REMOVE_SONG,
	DELETE_MULTIPLE
} from "../constants/songs";

// action for fetching song
export const fetch_songs = () => async (dispatch) => {
	try {
		const { data } = await api.getAll();
		dispatch({
			type: FETCH_SONGS,
			payload: data
		});
	} catch (err) {
		console.log(err.message);
	}
};

// action for adding song
export const add_song = (song, user) => async (dispatch) => {
	try {
		song.id = v4();
		song.views = 0;
		song.userId = user.id;
		song.name = user.firstName;
		const { data } = await api.addSong(song);
		dispatch({
			type: ADD_SONG,
			payload: data
		});
	} catch (err) {
		console.log(err.message);
	}
};

// action for updating song
export const update_song = (song) => async (dispatch) => {
	try {
		const { data } = await api.updateSong(song);
		dispatch({
			type: UPDATE_SONG,
			payload: data
		});
	} catch (err) {
		console.log(err.message);
	}
};

// action for removing song
export const remove_song = (id) => async (dispatch) => {
	try {
		if (id === "") throw new Error("invalid song");

		await api.deleteSong(id);

		dispatch({
			type: REMOVE_SONG,
			payload: id
		});
	} catch (err) {
		console.log(err.message);
	}
};

// action for removing multiple songs
export const delete_multiple = (arr) => async (dispatch) => {
	const data = await Promise.all(
		arr.map(async (id) => {
			try {
				await api.deleteSong(id);
				return id;
			} catch (err) {
				console.log(err.message);
			}
		})
	);
	dispatch({
		type: DELETE_MULTIPLE,
		payload: data
	});
};

// action for updating view
export const view = (song) => async (dispatch) => {
	try {
		song.views += 1;
		const { data } = await api.updateSong(song);
		dispatch({
			type: UPDATE_SONG,
			payload: data
		});
	} catch (err) {
		console.log(err.message);
	}
};
