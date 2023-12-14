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

interface Props {
  arrayFind: Tax[]
  textType: string
  taxId?: number
  newTax: Tax[]
  setNewTax: Dispatch<SetStateAction<Tax[]>>
}

export const SelectObject: FC<Props> = ({
  arrayFind,
  textType,
  taxId,
  newTax,
  setNewTax
}) => {
  const [taxsReadiSelected, setTaxsReadiSelected] = useState<string[]>([])

  const handleSelectionChangeTax = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (taxId === undefined) {
      const newObjectBill = arrayFind.filter(
        element => element.id === parseInt(e.target.value)
      )
      setNewTax(newObjectBill)
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

  return (
    <>
      <div className="w-full flex items-center gap-2">
        <Select
          size="sm"
          label={`Seleccione ${textType}`}
          placeholder={textType}
          className="w-full"
          disabledKeys={taxsReadiSelected}
          selectedKeys={taxId ? [taxId.toString()] : ''}
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
