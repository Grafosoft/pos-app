import React, { FC, useState } from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


interface Props{
    price:number
    total:number
    discount:number
    tax:number

}

export const  ShowPrices:FC<Props> = ({ price, total, discount, tax })=> {
    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const formatDouble = new Intl.NumberFormat('en-DE')

    const ChickInProvider = (e:boolean)=>{
        setIsOpenPopover(e);
    }

  return (
    <div className="cursor-pointer">
           <Popover onOpenChange={(e)=>ChickInProvider(e)}  showArrow={true}  placement="bottom">
      <PopoverTrigger>
        <div className="flex items-center">
        <p className="mr-10 text-default-500">Precio:</p>
        <p>$ {formatDouble.format(price)}</p>
        <div className="ml-2 ">
            {(isOpenPopover)?<IoIosArrowBack size={15} />:<IoIosArrowDown size={15}/>}
        </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
      <div className="flex p-2 ">
            <div className=" text-default-500">
              <p className="">Descuento: </p>
              <p className="">Impuesto: </p>
              <p className="">Total: </p>
            </div>
            <div className="flex flex-col items-end w-[150px]">
              <span> $ {formatDouble.format(discount)}</span>
              <span> $ {formatDouble.format(tax)}</span>
              <span> $ {formatDouble.format(total)}</span>
            </div>
          </div>
      </PopoverContent>
    </Popover>
    </div>
  );
}