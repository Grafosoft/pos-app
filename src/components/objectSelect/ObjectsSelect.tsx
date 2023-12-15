import { Button, Select, SelectItem } from '@nextui-org/react'
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  type FC
} from 'react'
import { type Tax } from '@/interface/products'
import { TbTrash } from 'react-icons/tb'
import { type PaymentArray } from '../modals/ModalBill'

interface Props {
  arrayFind: Tax[]
  paymentArray?: PaymentArray[]
  setPaymentArray?: Dispatch<SetStateAction<PaymentArray[]>>
  textType: string
  taxId?: number
  isBank?: boolean
  elementPaymentId?: number
  newTax: Tax[]
  setNewTax: Dispatch<SetStateAction<Tax[]>>
}

export const SelectObject: FC<Props> = ({
  arrayFind,
  textType,
  taxId,
  isBank,
  paymentArray,
  setPaymentArray,
  elementPaymentId,
  newTax,
  setNewTax
}) => {
  const [taxsReadiSelected, setTaxsReadiSelected] = useState<string[]>([])

  const handleSelectionChangeTax = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (taxId === undefined) {
      if (elementPaymentId !== undefined) {
        const newObjectBill = arrayFind.filter(
          element => element.id.toString() === e.target.value
        )
        if (paymentArray && setPaymentArray) {
          if (!isBank) {
            const paymentArrayIndex = arrayFind?.findIndex(
              element => element.id === elementPaymentId
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
              if (elementPaymentId === index) {
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
        }
        setNewTax(newObjectBill)
      } else {
        const newObjectBill = arrayFind.filter(
          element => element.id === parseInt(e.target.value)
        )
        setNewTax(newObjectBill)
      }
    } else {
      const indexArrayEditTax = newTax.findIndex(
        element => element.id === taxId
      )
      const arrayEditTax = newTax.map((element, index) => {
        if (indexArrayEditTax === index) {
          const objectTax = arrayFind.find(
            element => element.id === parseInt(e.target.value)
          )
          if (objectTax) {
            element = objectTax
          }
        }
        return element
      })
      setNewTax(arrayEditTax)
    }
  }

  // Function delete in Tax
  const deleteProductOfCar = (idEliminar: number) => {
    const arrayDelete = newTax.filter(element => element.id !== idEliminar)
    setNewTax(arrayDelete)
  }

  useEffect(() => {
    const arrayItemsReadiSelect = newTax.map(element => {
      return element.id.toString()
    })
    setTaxsReadiSelected(arrayItemsReadiSelect)
  }, [newTax])

  const returnPaymentId = () => {
    const objectFF = paymentArray?.find(element => {
      return element.id === elementPaymentId
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
          selectedKeys={taxId ? [taxId.toString()] : returnPaymentId()}
          defaultSelectedKeys={taxId ? [taxId.toString()] : []}
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
        {arrayFind[0].percentage !== undefined && taxId !== newTax[0].id ? (
          <Button
            onClick={() => {
              deleteProductOfCar(taxId ?? 0)
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
          ''
        )}
      </div>
    </>
  )
}
