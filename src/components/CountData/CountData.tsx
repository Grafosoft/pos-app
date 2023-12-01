import { Button } from '@nextui-org/react'
import React, { FC, useState } from 'react'
import { RiAddFill } from 'react-icons/ri'
import { TbMinus } from 'react-icons/tb'

interface Props {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  optionalMinus?: () => void
  optionalAdd?: () => void
  interval?: number
  isDisabledMinus?: boolean
  isDisabledMax?: boolean
}

export const CountData: FC<Props> = ({
  color ="primary",
  optionalMinus,
  optionalAdd,
  interval = 1,
  isDisabledMinus = false,
  isDisabledMax = false
}) => {
  const [count, setCount] = useState(1);

  const handleMinus = () => {
    setCount(count - interval)
    if (optionalMinus) {
      optionalMinus()
    }
  }

  const handleAdd = () => {
    setCount(count + interval)
    if (optionalAdd) {
      optionalAdd()
    }
  }

  return (
    <>
    <div className="flex items-center">
    <Button
        size="sm"
        color={color}
        variant="flat"
        isDisabled={(count <= 1) ? true : false}
        isIconOnly
        style={{
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0'
        }}
        onPress={handleMinus}
      >
        <TbMinus size={20} />
      </Button>
      <div className="container w-12 bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
        <p style={{ padding: '2px 0' }} className="font-medium text-xl">
          {count}
        </p>
      </div>
      <Button
        size="sm"
        color={color}
        variant="flat"
        isDisabled={isDisabledMax}
        isIconOnly
        style={{
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0'
        }}
        onPress={handleAdd}
      >
        <RiAddFill size={20} />
      </Button>
    </div>
    </>
  )
}