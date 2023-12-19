import React, {
  useState,
  useEffect,
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
  const [voucherInput, setVoucherInput] = useState(elementPayment.voucher)

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
      //setValueInput(element.value.toString())
      return element
    })

    setPaymentArray(arrayRenameId)
  }

  useEffect(()=>{
        elementPayment.value = parseInt(valueInput)
        elementPayment.voucher = voucherInput
  },[valueInput, voucherInput])

  const handleVoucherAndValor = (e: ChangeEvent<HTMLInputElement>,tipo:string) => {
    if(tipo === "valor"){
      elementPayment.value = parseInt(e.target.value)
      setValueInput(e.target.value)
    }else{
      elementPayment.voucher = e.target.value
      setVoucherInput(e.target.value)
    }
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
        value={(elementPayment.value).toString()}
        // onValueChange={setValueInput}
        onChange={(e) =>handleVoucherAndValor(e,"valor")}
      />


      <Input
        label="Voucher"
        size="sm"
        value={elementPayment.voucher}
        //onValueChange={setBVucherInput}
        onChange={(e)=> handleVoucherAndValor(e,"voucher")}
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
