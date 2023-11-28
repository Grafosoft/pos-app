import axios from 'axios'

const cuentalApi = axios.create({
  baseURL: 'https://lab.cuental.com/api/v1/'
})

/* https://app.cuental.com/api/v1/items/?companyId=9&page=0&apikey=b3e56960-7aa5-49fe-97ba-39d8c988d598&name= */
export default cuentalApi
