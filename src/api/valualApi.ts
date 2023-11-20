import axios from 'axios'

const valualApi = axios.create({
  baseURL: 'https://lab.valual.com/api/v1/'
})

export default valualApi
