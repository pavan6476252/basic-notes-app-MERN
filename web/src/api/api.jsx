import axios from "axios";
// console.log(import.meta.env.VITE_BACKEND_URL)
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL + "api" });

export const getNotes = (query) => API.get(`/notes${query ? `?${query}` : ""}`);
export const createNote = (data) => API.post("/notes", data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
