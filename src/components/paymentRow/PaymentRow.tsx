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
import { Input } from '@nextui-org/react'
import { type Tax } from '@/interface/products'
import { type PaymentArray } from '../modals/ModalBill'

interface Props {
  paymentArray: PaymentArray[]
  setPaymentArray: Dispatch<SetStateAction<PaymentArray[]>>
}

export const PaymentRow: FC<Props> = ({ paymentArray, setPaymentArray }) => {
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

  return (
    <div className="flex justify-between p-2 gap-2">
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
        label="Valor"
        size="sm"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        value={valueInput}
        onValueChange={setValueInput}
      />
    </div>
  )
}
