import { AuthForm } from '@/components/AuthForm'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-green-700 font-bold text-xl mb-4">
            <MapPin className="h-5 w-5" />
            TaxiRoute SA
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Save your favourite routes and get updates
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <AuthForm />
        </div>
      </div>
    </div>
  )
}
