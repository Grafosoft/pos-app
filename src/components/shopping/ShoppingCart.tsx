import cuentalApi from '@/api/cuentalApi'
import { type CustomerList } from '@/interface/customers'
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
import React, {
  useState,
  type ChangeEvent,
  type FC,
  type FormEventHandler
} from 'react'

import { TbSearch, TbUsers } from 'react-icons/tb'
import { customerColumnsModal } from '../columns/customerColumnsModal'
import { RenderCellCustomerModal } from '@/renderCell/RenderCellCustomerModal'

import { TbShoppingCartPlus } from "react-icons/tb";


export const ShoppingCart: FC = () => {
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
    console.log(`contacts/?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&name=${customerModalSearch}`
    );

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
    <div className="mi flex flex-col  min-h-[86vh]">
      <div className="flex-col flex w-full p-5 bg-white dark:bg-inherit justify-center m-0 items-center border-b shadow-sm">
        <h1 className="text-2xl font-semibold">Factura de Venta</h1>
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
      <div className="w-full overflow-auto max-h-[50vh] min-h-[50vh] p-3 bg-[#F5F6FA]">
        <div className="w-full h-[44vh] flex flex-col  justify-center items-center">
          <TbShoppingCartPlus color="#A1A1AA" size={150} />
          <h1 className="uppercase text-neutral-400 md:text-3xl text-xl font-mono">Sin pruductos</h1>
        </div>
      </div>
      <div className='w-full h-[22vh] py-4 px-4 border-t shadow-sm'>
        <div className="flex w-full justify-between">
          <div className="flex justify-center items-center">
            <span className="mr-2 text-default-500">Fecha: </span>
            <span>{"2023/11/29"}</span>
          </div>
          <div className="flex ">
            <div className=" text-default-500">
              <p className=''>SudTotal:  </p>
              <p className=''>Descuento: </p>
              <p className=''>Impuesto:  </p>
            </div>
            <div className="flex flex-col items-end w-[150px]">
              <span> {"1.200"}</span>
              <span> {"12435345343"}</span>
              <span> {"12"}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <Button className="flex justify-between w-full mt-5 mb-4"
            radius='sm'
            size="lg"
            variant="flat" color="success">
            <div className="text-green-700 ">
              <h1>Comprar</h1>
            </div>
            <div className="text-green-700 ">
              <h1>$ {"2.000"}</h1>

            </div>
          </Button >
        </div>
        <div className=''>
          <p>{"1"} Productos</p>
        </div>

      </div>
    </div>
  )
}
