'use client'

import { useState, useRef } from 'react'

interface LoginModalProps {
  onClose: () => void
  onSuccess: (token: string) => void
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  console.log('✅ LoginModal component RENDERED')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const apiUrl = '/api/auth/login'
      console.log('📡 Sending login request to:', apiUrl)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Login failed (${response.status})`)
      }

      const data = await response.json()
      console.log('📦 Full response data:', data)
      console.log('🔑 Checking token locations:', {
        token: data.token,
        access_token: data.access_token,
        accessToken: data.accessToken,
      })
      const token = data.token || data.access_token || data.accessToken

      if (!token) {
        console.error('❌ Token not found in response. Available keys:', Object.keys(data))
        throw new Error('No token in response')
      }

      onSuccess(token)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed. Please try again.'
      console.error('❌ Login error:', errorMsg)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Form Container */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            🔐 Access Vault
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Enter your credentials to unlock exclusive content
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="emilys"
            required
            className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-warm)] transition-colors duration-200"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-warm)] transition-colors duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[var(--accent-warm)] text-[var(--bg)] font-semibold rounded-lg hover:bg-[var(--accent-warm)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-3"
        >
          {loading ? 'Unlocking...' : 'Unlock Vault'}
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => {
            console.log('❌ Modal closed')
            onClose()
          }}
          className="w-full py-2 px-4 border border-[var(--border)] text-[var(--text-secondary)] font-medium rounded-lg hover:bg-[var(--bg-surface)] transition-colors duration-200"
        >
          Cancel
        </button>

        {/* Helper text */}
        <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
          Try: emilys / emilyspass
        </p>
      </form>
    </div>
  )
}
