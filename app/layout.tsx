import { Nunito } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'


const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'SAI - Sistema de alugueis de imóveis',
  description: 'SAI',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="pt">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal/>
          <RegisterModal/>
          <RentModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
        {children}
        </div>
        
        </body>
    </html>
  )
}
