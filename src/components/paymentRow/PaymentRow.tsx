import React, {
  useState,
  type FC,
  useContext,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent
} from 'react'
import { ParametersContext } from '../shopping/ShoppingCart'
import { Button, Input } from '@nextui-org/react'
import { type Tax } from '@/interface/products'
import { type PaymentArray } from '../modals/ModalBill'
import { TbTrash } from 'react-icons/tb'
import { GiDialPadlock } from 'react-icons/gi'
import { PaymentSelect } from '../objectSelect/PaymentSelect'

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
  const [valueInput, setValueInput] = useState(elementPayment.value.toString())
  const [boucherInput, setBoucherInput] = useState('')

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

    const arrayRenameId = arrayDelete.map((element, index) => {
      element.id = index
      setValueInput(element.value.toString())
      return element
    })

    setPaymentArray(arrayRenameId)
  }
  const handleVoucherAndValor = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
    elementPayment.value = parseInt(e.target.value)
    // elementPayment.voucher = boucherInput
  }

  return (
    <div className="flex justify-between p-2 gap-2 items-center">
      <PaymentSelect
        arrayFind={arrayFindPaymentMethodsIndex}
        textType="Pago"
        elementPayment={elementPayment}
        paymentArray={paymentArray}
        setPaymentArray={setPaymentArray}
        newArrayReturn={paymentMethodArray}
        setnewArrayReturn={setPaymentMethodArray}
      />
      <PaymentSelect
        arrayFind={parametersInfo.banks}
        textType="Caja/Banco"
        elementPayment={elementPayment}
        isBank={true}
        paymentArray={paymentArray}
        setPaymentArray={setPaymentArray}
        newArrayReturn={bankArray}
        setnewArrayReturn={setBankArray}
      />

      <Input
        label="Valor"
        type="number"
        size="sm"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        className=""
        value={valueInput}
        // onValueChange={setValueInput}
        onChange={handleVoucherAndValor}
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
