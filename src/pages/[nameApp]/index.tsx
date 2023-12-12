import { Products } from '@/components/products/Products'
import { ShoppingCart } from '@/components/shopping/ShoppingCart'
import { type ProductList } from '@/interface/products'
import type { GetServerSideProps } from 'next'
import { validateAppColor } from '@/utils/validateAppColor'
import { NavBar } from '@/components/navbar/NavBar'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState
} from 'react'
import { validateAppApi } from '@/api/validateAppApi'
import axios, { type AxiosInstance } from 'axios'

interface ProductContextType {
  productList: ProductList[]
  setProductList: Dispatch<SetStateAction<ProductList[]>>
}
interface Estructure {
  colorApp: string
  colorProduct: string
  colorComponent:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
}
interface VariablesUrl {
  companyId: string
  apikey: string
  name: string
  functionApi: AxiosInstance
  color: Estructure
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
    colorApp: '',
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
        <NavBar />
        <div
          className="grid grid-cols-12"
          style={{ minHeight: 'calc(100vh - 128px)' }}
        >
          <div
            className="col-span-5 md:col-span-6 lg:col-span-7 p-5 pb-0 "
            style={{ minHeight: 'calc(100vh - 128px)' }}
          >
            <Products />
          </div>
          <div
            className="col-span-7 md:col-span-6 lg:col-span-5 bg-white dark:border-slate-800 dark:bg-black border-l"
            style={{ minHeight: 'calc(100vh - 128px)' }}
          >
            <ShoppingCart />
          </div>
        </div>
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
