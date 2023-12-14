import { type FC, useContext, useState, useEffect } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure
} from '@nextui-org/react'
import { CountData } from '../CountData/CountData'
import { TbEdit, TbTrash } from 'react-icons/tb'
import { ProductContext, UrlContext } from '@/pages/[nameApp]'
import { type Tax, type ProductList } from '@/interface/products'
import { totalTaxPer } from '@/utils/totalPaxPer'
import { SelectObject } from '../objectSelect/ObjectsSelect'
import { RiAddFill } from 'react-icons/ri'

interface Props {
  element: ProductList
}

export const ModalEdit: FC<Props> = ({ element }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [discountState, setDiscountState] = useState(0)

  // ProductContext
  const context = useContext(ProductContext)
  const { productList, setProductList } = context

  // TAX LIST SELECT
  const [newTax, setNewTax] = useState<Tax[]>([])

  // import Context UrlContext
  const { companyId, apikey, color, functionApi } = useContext(UrlContext)

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
    const newTaxModifict = newTax.filter(element => element.id !== 0)

    const indexProduct = productList.findIndex(
      element => element.id === elementProduct.id
    )

    const arrayEditDiscount = productList.map((element, index) => {
      if (indexProduct === index) {
        element.totalAmount =
          element.value + (element.value * totalTaxPer(element.tax)) / 100
        element.discount = discountState
        element.totalAmount = element.totalAmount - discountState
        element.tax = newTaxModifict
      }
      return element
    })
    setProductList(arrayEditDiscount)
    onClose()
  }

  const [taxSettings, setTaxSettings] = useState<Tax[]>([])

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await functionApi.get(
        `settings/invoices/items?companyId=${companyId}&apikey=${apikey}`
      )
      setTaxSettings(data.taxes)
      setNewTax(element.tax)
    }
    petiApi()
  }, [apikey, companyId, element.tax, functionApi])

  const handlerAddTax = () => {
    const ValidateNewTax = newTax.find(element => element.id === 0)
    if (!ValidateNewTax) {
      const newTaxObject = [
        ...newTax,
        {
          id: 0,
          name: '',
          value: 0,
          percentage: 0
        }
      ]
      setNewTax(newTaxObject)
    }
  }
  const handleCloseModal = () =>{
    setNewTax(element.tax)

  }

  return (
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} isDismissable={false} onClose={handleCloseModal} >
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader>{element.item.name}</ModalHeader>
                <ModalBody>
                  <div className="p-3 flex flex-col items-center ">
                    <Input
                      type="number"
                      label="Descuento"
                      placeholder="0"
                      defaultValue={(element.discount).toString()}
                      labelPlacement="outside"
                      onValueChange={e => {
                        setDiscountState(parseInt(e))
                      }}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                    />
                    <Spacer y={5} />
                    <div className="w-full flex justify-between items-center my-4">
                      <p className="text-sm">Lista de Impuestos</p>
                      <Button
                        size="sm"
                        onClick={handlerAddTax}
                        variant="flat"
                        isIconOnly
                        color="success"
                      >
                        <RiAddFill size={17} />
                      </Button>
                    </div>
                    <div className="w-full flex flex-col items-center gap-3 overflow-scroll max-h-[200px] ">
                      {newTax.map(
                        (elemenTax, index) =>
                          taxSettings.length !== 0 && (
                            <SelectObject
                              key={index}
                              arrayFind={taxSettings}
                              taxId={
                                elemenTax.id ? elemenTax.id : 0
                              }
                              textType="Impuesto"
                              newTax={newTax}
                              setNewTax={setNewTax}
                            />
                          )
                      )}
                    </div>
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
                  <Button color="danger" variant="flat" onPress={onClose}>
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
        <CountData productObject={element} color={color.colorComponent} />
      </div>
    </div>
  )
}
