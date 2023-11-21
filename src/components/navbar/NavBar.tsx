import { Divider, Image, Spacer, User } from '@nextui-org/react'
import { type FC } from 'react'
import { SwitchTheme } from '../switch/SwitchTheme'
import {
  TbBellFilled,
  TbHelpSquareRoundedFilled,
  TbSettingsFilled
} from 'react-icons/tb'

export const NavBar: FC = () => {
  return (
    <div className="flex w-full p-5 justify-between">
      <div className="flex items-center">
        <Image src="/images/cuental.png" width={50} alt="Cuental Logo" />
        <Spacer x={5} />
        <h1 className="text-2xl font-medium">CUENTAL POS</h1>
      </div>
      <div className="flex items-center">
        <SwitchTheme />
        <TbBellFilled
          size={25}
          className="cursor-pointer mx-3"
          style={{ color: '#A4B0BE' }}
        />
        <TbHelpSquareRoundedFilled
          size={25}
          className="cursor-pointer mx-3"
          style={{ color: '#A4B0BE' }}
        />
        <TbSettingsFilled
          size={25}
          className="cursor-pointer mx-3"
          style={{ color: '#A4B0BE' }}
        />
        <Divider orientation="vertical" />
        <User
          className="ml-3"
          name="Fredy Rangel"
          description="fredyrangelcba@hotmail.com"
        />
      </div>
    </div>
  )
}
