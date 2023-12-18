import { Button, Select, SelectItem } from '@nextui-org/react'
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  type FC
} from 'react'
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
  const [taxsReadiSelected, setTaxsReadiSelected] = useState<string[]>([])

  const handleSelectionChangeTax = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
        const newObjectPayment = arrayFind.filter(
          element => element.id.toString() === e.target.value
        )
        const nullPropertis = arrayFind.filter(
          element => (element.id == 0 && element.name == '')
        )

        console.log(nullPropertis, "PROPERTIS")

          if (!isBank) {
            const paymentArrayIndex = arrayFind.findIndex(
              element => element.id === elementPayment.id
            )
            console.log(paymentArrayIndex, "PAYMENT ARRAY INDEX")

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

  useEffect(() => {
    const arrayItemsReadiSelect = newArrayReturn.map(element => {
      return element.id.toString()
    })
    setTaxsReadiSelected(arrayItemsReadiSelect)
  }, [newArrayReturn])


  const returnPaymentId = () => {
    const objectFF = paymentArray?.find(element => {
      return element.id === elementPayment.id
    })

    if (
      objectFF?.paymentMethod.id !== 0 &&
      objectFF?.paymentMethod.name !== ''
    ) {
      if (objectFF) {
        if (!isBank) {
          return [objectFF?.paymentMethod.id.toString()]
        } else {
          return [objectFF?.bank.id.toString()]
        }
      }
    } else {
      return ''
    }
  }

  return (
    <>
      <div className="w-full flex items-center gap-2">
        <Select
          size="sm"
          label={`${textType}`}
          placeholder={textType}
          className="w-full"
          disabledKeys={taxsReadiSelected}
          selectedKeys={returnPaymentId()}
          defaultSelectedKeys={[]}
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
