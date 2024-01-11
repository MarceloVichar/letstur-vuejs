import axios from 'axios';

export const axiosInstance = (baseUrl) => {
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  return axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: requestHeaders,
  })
}
