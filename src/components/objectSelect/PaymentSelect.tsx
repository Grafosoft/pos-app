import { Select, SelectItem } from '@nextui-org/react'
import React, { type Dispatch, type SetStateAction, type FC } from 'react'
import { type Tax } from '@/interface/products'
import { type PaymentArray } from '../modals/ModalBill'

interface Props {
  arrayFind: Tax[]
  paymentArray: PaymentArray[]
  setPaymentArray: Dispatch<SetStateAction<PaymentArray[]>>
  textType: string
  elementPayment: PaymentArray
  isBank?: boolean
  newArrayReturn: Tax[]
  setnewArrayReturn: Dispatch<SetStateAction<Tax[]>>
}

export const PaymentSelect: FC<Props> = ({
  arrayFind,
  textType,
  isBank,
  paymentArray,
  setPaymentArray,
  elementPayment,
  newArrayReturn,
  setnewArrayReturn
}) => {
  const handleSelectionChangeTax = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newObjectPayment = arrayFind.filter(
      element => element.id.toString() === e.target.value
    )
    if (!isBank) {
      const paymentArrayIndex = arrayFind.findIndex(
        element => element.id === elementPayment.id
      )
      const paymentArrayEdit = paymentArray.map((element, index) => {
        if (paymentArrayIndex === index) {
          const objectPayment = arrayFind.find(
            element => element.id.toString() === e.target.value
          )
          if (objectPayment) {
            element.paymentMethod = objectPayment
          }
        }
        return element
      })
      setPaymentArray(paymentArrayEdit)
    } else {
      const bankArrayEdit = paymentArray.map((element, index) => {
        if (elementPayment.id === index) {
          const objectbank = arrayFind.find(
            element => element.id.toString() === e.target.value
          )
          if (objectbank) {
            element.bank = objectbank
          }
        }
        return element
      })
      setPaymentArray(bankArrayEdit)
    }
    setnewArrayReturn(newObjectPayment)
  }

  const returnPaymentId = () => {
    const objectnow = paymentArray.find(element => {
      return element.id === elementPayment.id
    })
    if (objectnow) {
      if (isBank) {
        return objectnow.bank.id === 0 ? '' : [objectnow.bank.id.toString()]
      } else {
        return [objectnow.paymentMethod.id.toString()]
      }
    }
    return []
  }
  console.log(paymentArray)

  return (
    <>
      <div className="w-full flex items-center gap-2">
        <Select
          size="sm"
          label={`${textType}`}
          placeholder={textType}
          className="w-[20vh]"
          selectedKeys={returnPaymentId()}
          defaultSelectedKeys={returnPaymentId()}
          onChange={handleSelectionChangeTax}
        >
          {arrayFind.map((element, index) => {
            return (
              <SelectItem key={element.id} value={element.id}>
                {element.name}
              </SelectItem>
            )
          })}
        </Select>
      </div>
    </>
  )
}
