// importing actions
import {
	ADD_SONG,
	REMOVE_SONG,
	UPDATE_SONG,
	DELETE_MULTIPLE,
	FETCH_SONGS
} from "../constants/songs";

const initState = { list: [], isLoading: true };

export const songs = (songs = initState, action) => {
	switch (action.type) {
		case FETCH_SONGS: {
			songs.list = action.payload;
			songs.isLoading = false;
			return songs;
		}
		case ADD_SONG: {
			songs.list.push(action.payload);
			return songs;
		}
		case REMOVE_SONG: {
			songs.list = songs.list.filter((s) => s.id !== action.payload);
			return songs;
		}
		case UPDATE_SONG: {
			songs.list.forEach((s) => {
				if (s.id === action.payload) s = action.payload;
			});
			return songs;
		}
		case DELETE_MULTIPLE: {
			songs.list = songs.list.filter((s) => {
				return !action.payload.includes(s.id);
			});
			return songs;
		}
		default:
			return songs;
	}
};

export default songs;
