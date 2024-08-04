import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/notes`

let token = null
export const setToken = (newToken) => (token = `Bearer ${newToken}`)

export function getNotes() {
  return axios.get(BASE_URL).then((response) => response.data)
}

export function createNote(data) {
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(BASE_URL, data, config).then((response) => response.data)
}

export function updateNote(id, data) {
  return axios.put(`${BASE_URL}/${id}`, data).then((response) => response.data)
}
