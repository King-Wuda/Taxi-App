import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaxiRoute SA — Find Your Route',
  description: 'Search minibus taxi routes, ranks, and fares across South Africa.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>TaxiRoute SA — MVP pilot. Fares are approximate and sourced from community reports.</p>
            <p className="mt-1">Always confirm with your driver before boarding.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
