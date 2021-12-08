import api from "../constants/api";

const url = "/songs";

export const getAll = () => api.get(url);
export const addSong = (song) => api.post(url, song);
export const updateSong = (song) => api.patch(`${url}/${song.id}`, song);
export const deleteSong = (id) => api.delete(`${url}/${id}`);
