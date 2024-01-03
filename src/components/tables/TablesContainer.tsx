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
  const [isEmptyInputName, getIsEmptyInputName] = useState(false)
  const [newColorInput, setNewColorInput] = useState(
    ConvertRGBtoHex(color.colorApp)
  )
  const [tableView, setTableView] = useState<Tables>({
    id: 0,
    count: 0,
    name: '',
    metadata: '',
    data: ''
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
      }),
      data: JSON.stringify({
        items: [
          {
            id: 11120,
            quantity: 10,
            value: 1500000,
            price: 150000,
            discount: 0,
            description: '',
            discountAmount: 0,
            totalAmount: 178500,
            items: {
              id: 11120,
              name: '202209210674'
            },
            tax: [
              {
                id: 104,
                name: 'IVA 19',
                value: 0,
                percentage: 19
              }
            ],
            image: null,
            group: {
              id: 14,
              name: 'LINEA TRAJE DE BAÑO'
            }
          },
          {
            id: 11121,
            quantity: 1,
            value: 80000,
            price: 80000,
            discount: 0,
            description: '',
            discountAmount: 0,
            totalAmount: 92800,
            item: {
              id: 11121,
              name: '352000532681958'
            },
            tax: [
              {
                id: 103,
                name: 'IVA 16',
                value: 0,
                percentage: 16
              }
            ],
            image: null,
            group: {
              id: 14,
              name: 'LINEA TRAJE DE BAÑO'
            }
          }
        ]
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameInputView, newColorInput, selectIconIndex])

  useEffect(() => {
    if (nameInputView.length !== 0) {
      getIsEmptyInputName(false)
    }
  }, [nameInputView])
  useEffect(() => {
    console.log(onclose)
    console.log(onOpen)
    console.log(onOpenChange)
  }, [onOpen, onOpenChange])

  const handleCreateTable = (onClose: () => void) => {
    if (nameInputView.length !== 0) {
      console.log('SE EJECUTRA')

      getIsEmptyInputName(false)
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
    } else {
      getIsEmptyInputName(true)
    }
  }

  return (
    <div
      className="col-span-12 py-5 pb-0 "
      style={{ minHeight: 'calc(100vh - 128px)' }}
    >
      <div id="divContainerTables" className="py-3 ">
        <div className="flex justify-center h-[25vh] w-[32vh]">
          <Card
            onPress={onOpen}
            isPressable
            radius="md"
            className="flex cursor-pointer justify-center items-center w-[25vh] border-4 dark:border-[#B3B3B3] border-dashed shadow-sm bg-[#F5F6FA] dark:bg-inherit"
          >
            <IoAdd size={110} color={'B3B3B3'} />
          </Card>
        </div>
        {tables.map((element, index) => {
          return <TablesCard key={index} tableElement={element} />
        })}

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
                          id="inputColor"
                        />
                      </div>
                    </div>
                    <div className="w-full bg-[#F5F6FA] dark:bg-neutral-700 py-5 flex justify-center rounded-lg">
                      <TablesCard
                        isPressAble={false}
                        tableElement={tableView}
                      />
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
