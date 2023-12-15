import React, {
  useState,
  type FC,
  useContext,
  type Dispatch,
  type SetStateAction,
  useEffect
} from 'react'
import { SelectObject } from '../objectSelect/ObjectsSelect'
import { ParametersContext } from '../shopping/ShoppingCart'
import { Button, Input } from '@nextui-org/react'
import { type Tax } from '@/interface/products'
import { type PaymentArray } from '../modals/ModalBill'
import { TbTrash } from 'react-icons/tb'
import { GiDialPadlock } from "react-icons/gi";


interface Props {
  paymentArray: PaymentArray[]
  setPaymentArray: Dispatch<SetStateAction<PaymentArray[]>>
  elementPayment: PaymentArray
}

export const PaymentRow: FC<Props> = ({ paymentArray, setPaymentArray, elementPayment }) => {
  // INVOICE PARAMETERS CONTEXT
  const { parametersInfo } = useContext(ParametersContext)

  // Payment Method
  const [paymentMethodArray, setPaymentMethodArray] = useState<Tax[]>([])
  const [bankArray, setBankArray] = useState<Tax[]>([])
  const [valueInput, setValueInput] = useState('')

  useEffect(() => {
    console.log({
      payment: paymentMethodArray,
      bank: bankArray,
      value: parseInt(valueInput)
    })
  })


  const deleteProductOfCar = (idEliminar: number) => {
    const arrayDelete = paymentArray.filter(element => element.id !== idEliminar)
    setPaymentArray(arrayDelete)
  }

  return (
    <div className="flex justify-between p-2 gap-2 items-center">

      <SelectObject
        arrayFind={parametersInfo.paymentMethods}
        textType="Pago"
        newTax={paymentMethodArray}
        setNewTax={setPaymentMethodArray}
      />
      <SelectObject
        arrayFind={parametersInfo.banks}
        textType="Caja/Banco"
        newTax={bankArray}
        setNewTax={setBankArray}
      />

      <Input
        label="Voucher"
        size="sm"
        value={valueInput}
        onValueChange={setValueInput}
      />
            <Input
        label="Valor"
        type='number'
        size="sm"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        className=""
        value={valueInput}
        onValueChange={setValueInput}
      />
      {(paymentArray[0].id !== elementPayment.id) ?
        <Button
          onClick={() => { deleteProductOfCar(1) }}
          isIconOnly
          color="danger"
          variant="flat"
          size="sm"
          edaria-label="Take a photo"
        >
          <TbTrash size={15} />
        </Button>
        :
        <Button
        onClick={() => { deleteProductOfCar(1) }}
        isIconOnly
        color="primary"
        variant="flat"
        size="sm"
        edaria-label="Take a photo"
      >
        <GiDialPadlock  size={17} />
      </Button>}
    </div>
  )
}
