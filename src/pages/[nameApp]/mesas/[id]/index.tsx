import { useState } from 'react'
import { SaleView } from '@/components/saleView/SaleView'
import { type GetServerSideProps } from 'next'
import { validateAppApi } from '@/api/validateAppApi'
import {
  type EstructureColor,
  validateAppColor
} from '@/utils/validateAppColor'
import { type AxiosInstance } from 'axios'
import { type ProductList } from '@/interface/products'
import { ProductContext } from '@/context/ProductContext'
import { UrlContext } from '@/context/UrlContext'
import { type Tables } from '@/components/tables/TablesContainer'

export interface VariablesTable {
  companyId: string
  apikey: string
  name: string
  functionApi: AxiosInstance
  color: EstructureColor
  tableData: Tables
}

interface Props {
  PropsServer: VariablesTable
}

export default function TableSpecific({ PropsServer }: Props) {
  const { companyId, apikey, name, tableData } = PropsServer
  // let dataJson = JSON.parse(tableData?.data)F
  const idTable = tableData.id
  console.log(idTable)
  const metadataTable = JSON.parse(tableData.metadata)

  // console.log(dataJson)
  const [productList, setProductList] = useState<ProductList[]>(
    metadataTable.items !== undefined
      ? metadataTable.items.length === 0
        ? []
        : metadataTable.items
      : []
  )

  // FUNCTION VALIDATE APPCOLOR AND VALIDATE APP-API
  const functionApi = validateAppApi(name)
  const color = validateAppColor(name)

  return (
    <UrlContext.Provider
      value={{ companyId, apikey, functionApi, color, name, idTable }}
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
  const companyId = query.companyId?.toString()
  const apikey = query.apikey?.toString()
  const id = params?.id?.toString()

  const functionApi = validateAppApi(
    params?.nameApp?.toString() ? params?.nameApp?.toString() : ''
  )
  const { data } = await functionApi.get(
    `pos-categories/${id}?companyId=${companyId}&apikey=${apikey}`
  )
  console.log(data)

  const PropsServer = {
    companyId: query.companyId,
    apikey: query.apikey,
    name: params?.nameApp,
    tableData: data
  }

  return {
    props: { PropsServer }
  }
}