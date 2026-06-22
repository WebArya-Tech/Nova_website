import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth, verifyOtp } from '../../context/AuthContext';
import { sendOtpEmail } from '../../utils/otpUtils';
import { useNavigate } from 'react-router-dom';

const OTP_DURATION = 300; // 5 minutes in seconds

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onOpenLogin }: SignupModalProps) {
  const { signup } = useAuth()
  const navigate = useNavigate()

  // step: 'form' | 'otp'
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_DURATION);
  const [otpExpired, setOtpExpired] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setTimeLeft(OTP_DURATION);
    setOtpExpired(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setOtpExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const validate = () => {
    const e = {}
    if (!formData.fullName.trim()) e.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      e.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      e.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      e.phone = 'Phone number must be exactly 10 digits'
    }
    if (!formData.password) {
      e.password = 'Password is required'
    } else if (formData.password.length < 6) {
      e.password = 'Password must be at least 6 characters'
    }
    if (!formData.confirmPassword) {
      e.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = 'Passwords do not match'
    }
    return e
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    setIsLoading(true)
    setTimeout(() => {
      sendOtpEmail(formData.email)
      setIsLoading(false)
      setOtpInput('')
      setOtpError('')
      setStep('otp')
      startTimer()
    }, 500)
  }

  const handleResendOtp = () => {
    setIsLoading(true)
    setTimeout(() => {
      sendOtpEmail(formData.email)
      setIsLoading(false)
      setOtpInput('')
      setOtpError('')
      startTimer()
    }, 500)
  }

  const handleVerifyAndSignup = (e) => {
    e.preventDefault()
    if (otpInput.length !== 6) { setOtpError('Please enter the 6-digit OTP'); return }
    if (otpExpired) { setOtpError('OTP has expired. Please resend.'); return }

    const result = verifyOtp(formData.email, otpInput)
    if (!result.valid) { setOtpError(result.message); return }

    setIsLoading(true)
    setTimeout(() => {
      const signupResult = signup(formData.fullName, formData.email, formData.phone, formData.password)
      setIsLoading(false)
      if (signupResult.success) {
        clearInterval(timerRef.current)
        handleClose()
        navigate('/student-dashboard')
      } else {
        setOtpError(signupResult.message || 'Failed to create account')
      }
    }, 500)
  }

  const handleClose = () => {
    clearInterval(timerRef.current)
    setStep('form')
    setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
    setErrors({})
    setOtpInput('')
    setOtpError('')
    setIsLoading(false)
    setOtpExpired(false)
    onClose()
  }

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
    setFormData(prev => ({ ...prev, phone: val }))
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
  }

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative bg-blue-900 px-6 pt-8 pb-6 sticky top-0 z-10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{step === 'form' ? 'Create Account' : 'Verify Email'}</h2>
              <p className="text-blue-300 mt-1 text-sm">
                {step === 'form' ? 'Join iThinkLearn today' : `OTP sent to ${formData.email}`}
              </p>
            </div>
            <button onClick={handleClose} className="text-blue-300 hover:text-white text-2xl font-bold transition leading-none mt-0.5">×</button>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* STEP 1: Registration Form */}
          {step === 'form' && (
            <form onSubmit={handleSendOtp} noValidate>
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => handleFieldChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleFieldChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputMode="numeric"
                    maxLength={10}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.phone
                    ? <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    : <p className="text-xs text-gray-400 mt-1">Must be exactly 10 digits</p>
                  }
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={e => handleFieldChange('password', e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.password ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`}
                      placeholder="Create a password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition" tabIndex={-1}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password
                    ? <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    : <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                  }
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={e => handleFieldChange('confirmPassword', e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none transition text-gray-800 text-sm bg-gray-50 focus:bg-white ${errors.confirmPassword ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`}
                      placeholder="Confirm your password"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition" tabIndex={-1}>
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl font-bold text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Sending OTP...</span>
                  ) : 'Send OTP →'}
                </button>

                <div className="text-center pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <button type="button" onClick={() => { onClose(); onOpenLogin() }} className="font-bold text-blue-900 hover:text-blue-700 hover:underline transition">
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyAndSignup} noValidate>
              <div className="space-y-4">
                {/* Info banner */}
                <div className="bg-blue-50 border-l-4 border-blue-900 rounded-r-xl p-4">
                  <p className="text-sm text-gray-700">
                    A 6-digit OTP has been sent to <strong className="text-blue-900">{formData.email}</strong>.
                  </p>
                  <p className="text-xs text-orange-600 font-semibold mt-1">⚠️ This OTP is valid for 5 minutes only.</p>
                </div>

                {/* Countdown Timer */}
                <div className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-base border-2 ${
                  otpExpired
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : timeLeft <= 60
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-300'
                    : 'bg-blue-900 text-white border-blue-900'
                }`}>
                  <span>⏱</span>
                  {otpExpired
                    ? <span>OTP Expired — Please resend</span>
                    : <span>Expires in: <span className="font-black tabular-nums">{formatTime(timeLeft)}</span></span>
                  }
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-blue-900 uppercase tracking-wide">Enter OTP</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpInput}
                    onChange={e => { setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6)); setOtpError('') }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-center text-2xl font-black tracking-[0.5em] text-blue-900 bg-gray-50 focus:bg-white ${otpError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-900'}`}
                    placeholder="------"
                    disabled={otpExpired}
                  />
                  {otpError && <p className="text-xs text-red-500 mt-1 text-center font-medium">{otpError}</p>}
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline disabled:opacity-50 transition"
                  >
                    {isLoading ? 'Sending...' : "Didn't receive code? Resend OTP"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otpInput.length !== 6 || otpExpired}
                  className="w-full py-3 rounded-xl font-bold text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />Verifying...</span>
                  ) : 'Verify & Create Account'}
                </button>

                <button
                  type="button"
                  onClick={() => { clearInterval(timerRef.current); setStep('form'); setOtpInput(''); setOtpError('') }}
                  className="w-full py-2 text-sm font-semibold text-gray-500 hover:text-blue-900 transition"
                >
                  ← Change Details
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
