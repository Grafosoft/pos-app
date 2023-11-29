import React, { type FC } from 'react'

interface Props {
  name: string
}

export const ImageRound: FC<Props> = ({ name }) => {
  return (
    <div className="pt-5">
      <div className="flex items-center justify-center bg-purple-100 rounded-full w-[100px] h-[100px] mb-0 ">
        <span className="text-3xl uppercase dark:text-black ">
          {name.substring(0, 3).replace(/\s+/g, '')}
        </span>
      </div>
    </div>
  )
}
