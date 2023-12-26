import { useState, type FC, useEffect, useContext } from 'react'
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
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import { converterHexadecimalToRgb } from '@/utils/hexadeToRgb'

import { MdOutlineTableBar, MdTableRestaurant } from 'react-icons/md'
import { FcTabletAndroid } from 'react-icons/fc'
import { UrlContext } from '@/pages/[nameApp]/mesas'

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

    // import Context UrlContext
    const { color } = useContext(UrlContext)

  const [newColorInput, setNewColorInput] = useState(color.colorApp)

  const [width, getwidth] = useState(0)
  useEffect(() => {
    const validateWidth = window.innerWidth
    getwidth(validateWidth)
    console.log(converterHexadecimalToRgb(newColorInput))
  }, [newColorInput])

  const icons = [
    {
      item: <MdOutlineTableBar size={40} />
    },
    {
      item: <MdTableRestaurant size={40} />
    },
    {
      item: <FcTabletAndroid size={40} />
    }
  ]

  return (
    <div
      className="col-span-12 p-5 pb-0 "
      style={{ minHeight: 'calc(100vh - 128px)' }}
    >
      <div
        className="grid sm:grid-cols-1 ms:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 grid-cols-1 gap-2 lg:gap-5 p-3 overflow-auto"
        style={{
          maxHeight:
            width < 1230 ? 'calc(100vh - 100px)' : 'calc(100vh - 160px)'
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
                  <div className="flex items-center gap-2 ">
                    {/*  <label className="mr-5">Color:</label> */}
                    <Input
                      type="color"
                      size="sm"
                      startContent={<div>Color</div>}
                      value={newColorInput}
                      onValueChange={setNewColorInput}
                    />
                    <Select
                      size="sm"
                      label="Select an animal"
                      className="max-w-xs"
                    >
                      {icons.map((icono, index) => (
                        <SelectItem
                          className="flex flex-col items-center"
                          key={index}
                          textValue={`Mesa #${index + 1}`}
                          value={index}
                        >
                          {icono.item}
                        </SelectItem>
                      ))}
                    </Select>
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
