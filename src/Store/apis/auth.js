import api from "../constants/api";

const url = "/users";

export const addUser = (user) => api.post(url, user);
export const getUser = (id) => api.get(`${url}/${id}`);
export const updateUser = (user) => api.patch(`${url}/${user.id}`, user);
