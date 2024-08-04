import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/login`

export async function login(credentials) {
  const response = await axios.post(BASE_URL, credentials)
  return response.data
}
