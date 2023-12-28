import { type EstructureColor } from '@/utils/validateAppColor'
import axios, { type AxiosInstance } from 'axios'
import { createContext } from 'react'

export interface VariablesUrl {
  companyId: string
  apikey: string
  name: string
  functionApi: AxiosInstance
  color: EstructureColor
}

export const UrlContext = createContext<VariablesUrl>({
  companyId: '',
  apikey: '',
  name: '',
  functionApi: axios.create({}),
  color: {
    colorApp: 'ffff',
    colorProduct: '',
    colorComponent: 'primary'
  }
})
