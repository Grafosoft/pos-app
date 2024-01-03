import { type FC } from 'react'

import { NavBar } from '@/components/navbar/NavBar'
import { Products } from '@/components/products/Products'
import { ShoppingCart } from '@/components/shopping/ShoppingCart'
import { type EstructureColor } from '@/utils/validateAppColor'

interface Props {
  name: string
  color: EstructureColor
}

export const SaleView: FC<Props> = ({ name, color }) => {
  return (
    <>
      <NavBar name={name} color={color} />
      <div
        className="grid grid-cols-12"
        style={{ minHeight: 'calc(100vh - 128px)' }}
      >
        <div
          className="col-span-5 md:col-span-5 lg:col-span-7 p-5 pb-0 "
          style={{ minHeight: 'calc(100vh - 128px)' }}
        >
          <Products />
        </div>
        <div
          className="col-span-7 md:col-span-7 lg:col-span-5 bg-white dark:border-slate-800 dark:bg-black border-l"
          style={{ minHeight: 'calc(100vh - 128px)' }}
        >
          <ShoppingCart />
        </div>
      </div>
    </>
  )
}