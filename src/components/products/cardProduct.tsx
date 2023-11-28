import { type FC } from 'react'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { TruncateText } from '../../utils/TruncateText'

interface Props {
  precioProducto: number | string
  nombreProducto: string
  categoriaProducto: string
  imgProducto?: string | null
}

export const CardProduct: FC<Props> = ({
  precioProducto,
  nombreProducto,
  categoriaProducto,
  imgProducto
}) => {
  return (
    <div className="flex justify-center  h-[30vh] w-[27vh] ">
      <Card
        className="p-1  w-[27vh] shadow-sm"
        isPressable
        onPress={() => {
          console.log('Targeta precionada')
        }}
      >
        <CardHeader className="p-0 flex-col items-center">
          {imgProducto && imgProducto.length > 3 ? (
            <div className="flex items-center rounded-full  h-[130px]">
              <Image
                alt="Card background"
                className="object-cover rounded-full w-[100px] h-[100px] "
                src={imgProducto}
                width={270}
              />
            </div>
          ) : (
            <div className="pt-5">
              <div className="flex items-center justify-center bg-purple-100 rounded-full w-[100px] h-[100px] mb-0 ">
                <span className="text-3xl uppercase dark:text-black ">
                  {nombreProducto.substring(0, 3).replace(/\s+/g, '')}
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardBody className="px-5 py-0 flex overflow-visible items-center  space-y-7 ">
          <div className="flex flex-col mt-5">
            <p className=" uppercase text-center font-medium text-sm mb-1 ">
              {TruncateText(nombreProducto, 16)}
            </p>
            <small className="text-default-500 text-center text-md ">
              {TruncateText(categoriaProducto, 28)}
            </small>
          </div>
          <p className="font-medium text-large mt-0">$ {precioProducto}</p>
        </CardBody>
      </Card>
    </div>
  )
}
