import cuentalApi from '@/api/cuentalApi'
import { InvoiceParameters, Numeration, Seller } from '@/interface/invoiceParameters'
import { ProductContext } from '@/pages'
import { totalTaxPer } from '@/utils/totalPaxPer'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import { type FC, useContext, useState, useEffect, ChangeEvent } from 'react'
import { ParametersContext } from './ShoppingCart'

// COMPONENT
export const ShoppingCardFooder: FC = () => {
  // ProductContext
  const context = useContext(ProductContext)
  const { productList } = context
  // VARIABLES OF USESTATE
  const [subTotalProducts, setSubTotalProducts] = useState(0)
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0)
  const [totalTaxProducts, setTotalTaxProducts] = useState(0)

  const [dataWareHouses, setDataWareHouses] = useState<Seller[]>([])
  const [dataNumerations, setDataNumerations] = useState<Numeration[]>([])
  const [dataSellers, setDataSellers] = useState<Seller[]>([])

  // CONTROLLERS OF MODAL
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  // INVOICE PARAMETERS CONTEXT
  const { parametersInfo, setParametersInfo } = useContext(ParametersContext)
  // -- USARLO AL ABRIR LA MODAL CON EL RESUMEN DE LA FACTURA --

  // Format Double
  const formatDouble = new Intl.NumberFormat('en-DE')

  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${year}/${month}/${day}`

  useEffect(() => {
    console.log(productList)
    const totalDiscount = productList.reduce(
      (acumulator, element) => acumulator + element.discount,
      0
    )
    const totalTax = productList.reduce(
      (acumulator, element) =>
        acumulator + (totalTaxPer(element.tax) / 100) * element.value,
      0
    )
    const subTotal = productList.reduce(
      (acumulator, element) => acumulator + element.value,
      0
    )
    // console.log(totalTax)

    setSubTotalProducts(subTotal)
    setTotalDiscountProducts(totalDiscount)
    setTotalTaxProducts(totalTax)
  }, [productList])

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await cuentalApi.get<InvoiceParameters>(
        `settings/invoices?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`
      )
      setParametersInfo(data)
      setDataWareHouses(data.warehouses);
      setDataNumerations(data.numerations);
      setDataSellers(data.sellers);
    }
    petiApi()
  }, [setParametersInfo])

  const wareHouseSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }

  return (
    <div className="w-full h-[22vh] py-4 px-4 border-t shadow-sm dark:bg-black dark:border-t-slate-800">
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <span className="mr-2 text-default-500">Fecha: </span>
          <span>{currentDate}</span>
        </div>
        <div className="flex ">
          <div className=" text-default-500">
            <p className="">Descuento: </p>
            <p className="">Impuesto: </p>
            <p className="">SudTotal: </p>
          </div>
          <div className="flex flex-col items-end w-[150px]">
            <span> $ {formatDouble.format(totalDiscountProducts)}</span>
            <span> $ {formatDouble.format(totalTaxProducts)}</span>
            <span> $ {formatDouble.format(subTotalProducts)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center ">
        <Button
          onPress={onOpen}
          className="flex bg-[#3c3f99] justify-between w-full mt-5 mb-4"
          radius="sm"
          size="lg"
          isDisabled={
            subTotalProducts + totalTaxProducts - totalDiscountProducts === 0
          }
        >
          <div className="text-white">
            <h1>VENDER</h1>
          </div>
          <div className="text-white ">
            <h1>
              ${' '}
              {formatDouble.format(
                subTotalProducts + totalTaxProducts - totalDiscountProducts
              )}
            </h1>
          </div>
        </Button>
        <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        >
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Titulo del modal
                </ModalHeader>
                <ModalBody className="flex flex-col p-5 ">
                  <div className="flex  gap-3">
                    <Select
                      size="sm"
                      label="Seleccione la Numeración"
                      placeholder="Numeración"
                      className="max-w-xs"
                      // onSelectionChange={setvalueSelectWareHouses}
                      onChange={wareHouseSelected}
                    >
                      {dataNumerations.map((element, index) => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      size="sm"
                      label="Seleccione el almacen"
                      placeholder="Almacen"
                      className="max-w-xs"
                      // onSelectionChange={setvalueSelectWareHouses}
                      onChange={wareHouseSelected}
                    >
                      {dataWareHouses.map((element, index) => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Select
                      size="sm"
                      label="Seleccione el vendedor"
                      placeholder="Vendedor"
                      className="w-full"
                      // onSelectionChange={setvalueSelectWareHouses}
                      onChange={wareHouseSelected}
                    >
                      {dataSellers.map((element, index) => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="flat"
                    // onPress={}
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

      </div>
      <div className="text-default-500">
        <p>{productList.length} Productos</p>
      </div>
    </div>
  )
}
