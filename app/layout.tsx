import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Check Host Net - Cek Status Website Global',
  description: 'Cek status website dari 9 lokasi global sekaligus. Ketahui apakah website-mu bisa diakses dari seluruh dunia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
      }
