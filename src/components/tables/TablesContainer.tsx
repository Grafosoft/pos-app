import {
  useState,
  type FC,
  useEffect,
  useContext,
  type ChangeEvent,
  useMemo
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

import { icons } from '@/utils/selectTableIcons'
import { UrlContext } from '@/context/UrlContext'

export interface Tables {
  id: number
  name: string
  count: number
  metadata: string
  data?: string
}

interface Props {
  tables: Tables[]
}

export const TablesContainer: FC<Props> = ({ tables }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // import Context UrlContext
  const { color, functionApi } = useContext(UrlContext)

  const [nameInputView, setNameInputView] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [newColorInput, setNewColorInput] = useState(
    ConvertRGBtoHex(color.colorApp)
  )
  const [tableView, setTableView] = useState<Tables>({
    id: 0,
    count: 0,
    name: '',
    metadata: ''
  })
  const [selectIconIndex, setSelectIconIndex] = useState('0')

  const handleSelectedItem = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectIconIndex(e.target.value)
  }

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameInputView, newColorInput, selectIconIndex])

  const isEmptyInputName = useMemo(() => {
    if (nameInputView.length === 0) return true
  }, [nameInputView])

  const handleCreateTable = (onClose: () => void) => {
    if (nameInputView.length !== 0) {
      setIsLoading(true)
      setNameInputView('')
      setNewColorInput(ConvertRGBtoHex(color.colorApp))
      setSelectIconIndex('0')
      console.log(tableView)

      functionApi.post(
        'https://lab.cuental.com/api/v1/pos-categories?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27',
        tableView
      )
      location.reload()
      // onClose()
    }
  }

  return (
    <div
      className="col-span-12 p-5 pb-0 "
      style={{ minHeight: 'calc(100vh - 128px)' }}
    >
      <div className="grid sm:grid-cols-1 ms:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 2xl:grid-cols-7 grid-cols-1 gap-2 lg:gap-5 p-3 ">
        {tables.map((element, index) => {
          return <TablesCard key={index} tableElement={element} />
        })}
        <div className="flex justify-center  h-[28vh] lg:h-[25vh] w-[27vh]">
          <Card
            onPress={onOpen}
            isPressable
            radius="md"
            className="flex cursor-pointer justify-center items-center h-[28vh] lg:h-[25vh] w-[25vh] border-4 dark:border-[#B3B3B3] border-dashed shadow-sm bg-[#F5F6FA] dark:bg-inherit"
          >
            <IoAdd size={110} color={'B3B3B3'} />
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
                        isInvalid={isEmptyInputName}
                        errorMessage={isEmptyInputName && 'Nombre Requerido'}
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
                    <div className="w-full bg-[#F5F6FA] dark:bg-neutral-700 py-5 flex justify-center rounded-lg">
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
                    isLoading={isLoading}
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
