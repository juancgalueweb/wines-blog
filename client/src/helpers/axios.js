import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL
const KEY = 'wines-app'

export const axiosWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`
  return axios({ method, url, data })
}

export const axiosWithToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(KEY)).token || ''
  return axios({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      'x-token': token
    }
  })
}

export const axiosWithTokenImageUpload = (endpoint, data, method) => {
  const url = `${baseUrl}/${endpoint}`
  const token = JSON.parse(localStorage.getItem(KEY)).token || ''
  return axios({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-token': token
    }
  })
}
