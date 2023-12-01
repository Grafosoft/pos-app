import {
  type ChangeEvent,
  type FC,
  type FormEventHandler,
  useState
} from 'react'

import {
  Button,
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'

import { RenderCellCustomerModal } from '@/renderCell/RenderCellCustomerModal'
import { type CustomerList } from '@/interface/customers'

import { TbSearch, TbUsers } from 'react-icons/tb'
import cuentalApi from '@/api/cuentalApi'
import { customerColumnsModal } from '../columns/customerColumnsModal'

export const ShoppingCardHeader: FC = () => {
  // Input Contact
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [contactList, setContactList] = useState<CustomerList[]>([])
  const [isLoadingModal, setIsLoadingModal] = useState(true)
  const [customerSearch, setCustomerSearch] = useState({
    id: 0,
    name: ''
  })
  const [customerModalSearch, setCustomerModalSearch] = useState('')

  const handleSubmitContact: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setIsLoadingModal(true)

    cuentalApi
      .get<CustomerList[]>(
        `contacts/?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&name=${customerModalSearch}`
      )
      .then(response => {
        if (response.status === 200) {
          setContactList(response.data)
          setIsLoadingModal(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="flex-col flex w-full p-5 bg-white dark:bg-black justify-center m-0 items-center  border-b dark:border-b-slate-800 shadow-sm">
      <h1 className="text-2xl font-semibold">Factura de Venta</h1>
      <div className="flex gap-3 w-full ">
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
      </div>

      <Modal
        closeButton
        size="5xl"
        scrollBehavior="inside"
        backdrop="blur"
        style={{ width: '1000px' }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => {
            if (contactList.length === 0) {
              cuentalApi
                .get<CustomerList[]>(
                  `contacts/?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&name=`
                )
                .then(response => {
                  if (response.status === 200) {
                    setContactList(response.data)
                    setIsLoadingModal(false)
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            }
            return (
              <>
                <ModalHeader>
                  <div className="container">
                    <h2
                      id="modal-title"
                      className="flex justify-center py-5 text-3xl font-bold"
                    >
                      Listado de clientes
                    </h2>
                    <Spacer y={1} />
                    <form onSubmit={handleSubmitContact}>
                      <Input
                        aria-label="Buscar tercero"
                        placeholder="Buscar tercero"
                        value={customerModalSearch}
                        width="100%"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setCustomerModalSearch(e.target.value)
                        }}
                        startContent={<TbSearch />}
                        size="md"
                      />
                    </form>
                  </div>
                </ModalHeader>
                <ModalBody>
                  {isLoadingModal ? (
                    <div
                      className="container"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                      }}
                    >
                      <CircularProgress size="lg" color={'secondary'} />
                    </div>
                  ) : (
                    <Table
                      aria-label="Lista de cliente"
                      style={{ height: 'auto', minWidth: '100%' }}
                      isStriped
                      shadow="none"
                    >
                      <TableHeader columns={customerColumnsModal}>
                        {column => (
                          <TableColumn key={column.uid} align="start">
                            {column.name}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        emptyContent="No hay datos por mostrar."
                        items={contactList}
                      >
                        {item => (
                          <TableRow key={item.id}>
                            {columnKey => (
                              <TableCell>
                                <RenderCellCustomerModal
                                  customer={item}
                                  columnKey={columnKey}
                                  closeHandler={onClose}
                                  setCustomerSearch={setCustomerSearch}
                                />
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    style={{ width: 'auto' }}
                    variant={'flat'}
                    color="danger"
                    onPress={onClose}
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )
          }}
        </ModalContent>
      </Modal>
    </div>
  )
}
