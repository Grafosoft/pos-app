import { Products } from '@/components/products/Products'
import { ShoppingCart } from '@/components/shopping/ShoppingCart'
import { type ProductList } from '@/interface/products'
import type { GetServerSideProps } from 'next'
import { ValidateAppColor } from '@/utils/validateAppColor'


import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState
} from 'react'

interface ProductContextType {
  productList: ProductList[]
  setProductList: Dispatch<SetStateAction<ProductList[]>>
}

interface VariablesUrl {
  companyId: string;
  apikey: string;
  name?: string;
  functionApi: () => void;
  validateAppColor: object;
}

interface Props {
  PropsServer: VariablesUrl
}

export const UrlContext = createContext<VariablesUrl>({
  companyId: "",
  apikey: "",
  name: "",
  functionApi: () => { },
  validateAppColor: {}
});


export const ProductContext = createContext<ProductContextType>({
  productList: [],
  setProductList: () => []
})


export default function Home({ PropsServer }: Props) {
  const { companyId, apikey, name } = PropsServer;
  const [productList, setProductList] = useState<ProductList[]>([])

  // FUNCTION VALIDATE APPCOLOR AND VALIDATE APP-API
  const validateAppColor = ValidateAppColor(name);
  const functionApi = () => { }; // Colocar funcion de validacion de axios


  return (
    <UrlContext.Provider value={{ companyId, apikey, functionApi, validateAppColor }}>
      <ProductContext.Provider value={{ productList, setProductList }}>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let params = ctx.params;
  let query = ctx.query;

  let PropsServer = {
    companyId: query.companyId,
    apikey: query.apikey,
    name: params?.nameApp
  }
  console.log(PropsServer)

  return {
    props: { PropsServer }
  }
}

