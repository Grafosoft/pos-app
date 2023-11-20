import axios from 'axios'

const cuentalApi = axios.create({
  baseURL: 'https://lab.cuental.com/api/v1/'
})

export default cuentalApi
