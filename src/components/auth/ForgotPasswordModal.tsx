import React, { useState, useEffect } from 'react'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLogin?: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose, onOpenLogin = () => {} }: ForgotPasswordModalProps) {
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate sending OTP
    setTimeout(() => {
      console.log('OTP sent to:', email)
      alert(`OTP has been sent to: ${email}`)
      setIsLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate OTP verification
    setTimeout(() => {
      console.log('OTP verified:', otp)
      // In real app, verify OTP with backend
      if (otp.length === 6) {
        alert('OTP verified successfully!')
        setIsLoading(false)
        setStep(3)
      } else {
        alert('Invalid OTP. Please try again.')
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long!')
      return
    }

    setIsLoading(true)
    
    // Simulate password reset
    setTimeout(() => {
      console.log('Password reset for:', email)
      alert('Password reset successful! Please login with your new password.')
      handleClose()
      setIsLoading(false)
      onOpenLogin()
    }, 1000)
  }

  const handleClose = () => {
    setStep(1)
    setEmail('')
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
    setIsLoading(false)
    onClose()
  }

  const handleResendOTP = () => {
    setIsLoading(true)
    setTimeout(() => {
      alert(`OTP has been resent to: ${email}`)
      setIsLoading(false)
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0  flex items-center justify-center z-[9999]" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="p-6 border-b-4" style={{ borderBottomColor: '#ddaa2c' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black" style={{ color: '#196d83' }}>
              {step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'Reset Password'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            {step === 1 ? 'Enter your email to receive OTP' : 
             step === 2 ? 'Enter the 6-digit OTP sent to your email' : 
             'Create your new password'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleSendOTP}>
              <div className="space-y-5">
                {/* Instructions */}
                <div className="bg-blue-50 border-l-4 p-4 rounded" style={{ borderLeftColor: '#196d83' }}>
                  <p className="text-sm text-gray-700">
                    We'll send a 6-digit OTP (One-Time Password) to your email address.
                  </p>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-semibold mb-2" style={{ color: '#196d83' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ddaa2c] transition"
                    placeholder="Enter your email"
                    style={{ borderColor: '#e5e7eb' }}
                    disabled={isLoading}
                  />
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
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>

                {/* Back to Login Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    Remember your password?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        handleClose()
                        onOpenLogin()
                      }}
                      className="font-semibold hover:underline"
                      style={{ color: '#196d83' }}
                    >
                      Back to Login
                    </button>
                  </p>
                </div>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
              <div className="space-y-5">
                {/* Email Display */}
                <div className="bg-green-50 border-l-4 p-4 rounded" style={{ borderLeftColor: '#ddaa2c' }}>
                  <p className="text-sm text-gray-700">
                    OTP sent to: <strong>{email}</strong>
                  </p>
                </div>

                {/* OTP Field */}
                <div>
                  <label htmlFor="otp-input" className="block text-sm font-semibold mb-2" style={{ color: '#196d83' }}>
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp-input"
                    required
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ddaa2c] transition text-center text-2xl font-bold tracking-widest"
                    placeholder="000000"
                    style={{ borderColor: '#e5e7eb' }}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">Enter the 6-digit code</p>
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="text-sm font-semibold hover:underline disabled:opacity-50"
                    style={{ color: '#196d83' }}
                  >
                    Didn't receive code? Resend OTP
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#ddaa2c', 
                    color: '#fff',
                    boxShadow: '0 4px 6px rgba(218, 165, 32, 0.3)'
                  }}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 font-semibold"
                >
                  ← Change Email
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="space-y-5">
                {/* Success Message */}
                <div className="bg-green-50 border-l-4 p-4 rounded" style={{ borderLeftColor: '#ddaa2c' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <p className="text-sm text-gray-700 font-semibold">
                      OTP Verified Successfully!
                    </p>
                  </div>
                </div>

                {/* New Password Field */}
                <div>
                  <label htmlFor="new-password" className="block text-sm font-semibold mb-2" style={{ color: '#196d83' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    required
                    minLength="6"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ddaa2c] transition"
                    placeholder="Enter new password"
                    style={{ borderColor: '#e5e7eb' }}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirm-new-password" className="block text-sm font-semibold mb-2" style={{ color: '#196d83' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-new-password"
                    required
                    minLength="6"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ddaa2c] transition"
                    placeholder="Confirm new password"
                    style={{ borderColor: '#e5e7eb' }}
                    disabled={isLoading}
                  />
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
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
