import { Chip, Spacer } from '@nextui-org/react'
import { type FC } from 'react'

interface Props {
  text: string
}

export const ErrorMessage: FC<Props> = ({ text }) => {
  return (
    <div className="container">
      <Chip
        color="danger"
        style={{ minWidth: '100%', textAlign: 'center' }}
        radius="sm"
        variant="flat"
      >
        <b>{text.toUpperCase()}</b> - No se pudo guardar la información.
      </Chip>
      <Spacer y={5} />
    </div>
  )
}
