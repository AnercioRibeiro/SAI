import { Nunito } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modal/Modal'

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
        
          <Modal actionLabel='Entrar' title="Entrar" isOpen/>
          <Navbar/>
        
        {children}
        </body>
    </html>
  )
}
