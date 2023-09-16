import { Nunito } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'

const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'SAI - Sistema de alugueis de imóveis',
  description: 'SAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal/>
          <RegisterModal/>
          <Navbar/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
        {children}
        </div>
        
        </body>
    </html>
  )
}
