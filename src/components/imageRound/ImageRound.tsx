import Image from 'next/image'
import React, { useContext, type FC } from 'react'

import { UrlContext } from '@/pages/[nameApp]'
import { TbShoppingBag } from 'react-icons/tb'
import { MdTableBar, MdTableRestaurant } from 'react-icons/md'
import { type EstructureColor } from '@/utils/validateAppColor'
import { GiRoundTable, GiTabletopPlayers } from 'react-icons/gi'

interface Props {
  image: string | null
  name: string
  colorIcon?: EstructureColor
  iconIndex?: number
  formeRound?: boolean
}

export const ImageRound: FC<Props> = ({
  image,
  name = 'product',
  colorIcon = {},
  iconIndex = 0,
  formeRound = false
}) => {
  // import Context UrlContext
  const { color } = useContext(UrlContext)

  let icono = <TbShoppingBag size={50} color={color.colorApp} />

  switch (name) {
    case 'product':
      icono = <TbShoppingBag size={50} color={color.colorApp} />
      break
    case 'table':
      icono = <MdTableBar size={50} color={colorIcon.colorApp} />
      break
  }

  const icons = [
    {
      item: <MdTableBar size={50} color={colorIcon.colorApp} />
    },
    {
      item: <GiTabletopPlayers size={50} color={colorIcon.colorApp} />
    },
    {
      item: <GiRoundTable size={50} color={colorIcon.colorApp} />
    },
    {
      item: <MdTableRestaurant size={50} color={colorIcon.colorApp} />
    }
  ]

  console.log(icons[iconIndex])
  return (
    <>
      {image && image.length > 3 ? (
        <div
          className={`flex items-center rounded-full ${
            formeRound ? 'rounded-full' : 'rounded-[20px]'
          }`}
        >
          <Image
            alt="Card background"
            className="object-cover rounded-[20px] w-[100px] h-[100px] "
            src={image}
            width={270}
            height={270}
          />
        </div>
      ) : (
        <div className="">
          <div
            className={`flex items-center justify-center w-[100px] h-[100px] ${
              formeRound ? 'rounded-full' : 'rounded-[20px]'
            }`}
            style={{
              backgroundColor: `${
                colorIcon?.colorApp
                  ? colorIcon?.colorProduct
                  : color.colorProduct
              }`
            }}
          >
            {iconIndex ? icons[iconIndex].item : icono}
          </div>
        </div>
      )}
    </>
  )
}
