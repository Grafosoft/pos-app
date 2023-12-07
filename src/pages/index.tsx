import { Products } from '@/components/products/Products'
import { ShoppingCart } from '@/components/shopping/ShoppingCart'
import { type ProductList } from '@/interface/products'

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

export const ProductContext = createContext<ProductContextType>({
  productList: [],
  setProductList: () => []
})

export default function Home() {
  const [productList, setProductList] = useState<ProductList[]>([])

  return (
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
  )
}
