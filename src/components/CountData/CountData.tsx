import { Button } from '@nextui-org/react'
import React, { type FC, useState, useContext, useEffect } from 'react'
import { RiAddFill } from 'react-icons/ri'
import { TbMinus } from 'react-icons/tb'
import { ProductContext } from '@/pages/[nameApp]'
import { type ProductList } from '@/interface/products'
import { totalTaxPer } from '@/utils/totalPaxPer'

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
  const [count, setCount] = useState(productObject.quantity)

  // ProductContext
  const context = useContext(ProductContext)
  const { productList, setProductList } = context

  // FILTER AND GET INDEX
  const validId = (element: ProductList) => element.id === productObject.id
  const indexFilterProduct = productList.findIndex(validId)

  const handleMinus = () => {
    // CHANGE AMOUNT PRICE AND SAVE
    const arrayEdit = productList.map((element, index) => {
      if (index === indexFilterProduct) {
        setCount(count - interval)
        element.quantity = count - 1
        element.value = element.value - element.price
        element.totalAmount =
          element.totalAmount -
          element.price -
          element.value * (totalTaxPer(element.tax) / 100)
      }
      return element
    })
    setProductList(arrayEdit)
  }

  useEffect(() => {
    setCount(productObject.quantity)
  }, [productObject.quantity])

  const handleAdd = () => {
    // CHANGE AMOUNT PRICE AND SAVE
    const arrayEdit = productList.map((element, index) => {
      if (index === indexFilterProduct) {
        setCount(count + interval)
        element.quantity = count + 1
        element.value = element.price * (count + 1)
        element.totalAmount =
          element.value * (totalTaxPer(element.tax) / 100) + element.value
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
          onPress={() => {
            handleAdd()
          }}
        >
          <RiAddFill size={20} />
        </Button>
      </div>
    </>
  )
}
