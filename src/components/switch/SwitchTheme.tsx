import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { type FC, useEffect, useState } from 'react'
import { TbSunHigh, TbMoonFilled } from 'react-icons/tb'

export const SwitchTheme: FC = () => {
  const { theme, setTheme } = useTheme()
  const [isActiveTheme, setIsActiveTheme] = useState(false)

  useEffect(() => {
    setIsActiveTheme(localStorage.getItem('isActiveTheme') !== 'false')
  }, [])

  const handleChange = () => {
    if (theme === 'dark') {
      setTheme('light')
      setIsActiveTheme(false)
      localStorage.setItem('isActiveTheme', 'false')
    } else {
      setTheme('dark')
      setIsActiveTheme(true)
      localStorage.setItem('isActiveTheme', 'true')
    }
  }

  return (
    <Button
      className='bg-[#3C3F99]'
      size="sm"
      onClick={handleChange}
      isIconOnly
      disableAnimation>
      {(isActiveTheme) ?
        <TbSunHigh size={25} />
        :
        <TbMoonFilled size={25} color='white' />}
    </Button>
  )
}
