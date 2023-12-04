import { type FC, useContext, useState } from 'react'

import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'

import { ShowPrices } from '@/utils/ShowPrices'
import { type ProductList } from '@/interface/products'
import { TruncateText } from '@/utils/TruncateText'
import { ProductContext } from '@/pages'

import { ImageRound } from '../imageRound/ImageRound'
import { CountData } from '../CountData/CountData'
import { TbEdit, TbShoppingCartPlus, TbTrash } from 'react-icons/tb'

// COMPONENT
export const ShoppingCardBody: FC = () => {
  const [discountState, setDiscountState] = useState(0)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // ProductContext
  const context = useContext(ProductContext)
  const { productList, setProductList } = context

  // Function delete in product
  const deleteProductOfCar = (idEliminar: number) => {
    const arrayDelete = productList.filter(element => element.id !== idEliminar)
    setProductList(arrayDelete)
  }
  // Value the input of discount
  const valueInputDiscount = (
    elementProduct: ProductList,
    onClose: () => void
  ) => {
    const indexProduct = productList.findIndex(
      element => element.id === elementProduct.id
    )

    const arrayEditDiscount = productList.map((element, index) => {
      if (indexProduct === index) {
        element.total = element.amountPrice
        element.discount = discountState
        element.total = element.total - discountState
      }
      return element
    })
    setProductList(arrayEditDiscount)
    onClose()
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
                  <ImageRound
                    image={element.image}
                    name={element.name}
                    formeRound={false}
                  />
                  <div className="flex flex-col justify-around">
                    <p className="text-xl font-medium">
                      {TruncateText(element.name)}
                    </p>
                    <p className="text-small text-default-500">
                      {TruncateText(element.groupName)}
                    </p>
                    <ShowPrices
                      price={element.amountPrice}
                      discount={element.discount}
                      tax={element.amountPrice * (element.taxValue / 100)}
                      taxPorcentage={element.taxValue}
                      total={element.total}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 ">
                  <div className="flex gap-3">
                    <Button
                      isIconOnly
                      color="primary"
                      variant="flat"
                      size="sm"
                      onPress={onOpen}
                      aria-label="Like"
                    >
                      <TbEdit size={15} />
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {onClose => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              {element.name}
                            </ModalHeader>
                            <ModalBody>
                              <div className="p-5">
                                <Input
                                  type="number"
                                  label="Price"
                                  placeholder="0"
                                  labelPlacement="outside"
                                  // value={discountState.toString()}
                                  onValueChange={e => {
                                    setDiscountState(parseInt(e))
                                  }}
                                  startContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">
                                        $
                                      </span>
                                    </div>
                                  }
                                />
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                variant="flat"
                                onClick={() => {
                                  valueInputDiscount(element, onClose)
                                }}
                                color="primary"
                              >
                                Guardar
                              </Button>
                              <Button
                                color="danger"
                                variant="flat"
                                onPress={onClose}
                              >
                                Cerrar
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>

                    <Button
                      onClick={() => {
                        deleteProductOfCar(element.id)
                      }}
                      isIconOnly
                      color="danger"
                      variant="flat"
                      size="sm"
                      edaria-label="Take a photo"
                    >
                      <TbTrash size={15} />
                    </Button>
                  </div>
                  <div>
                    <CountData productObject={element} />
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
