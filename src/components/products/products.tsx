import { FC, useState, useEffect } from 'react';
import { Button, Input, Skeleton } from '@nextui-org/react';
import { TbSearch } from "react-icons/tb";

import { CardProduct } from './CardProduct';
import cuentalApi from '@/api/cuentalApi';
import { interfaceProduct } from '@/interface/products';


export const Products: FC = () => {
  const [valueSearch, setValueSearch] = useState("");
  const [datosProductos, setdatosProductos] = useState<interfaceProduct[]>([]);

  const formatDouble = new Intl.NumberFormat('en-DE');

  useEffect(() => {
    const peticionProductos = async () => {
      let {data} = await cuentalApi.get<interfaceProduct>("items/?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&name=");
      setdatosProductos(data as never);

    }
    peticionProductos();
  }, [])



  return (
    <div className=''>
      <div className='w-full mb-3 rounted-lg'> {/* // div que contiene el input del buscador */}
        <Input
          className=''
          type="search"
          size="sm"
          variant='bordered'
          placeholder='Buscar producto'
          onValueChange={setValueSearch}
          endContent={<Button
            className='bg-inherit'
            size='sm'
            disableAnimation ><TbSearch size={22} />
          </Button>}
        />
      </div>
      <div className='grid sm:grid-cols-2 lg:sm:grid-cols-3 grid-cols-1 gap-5 p-3  overflow-auto h-[78vh]  '> {/* // contenedor de las cards de los productos */}
        {(datosProductos.length <= 0) ?
          <Skeleton className="rounded-xl w-[100vh] ml-10 " />
          :
          datosProductos.map((element, index) => {
            return (
              <CardProduct
                key={index}
                nombreProducto={element.name}
                precioProducto={formatDouble.format(element.salePrice)}
                categoriaProducto={element.group.name}
                imgProducto={element.image}
              />
            )
          })
        }

      </div>
    </div>


  )
}