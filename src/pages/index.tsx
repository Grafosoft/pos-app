import { NavBar } from '@/components/navbar/NavBar'

export default function Home() {
  return (
    <NavBar
      color={{
        colorApp: 'rgba(60,63,153,1)',
        colorProduct: 'rgb(243, 232, 255)',
        colorComponent: 'primary'
      }}
      name={'cuental'}
    />
  )
}
