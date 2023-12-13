import { Select, SelectItem, type Selection } from '@nextui-org/react'
import { /* useMemo, */ useState } from 'react'
import {
  type SelectTax,
  type Numeration,
  type Seller
} from '@/interface/invoiceParameters'
import React, { type FC } from 'react'

interface Props {
  arrayFind: Numeration[] | Seller[] | SelectTax[]
  textType: string
  defaultSelectedKeys?: number
}

const animals = [
  { label: "Cat", value: "cat", description: "The second most popular pet in the world", id: 1 },
  { label: "Dog", value: "dog", description: "The most popular pet in the world", id: 2 },
  { label: "Elephant", value: "elephant", description: "The largest land animal", id: 3 },
  { label: "Lion", value: "lion", description: "The king of the jungle", id: 4 }
]


export const SelectObject: FC<Props> = ({ arrayFind, textType, defaultSelectedKeys }) => {
  const [select, setSelect] = useState<Selection>(new Set([]))
  console.log(defaultSelectedKeys)

  return (
    <>
      <Select
        size="sm"
        label={`Seleccione ${textType}`}
        placeholder={textType}
        className="w-full"
        defaultSelectedKeys={defaultSelectedKeys? [(defaultSelectedKeys).toString()]:[]}
        onSelectionChange={setSelect}
      >
        {arrayFind.map((element, index) => {
          console.log(element)
          return (
          <SelectItem key={element.id} value={element.id}>
            {element.name}
          </SelectItem>)
        })}
      </Select>
    </>
  )
}
