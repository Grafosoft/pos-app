import { type ProductList } from '@/interface/products'
import type { GetServerSideProps } from 'next'
import {
  type EstructureColor,
  validateAppColor
} from '@/utils/validateAppColor'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState
} from 'react'
import { validateAppApi } from '@/api/validateAppApi'
import axios, { type AxiosInstance } from 'axios'
import { SaleView } from '@/components/saleView/SaleView'

interface ProductContextType {
  productList: ProductList[]
  setProductList: Dispatch<SetStateAction<ProductList[]>>
}

export interface VariablesUrl {
  companyId: string
  apikey: string
  name: string
  functionApi: AxiosInstance
  color: EstructureColor
}

interface Props {
  PropsServer: VariablesUrl
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

export const ProductContext = createContext<ProductContextType>({
  productList: [],
  setProductList: () => []
})

export default function Home({ PropsServer }: Props) {
  const { companyId, apikey, name } = PropsServer
  const [productList, setProductList] = useState<ProductList[]>([])

  // FUNCTION VALIDATE APPCOLOR AND VALIDATE APP-API
  const functionApi = validateAppApi(name)
  const color = validateAppColor(name)

  return (
    <UrlContext.Provider
      value={{ companyId, apikey, functionApi, color, name }}
    >
      <ProductContext.Provider value={{ productList, setProductList }}>
        <SaleView name={name} color={color} />
      </ProductContext.Provider>
    </UrlContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const params = ctx.params
  const query = ctx.query

  const PropsServer = {
    companyId: query.companyId,
    apikey: query.apikey,
    name: params?.nameApp
  }

  return {
    props: { PropsServer }
  }
}
