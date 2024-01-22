import axios from 'axios';
import {useAuth} from '~/store/auth';

export const apiAxiosInstance = () => {
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  const instance = axios.create({
    // baseURL: baseUrl,
    withCredentials: true,
    headers: requestHeaders,
  })

  const auth = useAuth()
  const router = useRouter()

  instance.interceptors.request.use(
    request => {
      if (useAuth().getToken) {
        request.headers['Authorization'] = `Bearer ${useAuth().getToken}`
      }
      return request
    },
    error => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 401) {
        if (auth.isAuthenticated) {
          auth.logout().finally(() => {
            auth.removeAuthInfo()
            router.push('/auth/login')
          })
        } else {
          router.push('/auth/login')
        }
      }
      return Promise.reject(error)
    },
  )

  return instance
}
