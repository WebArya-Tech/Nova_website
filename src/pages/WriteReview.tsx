import React, { useState } from 'react'
import { Star, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const GRADES = [
  { value: '1-5', label: 'Class 1–5' },
  { value: '6-8', label: 'Class 6–8' },
  { value: '9-10', label: 'Class 9–10' },
  { value: '11-12', label: 'Class 11–12' },
  { value: 'ug', label: 'Undergraduate' },
  { value: 'pg', label: 'Postgraduate' },
  { value: 'competitive', label: 'Competitive Exam' },
]

const RATING_CATEGORIES = [
  { key: 'teachingQuality', label: 'Teaching Quality' },
  { key: 'personalAttention', label: 'Personal Attention' },
  { key: 'conceptClarity', label: 'Concept Clarity' },
  { key: 'doubtSolving', label: 'Doubt Solving' },
  { key: 'studyMaterial', label: 'Study Material' },
  { key: 'testSystem', label: 'Test System' },
  { key: 'structuredPlanning', label: 'Structured Planning' },
  { key: 'examOrientedPractice', label: 'Exam-Oriented Practice' },
  { key: 'reinforcementClasses', label: 'Reinforcement Classes' },
  { key: 'improvementInConfidence', label: 'Improvement in Confidence' },
  { key: 'individualMonitoring', label: 'Individual Monitoring' },
  { key: 'teacherExperience', label: 'Teacher Experience' },
  { key: 'batchSizeAdvantage', label: 'Batch Size Advantage' },
  { key: 'resultImprovement', label: 'Result Improvement' },
  { key: 'overallExperience', label: 'Overall Experience' },
  { key: 'overallSatisfaction', label: 'Overall Satisfaction' },
]

const defaultRatings = Object.fromEntries(RATING_CATEGORIES.map(c => [c.key, 5]))

const StarInput = ({ value, onChange, size = 28 }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(star => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
      >
        <Star
          size={size}
          className={star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}
        />
      </button>
    ))}
  </div>
)

