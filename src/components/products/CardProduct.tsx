import { useContext, useState, useEffect, type FC } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { type interfaceProduct } from '@/interface/products'
import { TruncateText } from '../../utils/TruncateText'
import { ImageRound } from '../imageRound/ImageRound'
import { addProductCart } from '@/utils/addProductCart'
import { ProductContext } from '@/context/ProductContext'

interface Props {
  product: interfaceProduct
}

export const CardProduct: FC<Props> = ({ product }) => {
  const formatDouble = new Intl.NumberFormat('en-DE')

  const context = useContext(ProductContext)
  const { productList, setProductList } = context

  const handleSaveProduct = () => {
    addProductCart(productList, setProductList, product)
  }
  // Extrac Width Actualiti
  const [width, getwidth] = useState(0)
  useEffect(() => {
    const validateWidth = window.innerWidth
    getwidth(validateWidth)
  }, [])
  return (
    <div className="flex justify-center  h-[32vh] lg:h-[30vh] w-[27vh] ">
      <Card
        className="p-1  w-[27vh] shadow-sm"
        isPressable
        onPress={handleSaveProduct}
      >
        <CardHeader className="p-0 flex-col items-center">
          <div className="mt-5">
            <ImageRound
              image={product.image}
              name={product.name}
              formeRound={false}
            />
          </div>
        </CardHeader>
        <CardBody className="px-5 py-0 flex overflow-visible items-center  space-y-7 ">
          <div className="flex flex-col mt-5">
            <p className=" uppercase text-center font-medium text-sm mb-1 ">
              {TruncateText(product.name, 16)}
            </p>
            <small className="text-default-500 text-center text-md  ">
              {TruncateText(product.group.name, width < 1230 ? 16 : 28)}
            </small>
          </div>
          <div className="font-medium text-large mt-10">
            <p className="">$ {formatDouble.format(product.salePrice)}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
