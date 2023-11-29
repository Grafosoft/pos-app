import { useContext, type FC } from 'react'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { TruncateText } from '../../utils/TruncateText'
import { ProductContext } from '@/pages'
import { type interfaceProduct } from '@/interface/products'

interface Props {
  product: interfaceProduct
}

export const CardProduct: FC<Props> = ({ product }) => {
  const formatDouble = new Intl.NumberFormat('en-DE')

  const context = useContext(ProductContext)
  const { productList, setProductList } = context

  const handleSaveProduct = () => {
    setProductList([
      ...productList,
      {
        id: 0,
        name: product.name,
        salePrice: product.salePrice,
        image: product.image,
        groupName: product.group.name,
        taxValue: product.tax.value
      }
    ])
  }

  return (
    <div className="flex justify-center  h-[30vh] w-[27vh] ">
      <Card
        className="p-1  w-[27vh] shadow-sm"
        isPressable
        onPress={handleSaveProduct}
      >
        <CardHeader className="p-0 flex-col items-center">
          {product.image && product.image.length > 3 ? (
            <div className="flex items-center rounded-full  h-[130px]">
              <Image
                alt="Card background"
                className="object-cover rounded-full w-[100px] h-[100px] "
                src={product.image}
                width={270}
              />
            </div>
          ) : (
            <div className="pt-5">
              <div className="flex items-center justify-center bg-purple-100 rounded-full w-[100px] h-[100px] mb-0 ">
                <span className="text-3xl uppercase dark:text-black ">
                  {product.name.substring(0, 3).replace(/\s+/g, '')}
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardBody className="px-5 py-0 flex overflow-visible items-center  space-y-7 ">
          <div className="flex flex-col mt-5">
            <p className=" uppercase text-center font-medium text-sm mb-1 ">
              {TruncateText(product.name, 16)}
            </p>
            <small className="text-default-500 text-center text-md ">
              {TruncateText(product.group.name, 28)}
            </small>
          </div>
          <p className="font-medium text-large mt-0">
            $ {formatDouble.format(product.salePrice)}
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
