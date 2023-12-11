import Image from 'next/image'
import React, { useContext, type FC } from 'react'

import { UrlContext } from '@/pages/[nameApp]'
import { TbShoppingBag } from 'react-icons/tb'

interface Props {
  image: string | null
  name: string
  formeRound?: boolean
}

export const ImageRound: FC<Props> = ({ image, name, formeRound = false }) => {
  // import Context UrlContext
  const { validateAppColor } = useContext(UrlContext);

  return (
    <>
      {image && image.length > 3 ? (
        <div
          className={`flex items-center rounded-full ${formeRound ? 'rounded-full' : 'rounded-[20px]'
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
            className={`flex items-center justify-center ${validateAppColor.colorProduct} w-[100px] h-[100px] ${formeRound ? 'rounded-full' : 'rounded-[20px]'
              }`}
          >
            <TbShoppingBag size={50} color={validateAppColor.colorApp} />
          </div>
        </div>
      )}
    </>
  )
}
