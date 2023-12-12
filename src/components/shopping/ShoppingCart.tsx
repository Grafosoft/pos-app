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
  customerSearch: {
    id: number
    name: string
  }
  setCustomerSearch: Dispatch<SetStateAction<{ id: number; name: string }>>
}

export const ParametersContext = createContext<PriceContextTye>({
  parametersInfo: {},
  setParametersInfo: () => {},
  customerSearch: { id: 0, name: '' },
  setCustomerSearch: () => {}
})

export const ShoppingCart: FC = () => {
  const [parametersInfo, setParametersInfo] = useState({})
  const [customerSearch, setCustomerSearch] = useState({
    id: 0,
    name: ''
  })

  return (
    <ParametersContext.Provider
      value={{
        parametersInfo,
        setParametersInfo,
        customerSearch,
        setCustomerSearch
      }}
    >
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
