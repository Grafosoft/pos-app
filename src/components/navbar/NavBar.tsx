import { Image, Link, Spacer, User } from '@nextui-org/react'
import { type FC } from 'react'
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

import { type EstructureColor } from '@/utils/validateAppColor'
import { useRouter } from 'next/router'

interface Props {
  name: string
  color: EstructureColor
}

export const NavBar: FC<Props> = ({ name, color }) => {
  const { push } = useRouter()

  return (
    <>
      <div
        className={`max-h-16 flex w-full text-[#7828C] p-5 justify-between`}
        style={{ background: `${color.colorApp}` }}
      >
        <div className="flex items-center">
          <Image src={`/images/${name}.png`} width={50} alt="Cuental Logo" />
          <Spacer x={5} />
          <h1 className="text-2xl font-medium text-white">
            {name.toUpperCase()} POS
          </h1>
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
          <Link
            //href={`http://localhost:3000/${name}?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`}
            onClick={() => push(`/${name}?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`)}
            className="text-[#A4B0BE] ml-1"
          >
            Venta sencilla
          </Link>
          <Spacer x={10} />
          <TbTagStarred size={20} style={{ color: '#A4B0BE' }} />
          <Link
            onClick={() => push(`/${name}/mesas?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`)}
            //href={`http://localhost:3000/${name}/mesas?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`}
            className="text-[#A4B0BE] ml-1"
          >
            Venta por mesa
          </Link>
          <Spacer x={10} />
          <TbUserDollar size={20} style={{ color: '#A4B0BE' }} />
          <Link className="text-[#A4B0BE] ml-1"
            onClick={() => push(`/${name}?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`)}
          >Venta por cliente</Link>
          <Spacer x={10} />
          <TbInbox size={20} style={{ color: '#A4B0BE' }} />
          <Link className="text-[#A4B0BE] ml-1"
            onClick={() => push(`/${name}?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27`)}>Informes</Link>
        </div>
        <User name="Fredy Rangel" description="fredyrangelcba@hotmail.com" />
      </div>
    </>
  )
}
