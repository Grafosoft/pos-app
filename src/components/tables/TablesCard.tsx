import { type FC, useContext, type Dispatch, type SetStateAction } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
// import { MdTableBar } from 'react-icons/md'
import type { Tables } from './TablesContainer'
import { ImageRound } from '../imageRound/ImageRound'
import { UrlContext } from '@/context/UrlContext'
import { useRouter } from 'next/router'
import { ConvertRGBtoHex } from '@/utils/hexadeToRgb'
import { IoMdMore } from 'react-icons/io'

interface Props {
  tableElement: Tables
  onOpen?: () => void
  setSelectIconIndex?: Dispatch<SetStateAction<string>>
  setNewColorInput?: Dispatch<SetStateAction<string>>
  setNameInputView?: Dispatch<SetStateAction<string>>
  getIdTable?: Dispatch<SetStateAction<number>>
}

export const TablesCard: FC<Props> = ({
  tableElement,
  onOpen,
  setNameInputView,
  setNewColorInput,
  setSelectIconIndex,
  getIdTable
}) => {
  const { color, apikey, name, companyId } = useContext(UrlContext)
  const validateObject =
    tableElement.metadata !== '' ? JSON.parse(tableElement.metadata) : {}
  const { push } = useRouter()

  const handlePressCardTable = (idTable: number) => {
    push(`/${name}/mesas/${idTable}?companyId=${companyId}&apikey=${apikey}`)
    return ''
  }

  const openModalEditTable = () => {
    if (
      onOpen &&
      setSelectIconIndex &&
      setNewColorInput &&
      setNameInputView &&
      getIdTable
    ) {
      getIdTable(tableElement.id)
      setNameInputView(tableElement.name)
      setNewColorInput(ConvertRGBtoHex(validateObject.colorApp))
      setSelectIconIndex(validateObject.iconIndex.toString())
      onOpen()
    }
    return ''
  }

  return (
    <div className="flex justify-center h-[25vh] w-[32vh]">
      {tableElement.id === 0 ? (
        ''
      ) : (
        <div className="absolute z-50 ml-[155px] lg:ml-44 xl:ml-48">
          <button className="w-8 h-10" onClick={openModalEditTable}>
            <IoMdMore size={22} color={color.colorApp} />
          </button>
        </div>
      )}
      <Card
        onPress={
          tableElement.id !== 0
            ? () => handlePressCardTable(tableElement.id)
            : () => {}
        }
        className={`p-1 w-[25vh] ${
          tableElement.id !== 0 ? 'shadow-sm' : 'shadow-md'
        }`}
        isPressable
      >
        <CardHeader className="p-0 flex-col items-center static">
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
