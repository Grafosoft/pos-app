import { FC, useState, useEffect } from 'react';
import { Button, Image, Input, Skeleton } from '@nextui-org/react';
import { TbSearch } from "react-icons/tb";

import { CardProduct } from './CardProduct';
import cuentalApi from '@/api/cuentalApi';
import { interfaceProduct } from '@/interface/products';


export const Products: FC = () => {
  const [buscadorActivo, setBuscadorActivo] = useState(0);
  const [valueSearch, setValueSearch] = useState("");
  const [datosProductos, setdatosProductos] = useState<interfaceProduct[]>([]);

  const formatDouble = new Intl.NumberFormat('en-DE');

  useEffect(() => {
    const peticionProductos = async () => {
      let { data } = await cuentalApi.get<interfaceProduct[]>("items/?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&name=");
      setdatosProductos(data);
    }

    const buscarProducto = async () => {
      let { data } = await cuentalApi.get<interfaceProduct[]>(`items/?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&name=${valueSearch}`);
      setdatosProductos(data);
    }

    if (valueSearch.length === 0) {
      peticionProductos();
      setBuscadorActivo(0)
    } else {
      buscarProducto();
      setBuscadorActivo(1)
    }
  }, [valueSearch]);


  return (
    <div className=''>
      <div className='flex justify-start w-full mb-3 rounted-lg'> {/* // div que contiene el input del buscador */}
        <Input
          className='w-[30vh] md:w-[58vh] lg:w-[88vh] 2xl:w-[117vh]'
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
      <div className="flex justify-start"> {/* // contenedor de las cards de los productos */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5 p-3 overflow-auto  max-h-[78vh] '>
          {(datosProductos.length <= 0) ?
            (
              (buscadorActivo) ?
                <div className="flex flex-col items-center w-[30vh] md:w-[58vh] lg:w-[70vh] lg:ml-20 2xl:w-[75vh]   ">
                  <Image className="w-3/4 m-8 md:ml-16 lg:ml-20 2xl:ml-52" src="/images/No-data-rafiki.png" alt="Data Not Found" />
                  <h1 className="uppercase 2xl:ml-52 text-neutral-400 md:text-3xl text-xl font-mono  ">Producto no Encontrado</h1>
                </div>
                :
                <Skeleton className="rounded-xl w-[100vh] ml-10" />
            )
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

    </div>


  )
}