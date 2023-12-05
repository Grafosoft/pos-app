import cuentalApi from '@/api/cuentalApi'
import { InvoiceParameters, Numeration, Seller } from '@/interface/invoiceParameters'
import { ProductContext } from '@/pages'
import { totalTaxPer } from '@/utils/totalPaxPer'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  Selection,
} from '@nextui-org/react'
import { type FC, useContext, useState, useEffect, ChangeEvent, useMemo } from 'react'
import { ParametersContext } from './ShoppingCart'
import { ObjectsSelects } from '@/utils/objectsSelect'

// COMPONENT
export const ShoppingCardFooder: FC = () => {
  // ProductContext
  const context = useContext(ProductContext)
  const { productList } = context
  // VARIABLES OF USESTATE
  const [subTotalProducts, setSubTotalProducts] = useState(0)
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0)
  const [totalTaxProducts, setTotalTaxProducts] = useState(0)

  const [dataWareHouses, setDataWareHouses] = useState<Seller[]>([])
  const [dataNumerations, setDataNumerations] = useState<Numeration[]>([])
  const [dataSellers, setDataSellers] = useState<Seller[]>([])

  // STATUS OF SELECTS
  const [selectWareHouses, setSelectWareHouses] = useState<Selection>(new Set([]));
  const [selectNumerations, setSelectNumerations] = useState<Selection>(new Set([]));
  const [selectSellers, setSelectSellers] = useState<Selection>(new Set([]));

  // CONTROLLERS OF MODAL
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  // INVOICE PARAMETERS CONTEXT
  const { parametersInfo, setParametersInfo } = useContext(ParametersContext)
  // -- USARLO AL ABRIR LA MODAL CON EL RESUMEN DE LA FACTURA --

  // Format Double
  const formatDouble = new Intl.NumberFormat('en-DE')

  const currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const totalDiscount = productList.reduce(
      (acumulator, element) => acumulator + element.discount,
      0
    )
    const totalTax = productList.reduce(
      (acumulator, element) =>
        acumulator + (totalTaxPer(element.tax) / 100) * element.value,
      0
    )
    const subTotal = productList.reduce(
      (acumulator, element) => acumulator + element.value,
      0
    )
    // console.log(totalTax)

    setSubTotalProducts(subTotal - totalTax)
    setTotalDiscountProducts(totalDiscount )
    setTotalTaxProducts(totalTax)
  }, [productList])

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await cuentalApi.get<InvoiceParameters>(
        `settings/invoices?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`
      )
      setParametersInfo(data)
      setDataWareHouses(data.warehouses);
      setDataNumerations(data.numerations);
      setDataSellers(data.sellers);
    }
    petiApi()
  }, [setParametersInfo])


  //* Nota: estas 3 funciones las debo pasar a una refacatorizacion para que solo sea una sola
  const memoNumbers = useMemo(
    ()=>{
       let object =  dataNumerations.find(element => (element.id).toString() === Array.from(selectNumerations)[0])
      return object;
    },[selectNumerations]);
  //* Nota: estas 3 funciones las debo pasar a una refacatorizacion para que solo sea una sola
  const memoSellers = useMemo(
    ()=>{
       let object =  dataSellers.find(element => (element.id).toString() === Array.from(selectSellers)[0])
      return object;
    },[selectSellers]);

  //* Nota: estas 3 funciones las debo pasar a una refacatorizacion para que solo sea una sola
  const memoWareHouses = useMemo(
    ()=>{
       let object =  dataWareHouses.find(element => (element.id).toString() === Array.from(selectWareHouses)[0])
      return object;
    },[selectWareHouses]);

  //console.log(memoNumbers,memoSellers,memoWareHouses)


  return (
    <div className="w-full h-[22vh] py-4 px-4 border-t shadow-sm dark:bg-black dark:border-t-slate-800">
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <span className="mr-2 text-default-500">Fecha: </span>
          <span>{currentDate}</span>
        </div>
        <div className="flex ">
          <div className=" text-default-500">
            <p className="">Descuento: </p>
            <p className="">Impuesto: </p>
            <p className="">SudTotal: </p>
          </div>
          <div className="flex flex-col items-end w-[150px]">
            <span> $ {formatDouble.format(totalDiscountProducts)}</span>
            <span> $ {formatDouble.format(totalTaxProducts)}</span>
            <span> $ {formatDouble.format(subTotalProducts)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center ">
        <Button
          onPress={onOpen}
          className="flex bg-[#3c3f99] justify-between w-full mt-5 mb-4"
          radius="sm"
          size="lg"
          isDisabled={
            subTotalProducts + totalTaxProducts - totalDiscountProducts === 0
          }
        >
          <div className="text-white">
            <h1>VENDER</h1>
          </div>
          <div className="text-white ">
            <h1>
              ${' '}
              {formatDouble.format(
                subTotalProducts + totalTaxProducts - totalDiscountProducts
              )}
            </h1>
          </div>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
        >
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                 Datos y Generacion de factura
                </ModalHeader>
                <ModalBody className="flex flex-col p-5 ">
                  <div className="flex  gap-3">
                    <Select
                      size="sm"
                      label="Seleccione la Numeración"
                      placeholder="Numeración"
                      className="max-w-xs"
                      onChange={(e)=>ObjectsSelects(e.target.value,dataNumerations,setSelectNumerations,selectNumerations)}
                      selectedKeys={selectNumerations}
                      onSelectionChange={setSelectNumerations}
                    >
                      {dataNumerations.map((element, index) => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      size="sm"
                      label="Seleccione el almacén"
                      placeholder="Almacén"
                      className="max-w-xs"
                      selectedKeys={selectWareHouses}
                      onSelectionChange={setSelectWareHouses}
                    >
                      {dataWareHouses.map((element, index) => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Select
                      size="sm"
                      label="Seleccione el vendedor"
                      placeholder="Vendedor"
                      className="w-full"
                      selectedKeys={selectSellers}
                      onSelectionChange={setSelectSellers}
                    >
                      {dataSellers.map((element, index) => (
                        <SelectItem key={element.id} value={element.id}>
                          {element.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div >
                    <Input
                      size="sm"
                      isReadOnly
                      variant='faded'
                      label="Tercero"
                      defaultValue={"Sr. 002111 "}
                      className="w-full "
                    />
                  </div>
                  <div className="flex p-2 items-center rounded-md gap-3 h-[80px] bg-slate-100 mt-20	">
                   <div className="w-full">
                    <p className="text-slate-500 text-sm ml-1 ">Total:</p>
                   <Input
                      size="sm"
                      isReadOnly
                      variant='faded'
                      defaultValue={formatDouble.format(
                        subTotalProducts + totalTaxProducts - totalDiscountProducts
                      )}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      className="text-black"
                    />
                   </div>
                   <div className="w-full">
                    <p className="text-slate-500 text-sm ml-1 ">Recibido:</p>
                   <Input
                      size="sm"
                      isReadOnly
                      variant='faded'
                      defaultValue={"2000"}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      className="text-black"
                    />
                   </div>
                   <div className="w-full">
                    <p className="text-slate-500 text-sm ml-1 ">Cambio:</p>
                   <Input
                      size="sm"
                      isReadOnly
                      variant='faded'
                      defaultValue={"0"} // valor que se mostrara
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      className="text-black"
                    />
                   </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                <Button
                  color="secondary"
                  variant="flat"
                  className="w-full rounded-md">
                  Generar D.E./POS
                </Button>
                <Button
                  color="secondary"
                  variant="flat"
                  className="w-full rounded-md">
                  Generar Factura
                </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

      </div>
      <div className="text-default-500">
        <p>{productList.length} Productos</p>
      </div>
    </div>
  )
}
