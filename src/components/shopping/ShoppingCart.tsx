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
  parametersInfo: object
  setParametersInfo: Dispatch<SetStateAction<object>>
}

export const ParametersContext = createContext<PriceContextTye>({
  parametersInfo: {},
  setParametersInfo: () => {}
})

export const ShoppingCart: FC = () => {
  const [parametersInfo, setParametersInfo] = useState({})

  return (
    <ParametersContext.Provider value={{ parametersInfo, setParametersInfo }}>
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
    </ParametersContext.Provider>
  )
}
