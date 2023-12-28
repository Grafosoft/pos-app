import { type ProductList } from '@/interface/products'
import type { GetServerSideProps } from 'next'
import { validateAppColor } from '@/utils/validateAppColor'

import { useState } from 'react'
import { validateAppApi } from '@/api/validateAppApi'
import { SaleView } from '@/components/saleView/SaleView'
import { ProductContext } from '@/context/ProductContext'
import { UrlContext, type VariablesUrl } from '@/context/UrlContext'

interface Props {
  PropsServer: VariablesUrl
}

export default function Home({ PropsServer }: Props) {
  const { companyId, apikey, name } = PropsServer
  const [productList, setProductList] = useState<ProductList[]>([])

  // FUNCTION VALIDATE APPCOLOR AND VALIDATE APP-API
  const functionApi = validateAppApi(name)
  const color = validateAppColor(name)

  return (
    <UrlContext.Provider
      value={{ companyId, apikey, functionApi, color, name }}
    >
      <ProductContext.Provider value={{ productList, setProductList }}>
        <SaleView name={name} color={color} />
      </ProductContext.Provider>
    </UrlContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const params = ctx.params
  const query = ctx.query

  const PropsServer = {
    companyId: query.companyId,
    apikey: query.apikey,
    name: params?.nameApp
  }

  return {
    props: { PropsServer }
  }
}
