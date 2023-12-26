import { useState, type FC, useEffect } from 'react'
import { TablesCard } from './TablesCard'
import { IoAdd } from 'react-icons/io5'

import {
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@nextui-org/react'

export interface Tables {
  id: number
  name: string
  count: number
  metadata: string
}

interface Props {
  tables: Tables[]
}

export const TablesContainer: FC<Props> = ({ tables }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Extrac Width Actualiti
  const [width, getwidth] = useState(0)
  useEffect(() => {
    const validateWidth = window.innerWidth
    getwidth(validateWidth)
  }, [])
  return (
    <div
      className="col-span-12 p-5 pb-0 "
      style={{ minHeight: 'calc(100vh - 128px)' }}
    >
      <div
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 grid-cols-1 gap-2 lg:gap-5 p-3 overflow-auto"
        style={{
          maxHeight:
            width < 1230 ? 'calc(100vh - 165px)' : 'calc(100vh - 160px)'
        }}
      >
        {tables.map((element, index) => {
          return <TablesCard key={index} tableElement={element} />
        })}

        <Card
          onPress={onOpen}
          isPressable
          radius="md"
          className="flex cursor-pointer justify-center items-center h-[28vh] lg:h-[25vh] w-[27vh] border-4 border-dashed shadow-sm bg-[#F5F6FA]"
        >
          <IoAdd size={110} color={'E5E7EB'} />
        </Card>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Crear Mesa
                </ModalHeader>
                <ModalBody>
                  <Input label="Nombre" size="sm" className="" />
                  <div className="flex items-center ">
                    <label className="mr-5">Color:</label>
                    <input type="color" />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" variant="flat" onPress={onClose}>
                    Crear
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
