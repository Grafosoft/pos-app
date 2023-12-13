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

export const SelectObject: FC<Props> = ({ arrayFind, textType, defaultSelectedKeys }) => {
  const [select, setSelect] = useState<Selection>(new Set([]))

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
          return (
          <SelectItem key={element.id} value={element.id}>
            {element.name}
          </SelectItem>)
        })}
      </Select>
    </>
  )
}
