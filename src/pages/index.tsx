import { Products } from '@/components/products/Products'
import { ShoppingCart } from '@/components/shopping/ShoppingCart'

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 h-[86vh]">
        <div className=" col-span-7 h-[86vh] p-4 ">
          <Products />
        </div>
        <div className=" col-span-5  min-h-[86vh] bg-white border-l">
          <ShoppingCart />
        </div>
      </div>
    </>
  )
}
