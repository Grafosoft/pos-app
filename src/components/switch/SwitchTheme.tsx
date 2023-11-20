import { Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { type FC, useEffect, useState } from 'react'
import { TbMoonFilled, TbSunFilled } from 'react-icons/tb'

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
    <Switch
      isSelected={isActiveTheme}
      onChange={handleChange}
      size="md"
      color="secondary"
      endContent={<TbSunFilled />}
      startContent={<TbMoonFilled />}
    />
  )
}
