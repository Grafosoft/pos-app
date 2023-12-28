import {
  type FC,
  useState,
  useEffect,
  useContext,
  type FormEvent,
  useRef
} from 'react'
import { Button, Image, Input } from '@nextui-org/react'

import { type interfaceProduct } from '@/interface/products'
import { CardProduct } from './CardProduct'

import { addProductCart } from '@/utils/addProductCart'
import { TbSearch } from 'react-icons/tb'
import { ProductContext } from '@/context/ProductContext'
import { UrlContext } from '@/context/UrlContext'

export const Products: FC = () => {
  // import Context UrlContext
  const { companyId, apikey, functionApi, color } = useContext(UrlContext)
  const { productList, setProductList } = useContext(ProductContext)

  // Product Search
  const [valueSearch, setValueSearch] = useState('')
  const [datosProductos, setdatosProductos] = useState<interfaceProduct[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const peticionProductos = async () => {
      const { data } = await functionApi.get<interfaceProduct[]>(
        `items/?companyId=${companyId}&page=0&apikey=${apikey}&name=`
      )
      if (valueSearch.length < 1) {
        setdatosProductos(data)
      }
    }

    peticionProductos()
  }, [apikey, companyId, functionApi, valueSearch])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const buscarProducto = async () => {
      const { data } = await functionApi.get<interfaceProduct[]>(
        `items/?companyId=${companyId}&page=0&apikey=${apikey}&name=${valueSearch}`
      )

      if (data.length === 1) {
        setValueSearch('')
        addProductCart(productList, setProductList, data[0])
      }

      setdatosProductos(data)
    }

    buscarProducto()
    inputRef.current?.focus()
  }
  
  // Extrac Width Actualiti
  const [width, getwidth] = useState(0)
  useEffect(() => {
    const validateWidth = window.innerWidth
    getwidth(validateWidth)
    console.log(productList);
    
  }, [productList])

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center w-full mb-3 rounted-lg">
          {/* // div que contiene el input del buscador */}
          <Input
            className="w-[30vh] md:w-[58vh] lg:w-[88vh] 2xl:w-[117vh]"
            type="search"
            ref={inputRef}
            size="sm"
            variant="bordered"
            autoFocus
            value={valueSearch}
            placeholder="Buscar producto"
            onValueChange={setValueSearch}
          />
          <Button
            style={{ backgroundColor: color.colorApp }}
            size="lg"
            className="ml-5"
            disableAnimation
            type="submit"
          >
            <TbSearch color="white" style={{ strokeWidth: '3' }} size={20} />
          </Button>
        </div>
      </form>
      <div className="flex justify-center">
        {/* // contenedor de las cards de los productos */}
        <div
          className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-2 lg:gap-5 p-3 overflow-auto"
          style={{
            maxHeight:
              width < 1230 ? 'calc(100vh - 165px)' : 'calc(100vh - 215px)'
          }}
        >
          {datosProductos.length <= 0 ? (
            <div className="flex flex-col items-center w-[30vh] md:w-[58vh] lg:w-[70vh] lg:ml-20 2xl:w-[75vh]">
              <Image
                className="w-3/4 m-8 md:ml-16 lg:ml-20 2xl:ml-52"
                src="/images/empty-products.png"
                alt="Data Not Found"
              />
              <h1 className="uppercase 2xl:ml-52 text-neutral-400 md:text-3xl text-xl font-mono  ">
                Producto no Encontrado
              </h1>
            </div>
          ) : (
            datosProductos.map((element, index) => {
              return <CardProduct key={index} product={element} />
            })
          )}
        </div>
      </div>
    </div>
  )
}
