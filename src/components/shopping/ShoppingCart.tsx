import cuentalApi from '@/api/cuentalApi'
import { type CustomerList } from '@/interface/customers'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  Image,
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
  type FormEventHandler,
  useContext,
  useEffect
} from 'react'

import { TbSearch, TbUsers, TbShoppingCartPlus } from 'react-icons/tb'
import { customerColumnsModal } from '../columns/customerColumnsModal'
import { RenderCellCustomerModal } from '@/renderCell/RenderCellCustomerModal'
import { ProductContext } from '@/pages'
import { ImageRound } from '../imageRound/ImageRound';
import { TruncateText } from '../../utils/TruncateText'
import { CountData } from './CountData'

import { TbTrash } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { ShowPrices } from '@/utils/ShowPrices'


export const ShoppingCart: FC = () => {
  const [productNeverDuplicate, setproductNeverDuplicate] = useState([])
  // Import ProductContext
  const context = useContext(ProductContext)
  const { productList, setProductList } = context
  //Input Count
  const [count, setCount] = useState(1);


/*   useEffect(()=>{
    let idUnicos = new Set();

    setproductNeverDuplicate(productList.filter((element)=>{
      if(!idUnicos.has(element.id)){
        idUnicos.add(element.id)
        return true;
      }
      return false;
    })
    )

    //setProductList(newArray);


    console.log(productList);
    for (let i = 0; i < productList.length; i++) {
      let idIteracion = productList[i].id;
      console.log(idIteracion);

      for (let i2 = 0; i2 < productList.length; i2++) {
        console.log(idIteracion == productList[i2].id && idPermite <= 1);
        if(idIteracion == productList[i2].id && idPermite <= 1 ){
          console.log(idPermite, "antes");
          setIdPermite(idPermite+1);
          console.log(idPermite, "despues");
          productList.splice(i2,1);
        }
      }
    }


  },[productList]) */


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
    console.log(
      `contacts/?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&name=${customerModalSearch}`
    )

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

      <div className="w-full overflow-auto max-h-[50vh] min-h-[50vh] p-3 bg-[#F5F6FA] dark:bg-[#18181B]">
        {productList.length === 0 ? (
          <div className="w-full h-[44vh] flex flex-col  justify-center items-center">
            <TbShoppingCartPlus color="#A1A1AA" size={50} />
            <h1 className="mt-4 text-neutral-400  text-lg font-mono text-center">
              Aquí verás los productos que <br />
              elijas en tu próxima venta
            </h1>
          </div>
        ) : (
          productList.map((element, index) => (
            <Card className="mb-3" key={element.id}>
              <CardBody>
                <div className="flex justify-between  items-center">
                  <div className="flex gap-3">
                    <ImageRound image={element.image} name={element.name} formeRound={false} />
                    <div className="flex flex-col justify-around">
                      <p className="text-xl font-medium">{TruncateText(element.name)}</p>
                      <p className="text-small text-default-500">{TruncateText(element.groupName)}</p>
                      <ShowPrices price={element.salePrice} total={123} discount={1231} tax={12391} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 ">
                    <div className="flex gap-3">
                      <Button isIconOnly color="primary" variant="flat" size="sm" aria-label="Like">
                        <TbEdit size={15} />
                      </Button>
                      <Button isIconOnly color="danger" variant="flat" size="sm" edaria-label="Take a photo">
                        <TbTrash size={15} />
                      </Button>
                    </div>
                    <div>
                      <CountData color="primary" count={count} setCount={setCount} isDisabledMinus={(count <= 1) ? true : false} />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      <div className="w-full h-[22vh] py-4 px-4 border-t shadow-sm dark:bg-black dark:border-t-slate-800">
        <div className="flex w-full justify-between">
          <div className="flex justify-center items-center">
            <span className="mr-2 text-default-500">Fecha: </span>
            <span>{'2023/11/29'}</span>
          </div>
          <div className="flex ">
            <div className=" text-default-500">
              <p className="">SudTotal: </p>
              <p className="">Descuento: </p>
              <p className="">Impuesto: </p>
            </div>
            <div className="flex flex-col items-end w-[150px]">
              <span> $ {'1.200'}</span>
              <span> $ {'12435345343'}</span>
              <span> $ {'12'}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center ">
          <Button
            className="flex bg-[#3c3f99] justify-between w-full mt-5 mb-4"
            radius="sm"
            size="lg"
          >
            <div className="text-white">
              <h1>VENDER</h1>
            </div>
            <div className="text-white ">
              <h1>$ {'2.000'}</h1>
            </div>
          </Button>
        </div>
        <div className="text-default-500">
          <p>{'1'} Productos</p>
        </div>
      </div>
    </div>
  )
}
