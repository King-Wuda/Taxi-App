'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Phone, ArrowRight, Loader2 } from 'lucide-react'

type Step = 'method' | 'phone-number' | 'phone-otp' | 'done'

export function AuthForm() {
  const [step, setStep] = useState<Step>('method')
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const supabase = createClient()

  async function handleGoogleSignIn() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    }
    // On success the browser redirects — no further action needed
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const normalised = phone.trim().replace(/\s+/g, '')
    const e164 = normalised.startsWith('+') ? normalised : `+27${normalised.replace(/^0/, '')}`

    const { error } = await supabase.auth.signInWithOtp({ phone: e164 })
    setLoading(false)
    if (error) {
      setErrorMsg(error.message)
    } else {
      setPhone(e164)
      setStep('phone-otp')
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp.trim(),
      type: 'sms',
    })
    setLoading(false)
    if (error) {
      setErrorMsg(error.message)
    } else {
      setStep('done')
      window.location.href = '/'
    }
  }

  if (step === 'done') {
    return (
      <div className="text-center py-4">
        <p className="text-green-700 font-semibold">Signed in successfully!</p>
        <p className="text-gray-500 text-sm mt-1">Redirecting you…</p>
      </div>
    )
  }

  if (step === 'phone-otp') {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Enter the 6-digit code sent to <strong>{phone}</strong>
          </p>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Verification code
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg tracking-widest text-center"
          />
        </div>
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>Verify <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
        <button
          type="button"
          onClick={() => setStep('phone-number')}
          className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
        >
          Use a different number
        </button>
      </form>
    )
  }

  if (step === 'phone-number') {
    return (
      <form onSubmit={handleSendOtp} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Mobile number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0821234567 or +27821234567"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-gray-400 mt-1">We will send a one-time code via SMS</p>
        </div>
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>Send code <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
        <button
          type="button"
          onClick={() => setStep('method')}
          className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
        >
          Back
        </button>
      </form>
    )
  }

  // Default: choose method
  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-colors"
      >
        {/* Google SVG icon */}
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs text-gray-400">
          <span className="bg-white px-3">or</span>
        </div>
      </div>

      <button
        onClick={() => setStep('phone-number')}
        className="w-full flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-lg transition-colors"
      >
        <Phone className="h-5 w-5" />
        Continue with phone number
      </button>

      <p className="text-xs text-center text-gray-400 mt-4">
        By signing in you agree to our terms of service. Phone OTP is free — no WhatsApp required.
      </p>
    </div>
  )
}
