import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLogin?: () => void
}

interface SignupData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

interface SignupResult {
  success: boolean
  message?: string
}

export default function SignupModal({
  isOpen,
  onClose,
  onOpenLogin = () => {},
}: SignupModalProps) {
  const { signup } = useAuth() as {
    signup: (
      fullName: string,
      email: string,
      phone: string,
      password: string
    ) => SignupResult
  }

  const [signupData, setSignupData] = useState<SignupData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)

    try {
      const result = signup(
        signupData.fullName,
        signupData.email,
        signupData.phone,
        signupData.password
      )

      if (result.success) {
        setSignupData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        })

        onClose()

        // Redirect to student dashboard
        window.history.pushState({}, '', '/student-dashboard')
        window.dispatchEvent(new PopStateEvent('popstate'))
      } else {
        setError(result.message || 'Failed to create account')
      }
    } catch (err) {
      setError('An error occurred during signup')
      console.error('Signup error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b-4 sticky top-0 bg-white" style={{ borderBottomColor: '#ddaa2c' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black" style={{ color: '#196d83' }}>
              Sign Up
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Inputs */}
          {(['fullName', 'email', 'phone'] as const).map((field) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field}
              required
              value={signupData[field]}
              onChange={(e) =>
                setSignupData({ ...signupData, [field]: e.target.value })
              }
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ddaa2c]"
            />
          ))}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="w-full px-4 py-3 border-2 rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              required
              value={signupData.confirmPassword}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3 border-2 rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-3"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#ddaa2c] text-white font-bold rounded-lg"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Login */}
          <p className="text-center text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose()
                onOpenLogin()
              }}
              className="text-[#196d83] font-semibold"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}