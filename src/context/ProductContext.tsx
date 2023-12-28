import { type ProductList } from '@/interface/products'
import { type Dispatch, type SetStateAction, createContext } from 'react'

interface ProductContextType {
  productList: ProductList[]
  setProductList: Dispatch<SetStateAction<ProductList[]>>
}

export const ProductContext = createContext<ProductContextType>({
  productList: [],
  setProductList: () => []
})
