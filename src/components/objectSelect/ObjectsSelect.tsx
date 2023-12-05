import { Select, SelectItem, type Selection } from '@nextui-org/react'
import { /* useMemo, */ useState } from 'react'
import { type Numeration, type Seller } from '@/interface/invoiceParameters'
import React, { type FC } from 'react'

interface Props {
  arrayFind: Numeration[] | Seller[]
  textType: string
}

export const SelectObject: FC<Props> = ({ arrayFind, textType }) => {
  const [select, setSelect] = useState<Selection>(new Set([]))

  // const getObjectSelect = useMemo(() => {
  //   const object = arrayFind.find(
  //     element => element.id.toString() === Array.from(select)[0]
  //   )

  //   return object
  // }, [arrayFind, select])

  return (
    <>
      <Select
        size="sm"
        label={`Seleccione ${textType}`}
        placeholder={textType}
        className="w-full"
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
