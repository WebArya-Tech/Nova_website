import React, { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenSignup?: () => void
  onOpenForgotPassword?: () => void
}

export default function LoginModal({ isOpen, onClose, onOpenSignup = () => {}, onOpenForgotPassword = () => {} }: LoginModalProps) {
  const { login } = useAuth() as any
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = login(loginData.email, loginData.password)
      
      if (result.success) {
        setLoginData({ email: '', password: '' })
        onClose()
        // Auth state has been updated in context. Do NOT manually navigate here.
        // App.jsx will handle navigation based on auth state changes via useEffect hook.
      } else {
        setError(result.message || 'Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="p-6 border-b-4" style={{ borderBottomColor: '#ddaa2c' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black" style={{ color: '#196d83' }}>Login</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Welcome back to Nova Tuitions</p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold mb-2" style={{ color: '#196d83' }}>
                Email Address
              </label>
              <input
                type="email"
                id="login-email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ddaa2c] transition"
                placeholder="Enter your email"
                style={{ borderColor: '#e5e7eb' }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold mb-2" style={{ color: '#196d83' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:border-[#ddaa2c] transition"
                  placeholder="Enter your password"
                  style={{ borderColor: '#e5e7eb' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenForgotPassword()
                }}
                className="text-sm font-semibold hover:underline"
                style={{ color: '#196d83' }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: '#ddaa2c', 
                color: '#fff',
                boxShadow: '0 4px 6px rgba(218, 165, 32, 0.3)'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onOpenSignup()
                  }}
                  className="font-semibold hover:underline"
                  style={{ color: '#196d83' }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
