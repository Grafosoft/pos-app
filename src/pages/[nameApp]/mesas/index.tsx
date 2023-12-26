import { validateAppApi } from '@/api/validateAppApi'
import { NavBar } from '@/components/navbar/NavBar'
import type { GetServerSideProps } from 'next'
import {
  type Tables,
  TablesContainer
} from '../../../components/tables/TablesContainer'
import { validateAppColor } from '@/utils/validateAppColor'
import axios from 'axios'
import { createContext } from 'react'
import { type VariablesUrl } from '../index'

interface PropsServer {
  companyId: string
  apikey: string
  name: string
  data: Tables[]
}

interface Props {
  PropsServer: PropsServer
}

export const UrlContext = createContext<VariablesUrl>({
  companyId: '',
  apikey: '',
  name: '',
  functionApi: axios.create({}),
  color: {
    colorApp: '',
    colorProduct: '',
    colorComponent: 'primary'
  }
})

export default function ShowTables({ PropsServer }: Props) {
  const { companyId, apikey, name, data } = PropsServer

  const functionApi = validateAppApi(name)
  const color = validateAppColor(name)

  return (
    <UrlContext.Provider
      value={{ companyId, apikey, functionApi, color, name }}
    >
      <NavBar name={name} color={color} />
      <div
        className="grid grid-cols-12"
        style={{ minHeight: 'calc(100vh - 128px)' }}
      >
        <TablesContainer tables={data} />
      </div>
    </UrlContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const params = ctx.params
  const query = ctx.query

  const functionApi = validateAppApi('cuental')
  const { data } = await functionApi.get(
    `pos-categories?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`
  )
  const PropsServer = {
    companyId: query.companyId,
    apikey: query.apikey,
    name: params?.nameApp,
    data
  }

  return {
    props: { PropsServer }
  }
}
