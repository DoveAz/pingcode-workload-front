import axios, { AxiosInstance } from 'axios'
export function createService(baseURL: string): AxiosInstance {
  const service = axios.create({
    baseURL,
  })

  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    },
  )

  service.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      // do something with response error
      console.log(error) // for debug
      return Promise.reject(error)
    },
  )
  return service
}

export const service = createService('/api')
