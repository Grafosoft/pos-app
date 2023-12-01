import { Button } from '@nextui-org/react'
import { type FC } from 'react'

// COMPONENT
export const ShoppingCardFooder: FC = () => {
  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${year}/${month}/${day}`

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
  )
}
