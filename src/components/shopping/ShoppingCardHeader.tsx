import { type FC, useContext } from 'react'

import { Input, useDisclosure, Button } from '@nextui-org/react'

import { TbUsers } from 'react-icons/tb'

import { ModalClient } from '../modals/ModalClient'
import { ParametersContext } from './ShoppingCart'
import { TfiSave } from 'react-icons/tfi'
import { UrlContext } from '@/context/UrlContext'

export const ShoppingCardHeader: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { customerSearch } = useContext(ParametersContext)

  const { idTable } = useContext(UrlContext)

  const handleSaveButton = () => {}

  return (
    <div className="flex-col flex w-full p-5 bg-white dark:bg-black justify-center m-0 items-center  border-b dark:border-b-slate-800 shadow-sm">
      <h1 className="text-2xl font-semibold">Factura de Venta</h1>
      <div className="flex items-center  gap-3 w-full ">
        <Input
          aria-label="Buscar Cliente"
          readOnly={true}
          placeholder="Buscar cliente"
          onClick={onOpen}
          className="mt-5"
          value={customerSearch.name}
          startContent={<TbUsers size={20} />}
          style={{ cursor: 'pointer' }}
          size="sm"
        />
        <div
          className=""
          style={{ display: idTable === undefined ? 'none' : 'flex' }}
        >
          <Button
            color="success"
            variant="flat"
            onPress={handleSaveButton}
            className="mt-5"
          >
            <TfiSave size={20} /* color={'black'}  */ />
          </Button>
        </div>
      </div>
      <ModalClient isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}
