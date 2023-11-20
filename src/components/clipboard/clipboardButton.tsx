import { Spacer } from '@nextui-org/react'
import { type FC, type ReactElement, useState } from 'react'
import { TbCheck } from 'react-icons/tb'

interface Props {
  str: string
  children: ReactElement | string
}

export const ClipboardButton: FC<Props> = ({ children, str }) => {
  const [isCopy, setIsCopy] = useState(false)

  const handleCopy = () => {
    setIsCopy(true)
    navigator.clipboard.writeText(str)
    setTimeout(() => {
      setIsCopy(false)
    }, 3000)
  }

  return (
    <span onClick={handleCopy}>
      {isCopy ? (
        <span
          className="flex flex-row items-center"
          style={{ color: '#17C964' }}
        >
          <TbCheck color="#17C964" />
          <Spacer x={1} />
          Copiado
        </span>
      ) : (
        <span style={{ cursor: 'pointer' }}>{children}</span>
      )}
    </span>
  )
}
