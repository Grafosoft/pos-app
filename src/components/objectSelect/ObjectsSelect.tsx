import { Select, SelectItem } from '@nextui-org/react'
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  type FC
} from 'react'
import { type Tax } from '@/interface/products'

interface Props {
  arrayFind: Tax[]
  textType: string
  defaultSelectedKeys?: number
  newTax: Tax[]
  setNewTax: Dispatch<SetStateAction<Tax[]>>
}

export const SelectObject: FC<Props> = ({
  arrayFind,
  textType,
  defaultSelectedKeys,
  newTax,
  setNewTax
}) => {
  const [taxsReadiSelected, setTaxsReadiSelected] = useState<string[]>([])

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const indexArrayEditTax = newTax.findIndex(
      element => element.id === defaultSelectedKeys
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

  useEffect(() => {
    const arrayItemsReadiSelect = newTax.map(element => {
      return element.id.toString()
    })

    setTaxsReadiSelected(arrayItemsReadiSelect)
  }, [newTax])

  return (
    <>
      <Select
        size="sm"
        label={`Seleccione ${textType}`}
        placeholder={textType}
        className="w-full"
        disabledKeys={taxsReadiSelected}
        defaultSelectedKeys={
          defaultSelectedKeys ? [defaultSelectedKeys.toString()] : []
        }
        onChange={handleSelectionChange}
      >
        {arrayFind.map((element, index) => {
          return (
            <SelectItem key={element.id} value={element.id}>
              {element.name}
            </SelectItem>
          )
        })}
      </Select>
    </>
  )
}
