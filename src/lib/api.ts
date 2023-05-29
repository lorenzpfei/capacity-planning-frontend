import axios from 'axios'

export const api = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_PUBLIC_API_URL}/api`,
})
