import React, { type FC, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'

interface Props {
  arrayPrices: Prices[]
  total: number
}

interface Prices {
  title?: string
  name: string
  value: number
}

export const ShowPrices: FC<Props> = ({ arrayPrices, total }) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const formatDouble = new Intl.NumberFormat('en-DE')

  const ChickInProvider = (e: boolean) => {
    setIsOpenPopover(e)
  }

  const length = arrayPrices.length - 1

  return (
    <div className="cursor-pointer">
      <Popover
        onOpenChange={e => {
          ChickInProvider(e)
        }}
        showArrow={true}
        placement="bottom"
      >
        <PopoverTrigger>
          <div className="flex items-center">
            <p className="mr-2 text-default-500">
              {arrayPrices[length].title
                ? arrayPrices[length].title
                : arrayPrices[length].name}
            </p>
            <div className="flex">
              <p className="mr-1">$</p>
              {formatDouble.format(total)}
            </div>
            <div className="ml-2 ">
              {isOpenPopover ? (
                <IoIosArrowBack size={15} />
              ) : (
                <IoIosArrowDown size={15} />
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex p-2 ">
            <div className=" text-default-500">
              {arrayPrices.map((element, index) => (
                <p key={index}>{element.name}</p>
              ))}
            </div>
            <div className="flex flex-col items-end w-[100px]">
              {arrayPrices.map((element, index) => (
                <span key={index}> $ {formatDouble.format(element.value)}</span>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
