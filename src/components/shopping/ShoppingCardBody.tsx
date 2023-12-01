import {  FC, useContext } from 'react';

import { Button, Card, CardBody } from '@nextui-org/react';

import { ShowPrices } from '@/utils/ShowPrices';
import { TruncateText } from '@/utils/TruncateText'
import { ProductContext } from '@/pages';

import { ImageRound } from '../imageRound/ImageRound';
import { CountData } from '../CountData/CountData'
import { TbEdit,TbShoppingCartPlus,TbTrash } from "react-icons/tb";


// COMPONENT
export const ShoppingCardBody: FC = () => {
  const context = useContext(ProductContext)
  const { productList, setProductList } = context;

  // Function delete in product
  const deleteProductOfCar = (idEliminar: number) => {
    let arrayDelete = productList.filter((element) => element.id !== idEliminar)
    setProductList(arrayDelete);
  }
  
  return (

    <div className="w-full overflow-auto max-h-[50vh] min-h-[50vh] p-3 bg-[#F5F6FA] dark:bg-[#18181B]">
      {productList.length === 0 ? (
        <div className="w-full h-[44vh] flex flex-col  justify-center items-center">
          <TbShoppingCartPlus color="#A1A1AA" size={50} />
          <h1 className="mt-4 text-neutral-400  text-lg font-mono text-center">
            Aquí verás los productos que <br />
            elijas en tu próxima venta
          </h1>
        </div>
      ) : (
        productList.map((element, index) => (
          <Card className="mb-3" key={element.id}>
            <CardBody>
              <div className="flex justify-between  items-center">
                <div className="flex gap-3">
                  <ImageRound image={element.image} name={element.name} formeRound={false} />
                  <div className="flex flex-col justify-around">
                    <p className="text-xl font-medium">{TruncateText(element.name)}</p>
                    <p className="text-small text-default-500">{TruncateText(element.groupName)}</p>
                    <ShowPrices price={element.salePrice} total={123} discount={1231} tax={12391} />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 ">
                  <div className="flex gap-3">
                    <Button isIconOnly color="primary" variant="flat" size="sm" aria-label="Like">
                      <TbEdit size={15} />
                    </Button>
                    <Button onClick={() => deleteProductOfCar(element.id)} isIconOnly color="danger" variant="flat" size="sm" edaria-label="Take a photo">
                      <TbTrash size={15} />
                    </Button>
                  </div>
                  <div>
                    <CountData />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))
      )}
    </div>

  )
}