import { ProductContext } from '@/pages';
import { Button } from '@nextui-org/react'
import { type FC, useContext, useState, useEffect } from 'react'

// COMPONENT
export const ShoppingCardFooder: FC = () => {
  // ProductContext
  const context = useContext(ProductContext);
  const { productList, setProductList } = context
  const [ subTotalProducts, setSubTotalProducts] = useState(0);
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0);
  const [totalTaxProducts, setTotalTaxProducts] = useState(0);

  //Format Double
  const formatDouble = new Intl.NumberFormat('en-DE');

  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${year}/${month}/${day}`

  useEffect(()=>{
    let totalDiscount = productList.reduce((acumulator, element)=> acumulator + element.discount,0);
    let totalTax = productList.reduce((acumulator, element)=> acumulator + ((element.taxValue /100) * element.amountPrice) ,0);
    let subTotal = productList.reduce((acumulator, element)=> acumulator + element.amountPrice,0);
    //console.log(totalTax)

    setSubTotalProducts(subTotal);
    setTotalDiscountProducts(totalDiscount);
    setTotalTaxProducts(totalTax);

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
          isDisabled = {((subTotalProducts + totalTaxProducts) - totalDiscountProducts) === 0}
        >
          <div className="text-white">
            <h1>VENDER</h1>
          </div>
          <div className="text-white ">
            <h1>$ {formatDouble.format((subTotalProducts + totalTaxProducts) - totalDiscountProducts)}</h1>
          </div>
        </Button>
      </div>
      <div className="text-default-500">
        <p>{productList.length} Productos</p>
      </div>
    </div>
  )
}
