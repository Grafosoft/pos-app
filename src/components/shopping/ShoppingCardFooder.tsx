import { ProductContext } from '@/pages'
import { totalTaxPer } from '@/utils/totalPaxPer'
import { Button } from '@nextui-org/react'
import { type FC, useContext, useState, useEffect } from 'react'

// COMPONENT
export const ShoppingCardFooder: FC = () => {
  // ProductContext
  const context = useContext(ProductContext)
  const { productList } = context
  const [subTotalProducts, setSubTotalProducts] = useState(0)
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0)
  const [totalTaxProducts, setTotalTaxProducts] = useState(0)

  // INVOICE PARAMETERS CONTEXT
  // const { parametersInfo } = useContext(ParametersContext)
  // -- USARLO AL ABRIR LA MODAL CON EL RESUMEN DE LA FACTURA --

  // Format Double
  const formatDouble = new Intl.NumberFormat('en-DE')

  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${year}/${month}/${day}`

  useEffect(() => {
    console.log(productList)
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

    setSubTotalProducts(subTotal)
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
      </div>
      <div className="text-default-500">
        <p>{productList.length} Productos</p>
      </div>
    </div>
  )
}
