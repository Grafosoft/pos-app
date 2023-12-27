import { type FC, useContext } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
// import { MdTableBar } from 'react-icons/md'
import type { Tables } from './TablesContainer'
import { ImageRound } from '../imageRound/ImageRound'
import { UrlContext } from '@/pages/[nameApp]/mesas'

interface Props {
  tableElement: Tables
}

export const TablesCard: FC<Props> = ({ tableElement }) => {
  const { color } = useContext(UrlContext)

  return (
    <div className="flex justify-center  h-[28vh] lg:h-[25vh] w-[27vh]">
      <Card
        className="p-1 w-[27vh] shadow-sm"
        isPressable
        // onPress={handleSaveProduct}
      >
        <CardHeader className="p-0 flex-col items-center">
          <div className="mt-5">
            <ImageRound image={''} colorIcon={color} name={'table'} />
          </div>
        </CardHeader>
        <CardBody className="px-5 py-0 flex overflow-visible items-center mt-5  space-y-7 ">
          <div className="flex flex-col mt-5">
            <p className=" uppercase text-center font-medium text-md mb-1 ">
              {tableElement.name}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
