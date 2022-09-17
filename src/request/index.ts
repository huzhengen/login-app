import axios from "axios";

export const request = axios.create({
  baseURL: '/'
});

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && (config.url!.split('=')[1] === '2')) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
