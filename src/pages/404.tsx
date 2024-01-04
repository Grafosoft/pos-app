import { NavBar } from '@/components/navbar/NavBar'
import {
  type EstructureColor,
  validateAppColor
} from '@/utils/validateAppColor'
import { Button, Image, Spacer } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TbArrowBigLeftFilled } from 'react-icons/tb'

interface ColorObject404 {
  name: string
  color: EstructureColor
}

export default function FourOhFour() {
  const [color404, getColor404] = useState<ColorObject404>({
    name: '',
    color: {
      colorApp: 'rgba(60,63,153,1)',
      colorProduct: 'rgb(243, 232, 255)',
      colorComponent: 'primary'
    }
  })

  const { back } = useRouter()
  useEffect(() => {
    const name = window.location.href.split('/')[3]
    const color = validateAppColor(name)
    getColor404({ name, color })
  }, [])

  return (
    <>
      <NavBar
        name={color404.name ?? 'cuental'}
        color={
          color404.color ?? {
            colorApp: 'rgba(60,63,153,1)',
            colorProduct: 'rgb(243, 232, 255)',
            colorComponent: 'primary'
          }
        }
      />
      <div
        className="container grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{
          minHeight: 'calc(100vh - 128px)',
          maxHeight: '100vh',
          margin: 'auto'
        }}
      >
        <div className="col-span-1">
          <Image src="/images/404.svg" alt="404 Not Found" width={'100%'} />
        </div>
        <div className="col-span-1" style={{ paddingLeft: '50px' }}>
          <h1
            className="font-black"
            style={{
              fontSize: '100px',
              letterSpacing: '5px',
              width: '200px',
              color: '#7828C8'
            }}
          >
            OOPS!
          </h1>
          <h3
            className="text-2xl font-bold"
            style={{ textTransform: 'uppercase' }}
          >
            Parece que te has perdido
          </h3>
          <Spacer y={5} />
          <Button
            size="lg"
            variant="flat"
            onPress={() => {
              back()
            }}
            color="secondary"
            startContent={<TbArrowBigLeftFilled />}
          >
            <p className="px-12 pl-11">Volver</p>
          </Button>
        </div>
      </div>
    </>
  )
}
