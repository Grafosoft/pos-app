import axios from 'axios'


export const ValidateAppApi = (name: string | undefined) => {

    let parameterAxios = {}
    switch (name) {
        case "cuental":
            parameterAxios = {
                baseURL: 'https://lab.cuental.com/api/v1/'
            }
            break;
        case "valual":
            parameterAxios = {
                baseURL: 'https://lab.valual.com/api/v1/'
            }
            break;
        case "otro":
            parameterAxios = {
                baseURL: 'https://lab.valual.com/api/v1/'
            }
            break;
        default:
            parameterAxios = {
                baseURL: 'https://lab.valual.com/api/v1/'
            }

    }

    const cuentalApi =  axios.create(parameterAxios)


    return cuentalApi;
}