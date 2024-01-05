import { totalTaxPer } from '@/utils/totalPaxPer'
import { Button, useDisclosure } from '@nextui-org/react'
import { type FC, useContext, useState, useEffect } from 'react'
import { ModalBill } from '../modals/ModalBill'
import { ProductContext } from '@/context/ProductContext'
import { UrlContext } from '@/context/UrlContext'

// COMPONENT
export const ShoppingCardFooder: FC = () => {
  // ProductContext
  const context = useContext(ProductContext)
  const { productList } = context

  // import Context UrlContext
  const { color } = useContext(UrlContext)

  // VARIABLES OF USESTATE
  const [subTotalProducts, setSubTotalProducts] = useState(0)
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0)
  const [totalTaxProducts, setTotalTaxProducts] = useState(0)

  // CONTROLLERS OF MODAL
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Format Double
  const formatDouble = new Intl.NumberFormat('en-DE')

  const currentDate = new Date().toISOString().slice(0, 10)

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

    setSubTotalProducts(subTotal - totalTax)
    setTotalDiscountProducts(totalDiscount)
    setTotalTaxProducts(totalTax)
  }, [productList])

  return (
    <div className="w-full h-[22vh] py-4 px-4 border-t shadow-sm dark:bg-black dark:border-t-slate-800">
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center">
          <span className="mr-2 text-default-500">Fecha: </span>
          <span>{currentDate}</span>
        </div>
        <div className="flex ">
          <div className=" text-default-500">
            <p className="">SudTotal: </p>
            <p className="">Descuento: </p>
            <p className="">Impuesto: </p>
          </div>
          <div className="flex flex-col items-end w-[150px]">
            <span> $ {formatDouble.format(subTotalProducts)}</span>
            <span> $ {formatDouble.format(totalDiscountProducts)}</span>
            <span> $ {formatDouble.format(totalTaxProducts)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center ">
        <Button
          onPress={onOpen}
          className={`flex justify-between w-full mt-5 mb-4`}
          style={{ background: `${color.colorApp}` }}
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

        <ModalBill
          isOpenModalBill={isOpen}
          onOpenChangeModalBill={onOpenChange}
          subTotalProducts={subTotalProducts}
          totalDiscountProducts={totalDiscountProducts}
          totalTaxProducts={totalTaxProducts}
        />
      </div>
      <div className="text-default-500">
        <p>{productList.length} Productos</p>
      </div>
    </div>
  )
}
