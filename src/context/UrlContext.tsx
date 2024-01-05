import { type EstructureColor } from '@/utils/validateAppColor'
import axios, { type AxiosInstance } from 'axios'
import { createContext } from 'react'

export interface VariablesUrl {
  companyId: string
  apikey: string
  name: string
  functionApi: AxiosInstance
  color: EstructureColor
  idTable?: number
  nameTable?: string
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
  },
  idTable: 0
})
