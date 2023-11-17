import React, { type FC } from 'react'
import { type AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
