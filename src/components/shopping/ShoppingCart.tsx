import React, {
  createContext,
  useState,
  type FC,
  type Dispatch,
  type SetStateAction
} from 'react'

import { ShoppingCardHeader } from './ShoppingCardHeader'
import { ShoppingCardBody } from './ShoppingCardBody'
import { ShoppingCardFooder } from './ShoppingCardFooder'

interface PriceContextTye {
  priceInfo: object
  setPriceInfo: Dispatch<SetStateAction<object>>
}

export const PriceContext = createContext<PriceContextTye>({
  priceInfo: {},
  setPriceInfo: () => {}
})

export const ShoppingCart: FC = () => {
  const [priceInfo, setPriceInfo] = useState({})

  return (
    <PriceContext.Provider value={{ priceInfo, setPriceInfo }}>
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
    </PriceContext.Provider>
  )
}
