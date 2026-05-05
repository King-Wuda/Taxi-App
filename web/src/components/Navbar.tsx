'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Search Routes' },
  { href: '/ranks', label: 'Rank Directory' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-green-700">
          <MapPin className="h-5 w-5" />
          TaxiRoute SA
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === href ? 'text-green-700' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="text-sm font-medium bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'text-sm font-medium py-1',
                pathname === href ? 'text-green-700' : 'text-gray-600'
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            onClick={() => setOpen(false)}
            className="text-sm font-medium bg-green-700 text-white px-4 py-2 rounded-lg text-center"
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  )
}
