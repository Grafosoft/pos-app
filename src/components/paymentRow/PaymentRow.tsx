import React, {
  useState,
  type FC,
  useContext,
  type Dispatch,
  type SetStateAction
} from 'react'
import { SelectObject } from '../objectSelect/ObjectsSelect'
import { ParametersContext } from '../shopping/ShoppingCart'
import { Button, Input } from '@nextui-org/react'
import { type Tax } from '@/interface/products'
import { type PaymentArray } from '../modals/ModalBill'
import { TbTrash } from 'react-icons/tb'
import { GiDialPadlock } from 'react-icons/gi'

interface Props {
  paymentArray: PaymentArray[]
  setPaymentArray: Dispatch<SetStateAction<PaymentArray[]>>
  elementPayment: PaymentArray
}

export const PaymentRow: FC<Props> = ({
  paymentArray,
  setPaymentArray,
  elementPayment
}) => {
  // INVOICE PARAMETERS CONTEXT
  const { parametersInfo } = useContext(ParametersContext)

  // Payment Method
  const [paymentMethodArray, setPaymentMethodArray] = useState<Tax[]>([])
  const [bankArray, setBankArray] = useState<Tax[]>([])
  const [valueInput, setValueInput] = useState('')
  const [boucherInput, setBoucherInput] = useState('')
  // const [paymentArrayFilter, setPaymentArrayFilter] = useState<PaymentArray>({
  //   paymentMethod: { id: 0, name: '' },
  //   bank: { id: 0, name: '' },
  //   value: 0,
  //   id: 0
  // })

  // useEffect(() => {
  //   // const paymentArrayFilterr = paymentArray.find(
  //   //   element => element.id === elementPayment.id
  //   // )
  //   setPaymentArrayFilter({
  //     paymentMethod: paymentMethodArray[0],
  //     bank: bankArray[0],
  //     value: parseInt(valueInput),
  //     id: elementPayment.id
  //   })

  //   // {
  //   //       paymentMethods: paymentMethodArray,
  //   //       banks: bankArray,
  //   //       value: parseInt(valueInput),
  //   //       id: elementPayment.id
  //   //     }
  //   console.log(paymentArrayFilter)
  // }, [
  //   bankArray,
  //   elementPayment.id,
  //   paymentArray,
  //   paymentMethodArray,
  //   valueInput
  // ])

  const arrayFindPaymentMethodsIndex = parametersInfo.paymentMethods.map(
    (element, index) => {
      element.id = index
      return element
    }
  )

  const deleteProductOfCar = (idEliminar: number) => {
    const arrayDelete = paymentArray.filter(
      element => element.id !== idEliminar
    )
    console.log(arrayDelete)
    setPaymentArray(arrayDelete)
  }
  const handleVoucherAndValor = () => {
    // const elementEdit = paymentArray.find((element) => element.id === elementPayment.id)
    elementPayment.value = parseInt(valueInput)
    elementPayment.voucher = boucherInput
    console.log(elementPayment, 'ELEMET')
  }

  return (
    <div className="flex justify-between p-2 gap-2 items-center">
      <SelectObject
        arrayFind={arrayFindPaymentMethodsIndex}
        textType="Pago"
        elementPaymentId={elementPayment.id}
        paymentArray={paymentArray}
        setPaymentArray={setPaymentArray}
        newTax={paymentMethodArray}
        setNewTax={setPaymentMethodArray}
      />
      <SelectObject
        arrayFind={parametersInfo.banks}
        textType="Caja/Banco"
        elementPaymentId={elementPayment.id}
        isBank
        paymentArray={paymentArray}
        setPaymentArray={setPaymentArray}
        newTax={bankArray}
        setNewTax={setBankArray}
      />

      <Input
        label="Valor"
        type="number"
        size="sm"
        onChange={handleVoucherAndValor}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        className=""
        value={valueInput}
        onValueChange={setValueInput}
      />
      <Input
        label="Voucher"
        size="sm"
        value={boucherInput}
        onValueChange={setBoucherInput}
        onChange={handleVoucherAndValor}
      />
      {paymentArray[0].id !== elementPayment.id ? (
        <Button
          onClick={() => {
            deleteProductOfCar(elementPayment.id)
          }}
          isIconOnly
          color="danger"
          variant="flat"
          size="sm"
          edaria-label="Take a photo"
        >
          <TbTrash size={15} />
        </Button>
      ) : (
        <Button
          isIconOnly
          color="primary"
          variant="flat"
          size="sm"
          edaria-label="Take a photo"
        >
          <GiDialPadlock size={17} />
        </Button>
      )}
    </div>
  )
}
