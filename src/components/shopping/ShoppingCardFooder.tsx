import cuentalApi from '@/api/cuentalApi'
import {
  type InvoiceParameters,
  type Numeration,
  type Seller
} from '@/interface/invoiceParameters'
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
  useDisclosure
} from '@nextui-org/react'
import { type FC, useContext, useState, useEffect } from 'react'
import { ParametersContext } from './ShoppingCart'
import { SelectObject } from '@/components/objectSelect/ObjectsSelect'
import { InputBill } from '../inputsBill/InputBill'

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // INVOICE PARAMETERS CONTEXT
  const { setParametersInfo } = useContext(ParametersContext)
  // -- USARLO AL ABRIR LA MODAL CON EL RESUMEN DE LA FACTURA --

  // Format Double
  const formatDouble = new Intl.NumberFormat('en-DE')

  const currentDate = new Date().toISOString().slice(0, 10)

  useEffect(() => {
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

    setSubTotalProducts(subTotal - totalTax)
    setTotalDiscountProducts(totalDiscount)
    setTotalTaxProducts(totalTax)
  }, [productList])

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await cuentalApi.get<InvoiceParameters>(
        `settings/invoices?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`
      )
      setParametersInfo(data)
      setDataWareHouses(data.warehouses)
      setDataNumerations(data.numerations)
      setDataSellers(data.sellers)
    }
    petiApi()
  }, [setParametersInfo])

  return (
    <div className="w-full h-[22vh] py-4 px-4 border-t shadow-sm dark:bg-black dark:border-t-slate-800">
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <span className="mr-2 text-default-500">Fecha: </span>
          <span>{currentDate}</span>
        </div>
        <div className="flex ">
          <div className=" text-default-500">
            <p className="">SudTotal: </p>
            <p className="">Descuento: </p>
            <p className="">Impuesto: </p>
          </div>
          <div className="flex flex-col items-end w-[150px]">
            <span> $ {formatDouble.format(subTotalProducts)}</span>
            <span> $ {formatDouble.format(totalDiscountProducts)}</span>
            <span> $ {formatDouble.format(totalTaxProducts)}</span>
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Datos y Generacion de factura
                </ModalHeader>
                <ModalBody className="flex flex-col p-5 ">
                  <div className="flex  gap-3">
                    <SelectObject
                      arrayFind={dataNumerations}
                      textType="Numeración"
                    />

                    <SelectObject
                      arrayFind={dataWareHouses}
                      textType="Bodega"
                    />
                  </div>
                  <div>
                    <SelectObject arrayFind={dataSellers} textType="Vendedor" />
                  </div>
                  <div>
                    <Input
                      size="sm"
                      isReadOnly
                      variant="faded"
                      label="Tercero"
                      defaultValue={'Sr. 002111 '}
                      className="w-full "
                    />
                  </div>
                  <div className="flex p-2 items-center rounded-md gap-3 h-[80px] dark:bg-zinc-700 bg-slate-100 mt-20	">
                    <InputBill
                      variant='faded'
                      size='sm'
                      textTitle="Total"
                      isReadOnly={true}
                      defaultValue={formatDouble.format(
                        subTotalProducts +
                        totalTaxProducts -
                        totalDiscountProducts)}
                    />
                    <InputBill
                      variant='faded'
                      size='sm'
                      textTitle="Recibido"
                      isReadOnly={true}
                      defaultValue={"2000"}
                    />
                    <InputBill
                      variant='faded'
                      size='sm'
                      textTitle="Cambio"
                      isReadOnly={true}
                      defaultValue={"2000"}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    variant="flat"
                    className="w-full rounded-md"
                  >
                    Generar D.E./POS
                  </Button>
                  <Button
                    color="secondary"
                    variant="flat"
                    className="w-full rounded-md"
                  >
                    Generar Factura
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