export default function WriteReview() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    grade: '',
    review: '',
    overallRating: 5,
    detailedRatings: { ...defaultRatings },
  })

  const validate = () => {
    const e = {}
    if (!formData.studentName.trim()) e.studentName = 'Student name is required'
    if (!formData.parentName.trim()) e.parentName = 'Parent name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email address'
    if (!formData.grade) e.grade = 'Please select a grade'
    if (!formData.review.trim()) e.review = 'Review paragraph is required'
    else if (formData.review.trim().length < 20) e.review = 'Review must be at least 20 characters'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleDetailedRating = (key, val) => {
    setFormData(prev => ({ ...prev, detailedRatings: { ...prev.detailedRatings, [key]: val } }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    setTimeout(() => {
      const newReview = {
        id: `review_${Date.now()}`,
        studentName: formData.studentName,
        parentName: formData.parentName,
        name: formData.studentName,
        email: formData.email,
        grade: formData.grade,
        review: formData.review,
        rating: formData.overallRating,
        detailedRatings: formData.detailedRatings,
        date: new Date().toISOString(),
        status: 'pending',
        submittedAt: new Date().toISOString(),
      }

      // Save to localStorage — admin panel reads from icfy_reviews
      const existing = JSON.parse(localStorage.getItem('icfy_reviews') || '[]')
      localStorage.setItem('icfy_reviews', JSON.stringify([...existing, newReview]))

      // Notify admin panel if open in same browser
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'icfy_reviews',
        newValue: JSON.stringify([...existing, newReview])
      }))

      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-primary mb-3">Review Submitted!</h1>
          <p className="text-gray-600 mb-2">Thank you, <strong>{formData.studentName}</strong>!</p>
          <p className="text-gray-500 text-sm mb-8">
            Your review has been submitted successfully and is <span className="font-semibold text-yellow-600">pending admin approval</span>. It will be published on the website once approved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/reviews" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition">
              View All Reviews
            </a>
            <a href="/" className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Page Header */}
      <section className="bg-primary py-5 sm:py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <a href="/reviews" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-semibold mb-4 transition text-sm">
            <ArrowLeft size={16} /> Back to Reviews
          </a>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-foreground mb-2">Write a Review</h1>
          <p className="text-primary-foreground/70 text-sm sm:text-base">Share your experience with Nova Tuitions. No login required.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 px-4 py-2 rounded-lg text-xs font-semibold">
            ⏳ Reviews are published after admin approval
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

            {/* Section: Personal Info */}
            <div className="px-5 sm:px-8 py-6 border-b border-gray-100">
              <h2 className="text-base font-black text-primary uppercase tracking-wide mb-5">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Student Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition bg-secondary focus:bg-background ${errors.studentName ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'}`}
                  />
                  {errors.studentName && <p className="text-xs text-red-500 mt-1">{errors.studentName}</p>}
                </div>

                {/* Parent Name */}
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Parent Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Enter parent's full name"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition bg-secondary focus:bg-background ${errors.parentName ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'}`}
                  />
                  {errors.parentName && <p className="text-xs text-red-500 mt-1">{errors.parentName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Email ID <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition bg-secondary focus:bg-background ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Grade */}
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Grade / Class <span className="text-red-500">*</span></label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition bg-secondary focus:bg-background ${errors.grade ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'}`}
                  >
                    <option value="">Select Grade</option>
                    {GRADES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                  </select>
                  {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade}</p>}
                </div>
              </div>
            </div>

            {/* Section: Overall Star Rating */}
            <div className="px-5 sm:px-8 py-6 border-b border-border bg-primary/5">
              <h2 className="text-base font-black text-primary uppercase tracking-wide mb-1">Overall Star Rating <span className="text-red-500">*</span></h2>
              <p className="text-xs text-muted-foreground mb-4">How would you rate your overall experience?</p>
              <div className="flex items-center gap-4">
                <StarInput value={formData.overallRating} onChange={val => setFormData(p => ({ ...p, overallRating: val }))} size={36} />
                <span className="text-2xl font-black text-primary">{formData.overallRating}<span className="text-base font-normal text-muted-foreground">/5</span></span>
              </div>
            </div>

            {/* Section: Detailed Ratings */}
            <div className="px-5 sm:px-8 py-6 border-b border-border">
              <h2 className="text-base font-black text-primary uppercase tracking-wide mb-1">Detailed Ratings</h2>
              <p className="text-xs text-muted-foreground mb-5">Rate each aspect of your learning experience</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {RATING_CATEGORIES.map(cat => (
                  <div key={cat.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-xs sm:text-sm text-foreground/80 font-medium">{cat.label}</span>
                    <StarInput value={formData.detailedRatings[cat.key]} onChange={val => handleDetailedRating(cat.key, val)} size={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Review Paragraph */}
            <div className="px-5 sm:px-8 py-6 border-b border-border">
              <h2 className="text-base font-black text-primary uppercase tracking-wide mb-1">Review Paragraph <span className="text-red-500">*</span></h2>
              <p className="text-xs text-muted-foreground mb-3">Share your detailed experience (minimum 20 characters)</p>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                rows={5}
                placeholder="Share your experience with Nova Tuitions — what you liked, how it helped you, and whether you'd recommend it to others..."
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition resize-none bg-secondary focus:bg-background ${errors.review ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-primary'}`}
              />
              {errors.review
                ? <p className="text-xs text-red-500 mt-1">{errors.review}</p>
                : <p className="text-xs text-muted-foreground mt-1">{formData.review.length} characters</p>
              }
            </div>

            {/* Submit */}
            <div className="px-5 sm:px-8 py-6 bg-secondary">
              <div className="flex items-start gap-3 mb-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <span className="text-yellow-500 text-lg shrink-0">ℹ️</span>
                <p className="text-xs text-muted-foreground">
                  Your review will be submitted for <strong>admin review</strong>. Once approved, it will be published on the website. You do <strong>not</strong> need to log in to submit a review.
                </p>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {submitting
                  ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" />Submitting...</span>
                  : '⭐ Submit Review'}
              </button>
            </div>

          </form>
        </div>
      </section>

    </div>
  )
}
