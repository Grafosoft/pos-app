import { type FC, useContext, useEffect, useState } from 'react'
import { type InvoiceParameters } from '@/interface/invoiceParameters'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { SelectObject } from '@/components/objectSelect/ObjectsSelect'
import { InputBill } from '../inputsBill/InputBill'
import { ParametersContext } from '../shopping/ShoppingCart'
import { UrlContext } from '@/pages/[nameApp]'
import { type Tax } from '@/interface/products'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  subTotalProducts: number
  totalDiscountProducts: number
  totalTaxProducts: number
}

export const ModalBill: FC<Props> = ({
  isOpen,
  onOpenChange,
  subTotalProducts,
  totalDiscountProducts,
  totalTaxProducts
}) => {
  const [dataWareHouses, setDataWareHouses] = useState<Tax[]>([])
  const [dataNumerations, setDataNumerations] = useState<Tax[]>([])
  const [dataSellers, setDataSellers] = useState<Tax[]>([])

  // import Context UrlContext
  const { companyId, apikey, color, functionApi } = useContext(UrlContext)

  // Customer Context
  const { customerSearch } = useContext(ParametersContext)

  // INVOICE PARAMETERS CONTEXT
  const { setParametersInfo } = useContext(ParametersContext)
  // -- USARLO AL ABRIR LA MODAL CON EL RESUMEN DE LA FACTURA --

  // Format Double
  const formatDouble = new Intl.NumberFormat('en-DE')

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await functionApi.get<InvoiceParameters>(
        `settings/invoices?companyId=${companyId}&page=0&apikey=${apikey}`
      )
      setParametersInfo(data)
      setDataWareHouses(data.warehouses)
      setDataNumerations(data.numerations)
      setDataSellers(data.sellers)
    }
    petiApi()
  }, [apikey, companyId, functionApi, setParametersInfo])

  return (
    <>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Datos Finales
              </ModalHeader>
              <ModalBody className="flex flex-col p-5 ">
                <div className="flex gap-3">
                  <SelectObject
                    arrayFind={dataNumerations}
                    textType="Numeración"
                    newTax={[]}
                    setNewTax={() => {}}
                  />
                  <SelectObject
                    arrayFind={dataWareHouses}
                    textType="Bodega"
                    newTax={[]}
                    setNewTax={() => {}}
                  />
                </div>
                <div>
                  <SelectObject
                    arrayFind={dataSellers}
                    textType="Vendedor"
                    newTax={[]}
                    setNewTax={() => {}}
                  />
                </div>
                <div>
                  <Input
                    size="sm"
                    isReadOnly
                    variant="faded"
                    label="Tercero"
                    defaultValue={customerSearch.name}
                    className="w-full "
                  />
                </div>
                <div className="flex p-2 items-center rounded-md gap-3 h-[80px] dark:bg-zinc-700 bg-slate-100 mt-20	">
                  <InputBill
                    variant="faded"
                    size="sm"
                    textTitle="Total"
                    isReadOnly={true}
                    defaultValue={formatDouble.format(
                      subTotalProducts +
                        totalTaxProducts -
                        totalDiscountProducts
                    )}
                  />
                  <InputBill
                    variant="faded"
                    size="sm"
                    textTitle="Recibido"
                    isReadOnly={true}
                    defaultValue={'2000'}
                  />
                  <InputBill
                    variant="faded"
                    size="sm"
                    textTitle="Cambio"
                    isReadOnly={true}
                    defaultValue={'2000'}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color={color.colorComponent}
                  variant="flat"
                  className="w-full rounded-md"
                >
                  Generar D.E./POS
                </Button>
                <Button
                  color={color.colorComponent}
                  variant="flat"
                  className="w-full rounded-md"
                >
                  Generar Factura
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
