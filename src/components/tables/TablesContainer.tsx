import {
  useState,
  type FC,
  useEffect,
  useContext,
  type ChangeEvent
} from 'react'
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
  SelectItem,
  Divider
} from '@nextui-org/react'
import { ConvertRGBtoHex, converterHexadecimalToRgb } from '@/utils/hexadeToRgb'

import { UrlContext } from '@/pages/[nameApp]/mesas'
import { icons } from '@/utils/selectTableIcons'

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

  const [nameInputView, setNameInputView] = useState('')

  const [newColorInput, setNewColorInput] = useState(
    ConvertRGBtoHex(color.colorApp)
  )
  const [tableView, setTableView] = useState<Tables>({
    id: 0,
    count: 0,
    name: '',
    metadata: ''
  })

  const [width, getwidth] = useState(0)

  const [selectIconIndex, setSelectIconIndex] = useState('0')

  const handleSelectedItem = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectIconIndex(e.target.value)
  }

  useEffect(() => {
    const validateWidth = window.innerWidth
    getwidth(validateWidth)
    setTableView({
      ...tableView,
      name: nameInputView,
      metadata: JSON.stringify({
        colorApp: converterHexadecimalToRgb(newColorInput),
        colorProduct: converterHexadecimalToRgb(newColorInput).replace(
          ',1)',
          ',0.2)'
        ),
        iconIndex: parseInt(selectIconIndex)
      })
    })
    console.log(tableView)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameInputView, newColorInput, selectIconIndex])

  const handleCreateTable = (onClose: () => void) => {
    setNameInputView('')
    setNewColorInput(ConvertRGBtoHex(color.colorApp))
    setSelectIconIndex('0')
    onClose()
  }

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
        <div className="flex justify-center  h-[28vh] lg:h-[25vh] w-[27vh]">
          <Card
            onPress={onOpen}
            isPressable
            radius="md"
            className="flex cursor-pointer justify-center items-center h-[28vh] lg:h-[25vh] w-[25vh] border-4 border-dashed shadow-sm bg-[#F5F6FA]"
          >
            <IoAdd size={110} color={'E5E7EB'} />
          </Card>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <div className="flex items-center justify-between gap-5">
                    <div className="w-full ">
                      <h1 className="w-full text-center mb-5 text-xl">
                        Crear Mesa
                      </h1>
                      <Input
                        onValueChange={setNameInputView}
                        value={nameInputView}
                        label="Nombre"
                        size="sm"
                        className="mb-3"
                      />
                      <div className="flex w-full items-center gap-3">
                        {/*  <label className="mr-5">Color:</label> */}
                        <Select
                          size="sm"
                          label="Select an animal"
                          className="max-w-xs"
                          onChange={handleSelectedItem}
                          selectedKeys={[selectIconIndex]}
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
                        <Input
                          type="color"
                          size="sm"
                          startContent={<div>Color</div>}
                          value={newColorInput}
                          onValueChange={setNewColorInput}
                        />
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 py-5 flex justify-center rounded-lg">
                      <TablesCard tableElement={tableView} />
                    </div>
                  </div>
                  <Divider orientation="vertical" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => {
                      handleCreateTable(onClose)
                    }}
                  >
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
