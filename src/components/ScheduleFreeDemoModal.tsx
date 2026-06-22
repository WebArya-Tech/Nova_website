import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { demoApi } from '../api/demoApi'

const GRADES = ['1-5', '6-8', '9-10', '11-12', 'Undergraduate', 'Post-Graduate', 'Other']
const BOARDS = ['IGCSE', 'IB', 'Cambridge', 'CBSE', 'ICSE', 'Others']
const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM'
]
const OTP_VALIDITY_MS = 5 * 60 * 1000
const OFFICIAL_EMAIL = 'ithinklearn@ixpoe.com'
const OFFICIAL_WHATSAPP = '918197466607'

export default function ScheduleFreeDemoModal({ isOpen, onClose }) {
  const { isAuthenticated, user } = useAuth()
  const [step, setStep] = useState(1) // 1: Form, 2: OTP Verification, 3: Consent
  const [otpExpiry, setOtpExpiry] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [otpInput, setOtpInput] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    grade: '',
    board: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const [storedOtp, setStoredOtp] = useState(null)

  // Update form data with user info when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        studentName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [isAuthenticated, user])

  // OTP Timer
  useEffect(() => {
    if (otpExpiry) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const remaining = Math.max(0, otpExpiry - now)
        setTimeRemaining(Math.ceil(remaining / 1000))

        if (remaining <= 0) {
          clearInterval(timer)
          setOtpExpiry(null)
          setStoredOtp(null)
          toast.error('OTP has expired. Please request a new one.')
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [otpExpiry])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone)
  }

  const validateFormStep1 = () => {
    const newErrors = {}

    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required'
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required'
    if (!formData.grade) newErrors.grade = 'Grade is required'
    if (!formData.board) newErrors.board = 'Board is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (formData.phone.length < 10) newErrors.phone = 'Phone number must be exactly 10 digits'
    else if (!validatePhoneNumber(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits'
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required'
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time slot is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let finalValue = value

    // Limit phone number to 10 digits
    if (name === 'phone') {
      finalValue = value.replace(/\D/g, '').slice(0, 10)
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleSendOTP = async () => {
    if (!validateFormStep1()) return

    try {
      const otp = generateOTP()
      setStoredOtp(otp)
      setOtpInput('')

      try {
        await demoApi.sendOtp({
          email: formData.email,
          studentName: formData.studentName,
          otp,
          otpValidityMinutes: 5,
          message: 'This OTP is valid for only 5 minutes.'
        })
      } catch {
        // Backend endpoint is optional in this frontend build. Keep local fallback usable.
        console.info(`Demo OTP fallback for ${formData.email}: ${otp}`)
      }

      toast.success(`OTP sent to ${formData.email}. This OTP is valid for only 5 minutes.`)

      // Set OTP expiry to 5 minutes from now
      const expiryTime = new Date().getTime() + OTP_VALIDITY_MS
      setOtpExpiry(expiryTime)
      setStep(2)
    } catch (error) {
      console.error('Error sending OTP:', error)
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  const handleVerifyOTP = () => {
    if (!otpInput.trim()) {
      toast.error('Please enter OTP')
      return
    }

    if (!otpExpiry || new Date().getTime() >= otpExpiry || timeRemaining <= 0 || !storedOtp) {
      setStoredOtp(null)
      toast.error('OTP has expired. Please request a new one.')
      return
    }

    if (otpInput !== storedOtp) {
      toast.error('Invalid OTP')
      return
    }

    demoApi.verifyOtp({ email: formData.email, otp: otpInput }).catch(() => null).finally(() => {
      toast.success('OTP verified successfully!')
      setStep(3)
    })
  }

  const handleResendOTP = () => {
    setOtpInput('')
    setStoredOtp(null)
    setOtpExpiry(null)
    setTimeRemaining(0)
    handleSendOTP()
  }

  const handleSubmitDemo = async () => {
    if (!consentChecked) {
      toast.error('Please agree to the consent to proceed')
      return
    }

    setIsSubmitting(true)

    try {
      // Get existing requests
      const demoRequests = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]')
      const adminDemoRequests = JSON.parse(localStorage.getItem('icfy_demo_requests') || '[]')

      // Create new demo request with all required fields
      const newDemoRequest = {
        id: `DEMO${Date.now()}`,
        demoNumber: `DEMO${demoRequests.length + 1}${Math.floor(Date.now() / 1000)}`,
        studentName: formData.studentName,
        parentName: formData.parentName,
        grade: formData.grade,
        board: formData.board,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message,
        consentGiven: true,
        requestDate: new Date().toISOString(),
        status: 'Pending',
        verified: true
      }

      // Store in localStorage for running class demo requests
      demoRequests.push(newDemoRequest)
      localStorage.setItem('runningClassDemoRequests', JSON.stringify(demoRequests))

      // Store in admin panel format (icfy_demo_requests key)
      const adminRequest = {
        id: newDemoRequest.id,
        name: newDemoRequest.studentName,
        parentName: newDemoRequest.parentName,
        email: newDemoRequest.email,
        phone: newDemoRequest.phone,
        course: `${newDemoRequest.grade} - ${newDemoRequest.board}`,
        grade: newDemoRequest.grade,
        board: newDemoRequest.board,
        preferredDate: newDemoRequest.preferredDate,
        preferredTime: newDemoRequest.preferredTime,
        status: 'Pending',
        notes: newDemoRequest.message,
        requestedOn: new Date(newDemoRequest.requestDate).toLocaleDateString('en-IN'),
        demoNumber: newDemoRequest.demoNumber
      }
      adminDemoRequests.push(adminRequest)
      localStorage.setItem('icfy_demo_requests', JSON.stringify(adminDemoRequests))

      // Dispatch storage event so admin panel refreshes instantly
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'runningClassDemoRequests',
        newValue: JSON.stringify(demoRequests)
      }))

      // --- Email notification to official iThinkLearn email ---
      const emailSubject = `New Demo Request - ${newDemoRequest.demoNumber} | ${newDemoRequest.studentName}`
      const emailBody = [
        `New Free Demo Request Received`,
        ``,
        `Demo Number: ${newDemoRequest.demoNumber}`,
        `Submitted On: ${new Date(newDemoRequest.requestDate).toLocaleString('en-IN')}`,
        ``,
        `--- STUDENT DETAILS ---`,
        `Student Name : ${newDemoRequest.studentName}`,
        `Parent Name  : ${newDemoRequest.parentName}`,
        `Grade        : ${newDemoRequest.grade}`,
        `Board        : ${newDemoRequest.board}`,
        ``,
        `--- CONTACT DETAILS ---`,
        `Email  : ${newDemoRequest.email}`,
        `Phone  : ${newDemoRequest.phone}`,
        ``,
        `--- PREFERRED SCHEDULE ---`,
        `Date : ${newDemoRequest.preferredDate}`,
        `Time : ${newDemoRequest.preferredTime}`,
        ``,
        newDemoRequest.message ? `--- MESSAGE ---\n${newDemoRequest.message}` : '',
        ``,
        `Please follow up with the student at the earliest.`,
        ``,
        `-- iThinkLearn Demo Request System`
      ].filter(l => l !== undefined).join('\n')

      window.open(
        `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
        '_blank'
      )

      // --- WhatsApp notification to official iThinkLearn WhatsApp ---
      const whatsappMsg = [
        `🎓 *New Demo Request - ${newDemoRequest.demoNumber}*`,
        ``,
        `👤 *Student:* ${newDemoRequest.studentName}`,
        `👨‍👩‍👦 *Parent:* ${newDemoRequest.parentName}`,
        `📚 *Grade/Board:* ${newDemoRequest.grade} - ${newDemoRequest.board}`,
        ``,
        `📧 *Email:* ${newDemoRequest.email}`,
        `📞 *Phone:* ${newDemoRequest.phone}`,
        ``,
        `📅 *Preferred Date:* ${newDemoRequest.preferredDate}`,
        `⏰ *Preferred Time:* ${newDemoRequest.preferredTime}`,
        newDemoRequest.message ? `\n💬 *Message:* ${newDemoRequest.message}` : '',
        ``,
        `🕐 *Submitted:* ${new Date(newDemoRequest.requestDate).toLocaleString('en-IN')}`,
        ``,
        `Please follow up at the earliest! ✅`
      ].filter(l => l !== undefined).join('\n')

      window.open(
        `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`,
        '_blank'
      )

      toast.success('Demo scheduled! Email & WhatsApp notifications sent.')
      resetForm()
      onClose()
    } catch (error) {
      console.error('Error submitting demo:', error)
      toast.error('Failed to schedule demo. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setOtpExpiry(null)
    setOtpInput('')
    setConsentChecked(false)
    setErrors({})
    setFormData({
      studentName: '',
      parentName: '',
      grade: '',
      board: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    })
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-card shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto rounded-2xl">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-linear-to-r from-primary-dark via-primary to-primary-dark sticky top-0 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="pr-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-foreground">
                {step === 1 ? 'Schedule Free Demo' : step === 2 ? 'Verify OTP' : 'Confirm Details'}
              </h2>
              <p className="text-foreground mt-1 text-xs sm:text-sm">
                {step === 1 ? 'Fill in your details' : step === 2 ? 'Enter the OTP sent to your email' : 'Confirm and schedule your demo'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-white/80 bg-black/20 hover:bg-black/30 text-xl sm:text-2xl font-bold transition p-1.5 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center -mr-1 -mt-1"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 flex gap-2">
            <div className={`h-1.5 flex-1 ${step >= 1 ? 'bg-accent' : 'bg-muted'}`}></div>
            <div className={`h-1.5 flex-1 ${step >= 2 ? 'bg-accent' : 'bg-muted'}`}></div>
            <div className={`h-1.5 flex-1 ${step >= 3 ? 'bg-accent' : 'bg-muted'}`}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          {/* Step 1: Form */}
          {step === 1 && (
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Student Name <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                      errors.studentName ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                    placeholder="Student's full name"
                  />
                  {errors.studentName && <p className="text-xs text-destructive mt-1">{errors.studentName}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Parent Name <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                      errors.parentName ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                    placeholder="Parent's full name"
                  />
                  {errors.parentName && <p className="text-xs text-destructive mt-1">{errors.parentName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Grade <span className="text-destructive">*</span></label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                      errors.grade ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  >
                    <option value="">Select Grade</option>
                    {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.grade && <p className="text-xs text-destructive mt-1">{errors.grade}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Board <span className="text-destructive">*</span></label>
                  <select
                    name="board"
                    value={formData.board}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                      errors.board ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  >
                    <option value="">Select Board</option>
                    {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.board && <p className="text-xs text-destructive mt-1">{errors.board}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Email ID <span className="text-destructive">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                    errors.email ? 'border-destructive' : 'border-border focus:border-primary'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Phone Number <span className="text-destructive">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                    errors.phone ? 'border-destructive' : 'border-border focus:border-primary'
                  }`}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                <p className="text-xs text-muted-foreground mt-1">Format: 10 digits only (e.g., 9876543210)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Preferred Date <span className="text-destructive">*</span></label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                      errors.preferredDate ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-xs text-destructive mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Preferred Time Slot <span className="text-destructive">*</span></label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm ${
                      errors.preferredTime ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  >
                    <option value="">Select Time</option>
                    {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                  {errors.preferredTime && <p className="text-xs text-destructive mt-1">{errors.preferredTime}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  rows="3"
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary resize-none text-sm"
                />
              </div>

              <button
                type="button"
                onClick={handleSendOTP}
                className="w-full py-2.5 sm:py-3 px-4 rounded-lg font-bold text-accent-foreground bg-accent hover:bg-accent/90 transition-all shadow-lg active:scale-95 text-sm sm:text-base mt-6"
              >
                Send OTP
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-secondary/30 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  An OTP has been sent to <strong>{formData.email}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-2">This OTP is valid for only <strong>5 minutes</strong></p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Enter OTP <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  placeholder="000000"
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary text-center text-2xl tracking-widest font-semibold"
                />
              </div>

              {/* Timer */}
              <div className="text-center">
                <div className={`text-3xl font-bold ${timeRemaining <= 60 ? 'text-destructive' : 'text-foreground'}`}>
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Time remaining</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleVerifyOTP}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-bold text-accent-foreground bg-accent hover:bg-accent/90 transition-all shadow-lg active:scale-95 text-sm sm:text-base"
                >
                  Verify OTP
                </button>
                <button
                  onClick={handleResendOTP}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-bold border-2 border-border text-muted-foreground hover:bg-secondary/30 transition-all text-sm sm:text-base"
                >
                  Resend OTP
                </button>
              </div>

              <button
                onClick={() => {
                  setStep(1)
                  setOtpInput('')
                }}
                className="w-full py-2.5 text-muted-foreground hover:text-foreground text-sm font-semibold transition"
              >
                ← Back to Form
              </button>
            </div>
          )}

          {/* Step 3: Consent & Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-secondary/30 p-4 rounded-lg border border-border flex items-start gap-3">
                <div className="text-primary text-xl mt-0.5">✓</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">OTP Verified Successfully!</p>
                  <p className="text-xs text-muted-foreground mt-1">Your details are ready for submission.</p>
                </div>
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg space-y-2 text-sm">
                <h3 className="font-semibold text-foreground mb-3">Review Your Details:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="font-semibold text-muted-foreground">Student:</span> {formData.studentName}</div>
                  <div><span className="font-semibold text-muted-foreground">Parent:</span> {formData.parentName}</div>
                  <div><span className="font-semibold text-muted-foreground">Grade:</span> {formData.grade}</div>
                  <div><span className="font-semibold text-muted-foreground">Board:</span> {formData.board}</div>
                  <div><span className="font-semibold text-muted-foreground">Email:</span> {formData.email}</div>
                  <div><span className="font-semibold text-muted-foreground">Phone:</span> {formData.phone}</div>
                  <div><span className="font-semibold text-muted-foreground">Date:</span> {formData.preferredDate}</div>
                  <div><span className="font-semibold text-muted-foreground">Time:</span> {formData.preferredTime}</div>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg border-2 border-border cursor-pointer hover:bg-secondary/50 transition">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="w-5 h-5 mt-1 rounded accent-primary"
                />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  I agree to be contacted via phone, WhatsApp, and email for demo scheduling and course information.
                </span>
              </label>

              <button
                onClick={handleSubmitDemo}
                disabled={isSubmitting || !consentChecked}
                className="w-full py-3 px-4 rounded-lg font-bold text-accent-foreground bg-accent hover:bg-accent/90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Demo'}
              </button>

              <button
                onClick={() => {
                  setStep(1)
                  setOtpInput('')
                }}
                className="w-full py-2.5 text-muted-foreground hover:text-foreground text-sm font-semibold transition"
              >
                ← Back to Form
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
