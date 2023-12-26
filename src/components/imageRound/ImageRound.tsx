import Image from 'next/image'
import React, { useContext, type FC } from 'react'

import { UrlContext } from '@/pages/[nameApp]'
import { TbShoppingBag } from 'react-icons/tb'
import { MdTableBar } from 'react-icons/md'
import { type EstructureColor } from '@/utils/validateAppColor'

interface Props {
  image: string | null
  name: string
  colorIcon?: EstructureColor
  formeRound?: boolean
}

export const ImageRound: FC<Props> = ({
  image,
  name = 'product',
  colorIcon = {},
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
            className={`flex items-center justify-center ${
              colorIcon.colorApp ? colorIcon.colorProduct : color.colorProduct
            } w-[100px] h-[100px] ${
              formeRound ? 'rounded-full' : 'rounded-[20px]'
            }`}
          >
            {icono}
          </div>
        </div>
      )}
    </>
  )
}
