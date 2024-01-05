import { Input } from '@nextui-org/react'
import { type FC } from 'react'

interface Props {
  defaultValue: string
  variant: 'flat' | 'bordered' | 'faded' | 'underlined'
  size: 'sm' | 'md' | 'lg'
  isReadOnly: boolean
  textTitle: string
}

export const InputBill: FC<Props> = ({
  defaultValue,
  variant,
  size,
  isReadOnly,
  textTitle
}) => {
  return (
    <div className="w-full">
      <p className="dark:text-default-500 text-slate-500 text-sm ml-1 ">
        {textTitle}:
      </p>
      <Input
        size={size}
        isReadOnly={isReadOnly}
        variant={variant}
        placeholder={defaultValue} // <- Funciona pero queda opaca la letra
        // defaultValue={defaultValue } <- No funciona
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
            {/* <span className="text small ml-1">{defaultValue}</span> */}
            {/* <- funciona y queda negra la letra */}
          </div>
        }
        className="dark:text-white text-black"
      />
    </div>
  )
}
