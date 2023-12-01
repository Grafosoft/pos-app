import { Button } from '@nextui-org/react'
import React, { type FC, useState, useContext } from 'react'
import { RiAddFill } from 'react-icons/ri'
import { TbMinus } from 'react-icons/tb'
import { ProductContext } from '@/pages'
import { type ProductList } from '@/interface/products'

interface Props {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  interval?: number
  isDisabledMinus?: boolean
  productObject: ProductList
}

export const CountData: FC<Props> = ({
  color = 'primary',
  interval = 1,
  isDisabledMinus = false,
  productObject
}) => {
  const [count, setCount] = useState(1)

  // ProductContext
  const context = useContext(ProductContext)
  const { productList, setProductList } = context

  // FILTER AND GET INDEX
  const validId = (element: ProductList) => element.id === productObject.id
  const indexFilterProduct = productList.findIndex(validId)

  const handleMinus = () => {
    setCount(count - interval)

    // CHANGE AMOUNT PRICE AND SAVE
    const arrayEdit = productList.map((element, index) => {
      if (index === indexFilterProduct) {
        element.amountPrice = element.amountPrice - element.salePrice
      }
      return element
    })

    setProductList(arrayEdit)
  }

  const handleAdd = () => {
    setCount(count + interval)

    // CHANGE AMOUNT PRICE AND SAVE
    const arrayEdit = productList.map((element, index) => {
      if (index === indexFilterProduct) {
        element.amountPrice = element.salePrice * (count + 1)
        element.total =
          element.amountPrice * (element.taxValue / 100) + element.amountPrice
      }
      return element
    })

    setProductList(arrayEdit)
  }

  return (
    <>
      <div className="flex items-center">
        <Button
          size="sm"
          color={color}
          variant="flat"
          isDisabled={count <= 1}
          isIconOnly
          style={{
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0'
          }}
          onPress={handleMinus}
        >
          <TbMinus size={20} />
        </Button>
        <div className="container w-12 bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
          <p style={{ padding: '2px 0' }} className="font-medium text-xl">
            {count}
          </p>
        </div>
        <Button
          size="sm"
          color={color}
          variant="flat"
          isIconOnly
          style={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0'
          }}
          onPress={handleAdd}
        >
          <RiAddFill size={20} />
        </Button>
      </div>
    </>
  )
}
