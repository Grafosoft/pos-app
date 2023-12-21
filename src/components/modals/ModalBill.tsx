import { type FC, useContext, useEffect, useState } from 'react'
import { type InvoiceParameters } from '@/interface/invoiceParameters'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@nextui-org/react'
import { SelectObject } from '@/components/objectSelect/ObjectsSelect'
import { InputBill } from '../inputsBill/InputBill'
import { ParametersContext } from '../shopping/ShoppingCart'
import { type Tax } from '@/interface/products'
import { PaymentRow } from '../paymentRow/PaymentRow'
import { TbUsers } from 'react-icons/tb'
import { RiAddFill } from 'react-icons/ri'
import { totalTaxPer } from '@/utils/totalPaxPer'
import { ProductContext, UrlContext } from '@/pages/[nameApp]'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  subTotalProducts: number
  totalDiscountProducts: number
  totalTaxProducts: number
}

export interface PaymentArray {
  paymentMethod: Tax
  bank: Tax
  value: number
  voucher: string
  id: number
}

export const ModalBill: FC<Props> = ({
  isOpen,
  onOpenChange,
  subTotalProducts,
  totalDiscountProducts,
  totalTaxProducts
}) => {
  // CONTEX OF PRODUCTS
  const context = useContext(ProductContext)
  const { productList } = context

  //* VARIABLES END FOR BILL
  const [valueTextArea, setValueTextArea] = useState('')
  const [wareHousesEnd, setWareHousesEnd] = useState<Tax[]>([])
  const [numerationEnd, setNumerationEnd] = useState<Tax[]>([])
  const [sellerEnd, setSellerEnd] = useState<Tax[]>([])

  const [paymentArray, setPaymentArray] = useState<PaymentArray[]>([
    {
      paymentMethod: {
        id: 0,
        name: 'Efectivo'
      },
      bank: {
        id: 0,
        name: ''
      },
      value: 0,
      voucher: '',
      id: 0
    }
  ])

  // import Context UrlContext
  const { companyId, apikey, color, functionApi } = useContext(UrlContext)

  // Customer Context
  const { customerSearch } = useContext(ParametersContext)

  // INVOICE PARAMETERS CONTEXT
  const { parametersInfo, setParametersInfo } = useContext(ParametersContext)
  // -- USARLO AL ABRIR LA MODAL CON EL RESUMEN DE LA FACTURA --

  // Format Double
  const formatDouble = new Intl.NumberFormat('en-DE')

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await functionApi.get<InvoiceParameters>(
        `settings/invoices?companyId=${companyId}&page=0&apikey=${apikey}`
      )
      setParametersInfo(data)
    }
    petiApi()
  }, [apikey, companyId, functionApi, setParametersInfo])

  const handlerAddPaymentMethod = () => {
    const newId = paymentArray.length - 1
    const paymentValidate = paymentArray.findIndex(
      element =>
        element.paymentMethod.id === 0 && element.paymentMethod.name === ''
    )
    const bankValidate = paymentArray.findIndex(
      element => element.bank.id === 0 && element.bank.name === ''
    )

    if (paymentValidate === -1 && bankValidate === -1) {
      const newPaymentArray = [
        ...paymentArray,
        {
          paymentMethod: { id: 0, name: 'Efectivo' },
          bank: {
            id: 0,
            name: ''
          },
          value: 0,
          voucher: '',
          id: paymentArray[newId].id + 1
        }
      ]
      const arrayFindPaymentMethodsIndex = newPaymentArray.map(
        (element, index) => {
          element.id = index
          return element
        }
      )
      setPaymentArray(arrayFindPaymentMethodsIndex)
    }
  }

  const handleGenereBill = () => {
    console.log('GENERAMOS')
    const total = subTotalProducts + totalTaxProducts - totalDiscountProducts

    const discountAmount = productList.reduce(
      (acumulador, element) => acumulador + element.discount,
      0
    )
    const totalTax = productList.reduce(
      (acumulator, element) =>
        acumulator + (totalTaxPer(element.tax) / 100) * element.value,
      0
    )

    const dataBillInJson = {
      id: 0,
      date: new Date().toISOString().slice(0, 10),
      status: '',
      observation: valueTextArea,
      contact: { id: 0, name: customerSearch.name },
      numeration: numerationEnd[0],
      wareHouse: wareHousesEnd[0],
      seller: sellerEnd[0],
      totalAmount: total,
      discountAmount,
      taxAmount: totalTax,
      paymentAmount: '',
      paymentRow: paymentArray,
      items: productList
    }

    console.log(dataBillInJson)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        size="4xl"
        // onClose={handleCloseModal}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Datos Finales
              </ModalHeader>
              <ModalBody className="flex flex-col p-5 ">
                <div className="flex gap-3">
                  <SelectObject
                    arrayFind={parametersInfo.numerations}
                    textType="Numeración"
                    typeSelect="dataSeller"
                    newTax={numerationEnd}
                    setNewTax={setNumerationEnd}
                  />
                  <SelectObject
                    arrayFind={parametersInfo.warehouses}
                    textType="Bodega"
                    typeSelect="dataSeller"
                    newTax={wareHousesEnd}
                    setNewTax={setWareHousesEnd}
                  />
                </div>
                <div>
                  <SelectObject
                    arrayFind={parametersInfo.sellers}
                    textType="Vendedor"
                    typeSelect="dataSeller"
                    newTax={sellerEnd}
                    setNewTax={setSellerEnd}
                  />
                </div>
                <div>
                  <Input
                    size="sm"
                    isReadOnly
                    variant="faded"
                    // label="Tercero"
                    placeholder="Tercero"
                    defaultValue={customerSearch.name}
                    className="w-full"
                    startContent={<TbUsers size={20} className="" />}
                  />
                </div>
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>Metodos de Pago</p>
                    <Button
                      size="sm"
                      onClick={handlerAddPaymentMethod}
                      variant="flat"
                      isIconOnly
                      color="success"
                    >
                      <RiAddFill size={17} />
                    </Button>
                  </div>
                  <div className="overflow-scroll max-h-[180px]">
                    {paymentArray.map(
                      (element, index) =>
                        parametersInfo.paymentMethods.length !== 0 && (
                          <PaymentRow
                            paymentArray={paymentArray}
                            elementPayment={element}
                            setPaymentArray={setPaymentArray}
                            key={index}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className="flex p-2 items-center rounded-md gap-3 h-[80px] dark:bg-zinc-700 bg-slate-100 mt-2	">
                  <InputBill
                    variant="faded"
                    size="sm"
                    textTitle="Total"
                    isReadOnly={true}
                    defaultValue={formatDouble.format(
                      subTotalProducts +
                        totalTaxProducts -
                        totalDiscountProducts
                    )}
                  />
                  <InputBill
                    variant="faded"
                    size="sm"
                    textTitle="Recibido"
                    isReadOnly={true}
                    defaultValue={'2000'}
                  />
                  <InputBill
                    variant="faded"
                    size="sm"
                    textTitle="Cambio"
                    isReadOnly={true}
                    defaultValue={'2000'}
                  />
                </div>
                <div className="w-full">
                  <p className="dark:text-default-500 text-slate-500 text-sm ml-1 "></p>
                  <Textarea
                    label="Observaciones:"
                    value={valueTextArea}
                    onValueChange={setValueTextArea}
                    // style={{fontSize :"20px"}}
                    placeholder="Enter your description"
                    className=""
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color={color.colorComponent}
                  variant="flat"
                  className="w-full rounded-md"
                  onClick={handleGenereBill}
                >
                  Generar D.E./POS
                </Button>
                <Button
                  color={color.colorComponent}
                  variant="flat"
                  className="w-full rounded-md"
                  onClick={() => {}}
                >
                  Generar Factura
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
