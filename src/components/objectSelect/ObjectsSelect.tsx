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
  typeSelect?: string
  isBank?: boolean
  elementIterations?: Tax | PaymentArray
  newTax: Tax[]
  setNewTax: Dispatch<SetStateAction<Tax[]>>
}

export const SelectObject: FC<Props> = ({
  arrayFind,
  textType,
  isBank,
  typeSelect,
  paymentArray,
  setPaymentArray,
  elementIterations,
  newTax,
  setNewTax
}) => {
  const [taxsReadiSelected, setTaxsReadiSelected] = useState<string[]>([])

  const handleSelectionChangeTax = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (typeSelect) {

      case "TaxSelect":
        const indexArrayEditTax = newTax.findIndex(
          element => element.id === elementIterations?.id
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
        break;

      case "dataSeller":
        const newObjectBill = arrayFind.filter(
          element => element.id === parseInt(e.target.value)
        )
        setNewTax(newObjectBill)
        console.log("LOGICA DEL DATA SELLER");
        break;
      default:
        console.log("NO DENTRA A NINGUNO SEÑOR")
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
      return element.id === elementIterations?.id
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
          selectedKeys={elementIterations?.id ? [elementIterations?.id.toString()] : returnPaymentId()}
          defaultSelectedKeys={elementIterations?.id ? [elementIterations?.id.toString()] : []}
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
        {arrayFind[0].percentage !== undefined && elementIterations?.id !== newTax[0].id && (
          <Button
            onClick={() => {
              deleteProductOfCar(elementIterations?.id ?? 0)
            }}
            isIconOnly
            color="danger"
            variant="flat"
            size="sm"
            edaria-label="Take a photo"
          >
            <TbTrash size={15} />
          </Button>
        )}
      </div>
    </>
  )
}
