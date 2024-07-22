import axios from 'axios'

const BASE_URL = 'http://localhost:3000/notes'

export function getNotes() {
  return axios.get(BASE_URL).then((response) => response.data)
}

export function createNote(data) {
  return axios.post(BASE_URL, data).then((response) => response.data)
}

export function updateNote(id, data) {
  return axios.put(`${BASE_URL}/${id}`, data).then((response) => response.data)
}