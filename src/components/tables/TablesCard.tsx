import { type FC, useContext } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
// import { MdTableBar } from 'react-icons/md'
import type { Tables } from './TablesContainer'
import { ImageRound } from '../imageRound/ImageRound'
import { UrlContext } from '@/context/UrlContext'

interface Props {
  tableElement: Tables
}

export const TablesCard: FC<Props> = ({ tableElement }) => {
  const { color } = useContext(UrlContext)
  const validateObject =
    tableElement.metadata !== '' ? JSON.parse(tableElement.metadata) : {}

  return (
    <div className="flex justify-center  h-[28vh] lg:h-[25vh] w-[27vh]">
      <Card
        className={`p-1 w-[25vh] ${
          tableElement.id !== 0 ? 'shadow-sm' : 'shadow-md'
        }`}
        isPressable
      >
        <CardHeader className="p-0 flex-col items-center">
          <div className="flex flex-col mt-7">
            <p className=" uppercase text-center font-medium text-md mb-1 ">
              {tableElement.name.length !== 0 ? tableElement.name : 'Titulo'}
            </p>
          </div>
        </CardHeader>
        <CardBody className="px-5 py-0 flex overflow-visible items-center  mt-2 space-y-7 ">
          <div className="mt-3">
            <ImageRound
              image={''}
              colorIcon={
                Object.keys(validateObject).length === 0
                  ? color
                  : validateObject
              }
              iconIndex={
                validateObject.iconIndex !== undefined
                  ? validateObject.iconIndex
                  : undefined
              }
              name={'table'}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
