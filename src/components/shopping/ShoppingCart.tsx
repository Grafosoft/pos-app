import React, {
type FC,
  useContext
} from 'react'


import { ProductContext } from '@/pages'
import { ShoppingCardHeader } from './ShoppingCardHeader'
import { ShoppingCardBody } from './ShoppingCardBody';
import { ShoppingCardFooder } from './ShoppingCardFooder';


export const ShoppingCart: FC = () => {
  // Import ProductContext
  const context = useContext(ProductContext)
  const { productList, setProductList } = context;


  return (
    <div className="mi flex flex-col min-h-[86vh]">

      <div>
        <ShoppingCardHeader />
      </div>

      <div>
        <ShoppingCardBody />
      </div>

      <div>
        <ShoppingCardFooder />
      </div>

    </div>
  )
}
