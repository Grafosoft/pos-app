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
}

export const SelectObject: FC<Props> = ({ arrayFind, textType }) => {
  const [select, setSelect] = useState<Selection>(new Set([]))

  return (
    <>
      <Select
        size="sm"
        label={`Seleccione ${textType}`}
        placeholder={textType}
        className="w-full"
        defaultSelectedKeys={[104]}
        selectedKeys={select}
        onSelectionChange={setSelect}
      >
        {arrayFind.map((element, index) => (
          <SelectItem key={element.id} value={element.id}>
            {element.name}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
