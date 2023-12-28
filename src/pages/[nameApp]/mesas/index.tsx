import { validateAppApi } from '@/api/validateAppApi'
import { NavBar } from '@/components/navbar/NavBar'
import type { GetServerSideProps } from 'next'
import {
  type Tables,
  TablesContainer
} from '../../../components/tables/TablesContainer'
import { validateAppColor } from '@/utils/validateAppColor'
import { UrlContext } from '@/context/UrlContext'

interface PropsServer {
  companyId: string
  apikey: string
  name: string
  data: Tables[]
}

interface Props {
  PropsServer: PropsServer
}

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
  const companyId = query.companyId?.toString()
  const apikey = query.apikey?.toString()

  const functionApi = validateAppApi(
    params?.nameApp?.toString() ? params?.nameApp?.toString() : ''
  )
  const { data } = await functionApi.get(
    `pos-categories?companyId=${companyId}&apikey=${apikey}`
  )
  const dataReverse = data.reverse()
  const PropsServer = {
    companyId: query.companyId,
    apikey: query.apikey,
    name: params?.nameApp,
    data: dataReverse
  }

  return {
    props: { PropsServer }
  }
}
