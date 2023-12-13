import { Select, SelectItem, type Selection } from '@nextui-org/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  type SelectTax,
  type Numeration,
  type Seller
} from '@/interface/invoiceParameters'
import React, { type FC } from 'react'

interface Props {
  arrayFind: Numeration[] | SelectTax[]| Seller[]
  textType: string
  defaultSelectedKeys?: number
  newTax: SelectTax[]
  setNewTax: Dispatch<SetStateAction<SelectTax[]>>
}

export const SelectObject: FC<Props> = ({ arrayFind, textType, defaultSelectedKeys, newTax, setNewTax }) => {
  const [ taxsReadiSelected , setTaxsReadiSelected] = useState<string[]>([])


  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      let objectTax = arrayFind.find((element) => element.id === parseInt(e.target.value));

      let newObjectTax = newTax.filter((element)=> element.id !== 0) //aliminamos los tax con id = 0
      newObjectTax.push(objectTax) // agregamos el objeto del nuevo tax seleccioando
      console.log(newObjectTax);

      setNewTax(newObjectTax);

  }
  useEffect(()=>{
    let arrayItemsReadiSelect = newTax.map((element)=>{ return (element.id.toString())});

    setTaxsReadiSelected(arrayItemsReadiSelect);
  },[newTax])

  return (
    <>
      <Select
        size="sm"
        label={`Seleccione ${textType}`}
        placeholder={textType}
        className="w-full"
        disabledKeys={taxsReadiSelected}
        defaultSelectedKeys={defaultSelectedKeys ? [(defaultSelectedKeys).toString()] : []}
        onChange={handleSelectionChange}
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
