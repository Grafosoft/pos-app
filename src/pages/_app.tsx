import '@/styles/globals.css'
import React, { type FC } from 'react'
import { type AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class">
        <div className="bg-[#F5F6FA] w-full dark:bg-inherit">
          <Component {...pageProps} />
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default MyApp
