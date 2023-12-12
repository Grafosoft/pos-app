import { Image, Spacer, User } from '@nextui-org/react'
import { useContext, type FC } from 'react'
import { SwitchTheme } from '../switch/SwitchTheme'
import {
  TbBellFilled,
  TbHelpSquareRoundedFilled,
  TbInbox,
  TbLogout,
  TbSettingsFilled,
  TbTag,
  TbTagStarred,
  TbUserDollar
} from 'react-icons/tb'
import { UrlContext } from '@/pages/[nameApp]'

export const NavBar: FC = () => {

  // import Context UrlContext
  const { name, color} = useContext(UrlContext);

  return (
    <>
      <div className={`max-h-16 flex w-full text-[#7828C] p-5 justify-between`} style={{background:`${color.colorApp}`}}>
        <div className="flex items-center">
          <Image src={`/images/${name}.png`} width={50} alt="Cuental Logo" />
          <Spacer x={5} />
          <h1 className="text-2xl font-medium text-white">{name.toUpperCase()} POS</h1>
        </div>
        <div className="flex items-center">
          <SwitchTheme color={color.colorApp} />
          <TbBellFilled
            size={25}
            className="cursor-pointer mx-3"
            style={{ color: 'white' }}
          />
          <TbHelpSquareRoundedFilled
            size={25}
            className="cursor-pointer mx-3"
            style={{ color: 'white' }}
          />
          <TbSettingsFilled
            size={25}
            className="cursor-pointer mx-3"
            style={{ color: 'white' }}
          />
          <Spacer x={5} />
          <TbLogout size={25} className="cursor-pointer text-[#f31260]" />
        </div>
      </div>
      <div className="max-h-16 flex w-full p-5 bg-white dark:bg-inherit justify-between border-b dark:border-slate-800">
        <div className="flex items-center cursor-pointer">
          <TbTag size={20} style={{ color: '#A4B0BE' }} />
          <p className="text-[#A4B0BE] ml-1">Venta sencilla</p>
          <Spacer x={10} />
          <TbTagStarred size={20} style={{ color: '#A4B0BE' }} />
          <p className="text-[#A4B0BE] ml-1">Venta por mesa</p>
          <Spacer x={10} />
          <TbUserDollar size={20} style={{ color: '#A4B0BE' }} />
          <p className="text-[#A4B0BE] ml-1">Venta por cliente</p>
          <Spacer x={10} />
          <TbInbox size={20} style={{ color: '#A4B0BE' }} />
          <p className="text-[#A4B0BE] ml-1">Informes</p>
        </div>
        <User name="Fredy Rangel" description="fredyrangelcba@hotmail.com" />
      </div>
    </>
  )
}
