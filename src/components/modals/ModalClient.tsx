import {
  useState,
  type ChangeEvent,
  type FC,
  type FormEventHandler,
  useContext
} from 'react'

import { customerColumnsModal } from '../columns/customerColumnsModal'
import { RenderCellCustomerModal } from '@/renderCell/RenderCellCustomerModal'
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
  TableRow
} from '@nextui-org/react'
import { type CustomerList } from '@/interface/customers'
import { TbSearch } from 'react-icons/tb'
import { UrlContext } from '@/context/UrlContext'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

export const ModalClient: FC<Props> = ({ isOpen, onOpenChange }) => {
  // Input Contact
  const [contactList, setContactList] = useState<CustomerList[]>([])
  const [isLoadingModal, setIsLoadingModal] = useState(true)

  // import Context UrlContext
  const { companyId, apikey, functionApi } = useContext(UrlContext)

  // Use states
  const [customerModalSearch, setCustomerModalSearch] = useState('')

  const handleSubmitContact: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setIsLoadingModal(true)

    functionApi
      .get<CustomerList[]>(
        `contacts/?companyId=${companyId}&page=0&apikey=${apikey}&name=${customerModalSearch}`
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
            functionApi
              .get<CustomerList[]>(
                `contacts/?companyId=${companyId}&page=0&apikey=${apikey}&name=`
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
                    aria-label="Listado de clientes"
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
  )
}
