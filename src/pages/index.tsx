import { Products } from '@/components/products/Products'
import { ShoppingCart } from '@/components/shopping/ShoppingCart'
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState
} from 'react'

interface ProductList {
  id: number
  name: string
  salePrice: number
  image: string | null
  groupName: string
  taxValue: number
}

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
      <div className="grid grid-cols-12 h-[86vh]">
        <div className="col-span-5 md:col-span-6 lg:col-span-7 h-[86vh] p-4 ">
          <Products />
        </div>
        <div className="col-span-7 md:col-span-6 lg:col-span-5  min-h-[86vh] bg-white dark:border-slate-800 border-l">
          <ShoppingCart />
        </div>
      </div>
    </ProductContext.Provider>
  )
}
