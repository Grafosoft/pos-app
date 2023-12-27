import axios from 'axios'

export const validateAppApi = (name: string) => {
  const parameterAxios = { baseURL: `https://lab.${name}.com/api/v1/` }
  const cuentalApi = axios.create(parameterAxios)

  return cuentalApi
}
