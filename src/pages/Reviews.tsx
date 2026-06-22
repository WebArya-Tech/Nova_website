import React, { useState, useRef, useEffect } from 'react'
import { Star } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginModal from '../components/auth/LoginModal'
import SignupModal from '../components/auth/SignupModal'
import { useAuth } from '../context/AuthContext'

const hardcodedReviews = [
  {
    id: 1,
    name: 'Kaustubh Yadav',
    course: 'ICFY Program',
    rating: 5,
    review: 'ICFY has been an incredible learning experience! The teaching quality is exceptional with personalized attention to every student. The test system is comprehensive and helps track progress effectively.',
    date: '2024-12-15',
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,
      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 5,
      improvementInConfidence: 5,
      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 5,
      overallSatisfaction: 5,
      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5
    }
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    course: 'UG Mathematics',
    rating: 5,
    review: 'Excellent teaching methodology! My concepts became crystal clear through ICFY classes. Highly recommended!',
    date: '2024-01-15',
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,

      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 5,
      improvementInConfidence: 5,

      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 5,
      overallSatisfaction: 5,

      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5
    }
  },
  {
    id: 3,
    name: 'Priya Patel',
    course: 'UG Physics',
    rating: 5,
    review: 'The instructors are very supportive and interactive. Great learning experience with practical problem-solving approach.',
    date: '2024-02-10',
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,

      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 4,
      improvementInConfidence: 5,

      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 4,
      overallSatisfaction: 5,

      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5
    }
  },
  {
    id: 4,
    name: 'Amit Kumar',
    course: 'UG Chemistry',
    rating: 4,
    review: 'Good quality content and patient teachers. Would appreciate more mock tests, but overall very satisfied.',
    date: '2024-01-20',
    detailedRatings: {
      teachingQuality: 4,
      personalAttention: 4,
      testSystem: 3,
      overallExperience: 4,

      conceptClarity: 5,
      doubtSolving: 4,
      studyMaterial: 4,
      improvementInConfidence: 4,

      structuredPlanning: 4,
      examOrientedPractice: 3,
      reinforcementClasses: 3,
      overallSatisfaction: 4,

      batchSizeAdvantage: 4,
      individualMonitoring: 4,
      teacherExperience: 4,
      resultImprovement: 4
    }
  },
  {
    id: 5,
    name: 'Ananya Singh',
    course: 'GRE',
    rating: 5,
    review: 'ICFY helped me score 330 in GRE! The doubt-clearing sessions were incredibly helpful. Thanks team!',
    date: '2024-02-05',
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,

      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 5,
      improvementInConfidence: 5,

      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 5,
      overallSatisfaction: 5,

      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5
    }
  },
  {
    id: 6,
    name: 'Vikram Singh',
    course: 'GMAT',
    rating: 5,
    review: 'Professional approach, comprehensive study materials, and excellent mentor support. Achieved my target score!',
    date: '2024-01-28',
    detailedRatings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,

      conceptClarity: 5,
      doubtSolving: 4,
      studyMaterial: 5,
      improvementInConfidence: 5,

      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 5,
      overallSatisfaction: 5,

      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5
    }
  },
 
  
];

export default function Reviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState(hardcodedReviews)

  useEffect(() => {
    const loadReviews = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('icfy_reviews') || '[]')
        const approved = stored.filter(r => r.status === 'approved')
        if (approved.length > 0) {
          // Merge: approved localStorage reviews first, then hardcoded (avoid duplicates by id)
          const hardcodedIds = new Set(hardcodedReviews.map(r => String(r.id)))
          const newApproved = approved.filter(r => !hardcodedIds.has(String(r.id)))
          setReviews([...newApproved, ...hardcodedReviews])
        } else {
          setReviews(hardcodedReviews)
        }
      } catch {
        setReviews(hardcodedReviews)
      }
    }
    loadReviews()
    // Live refresh when admin approves a review
    const handler = (e) => { if (e.key === 'icfy_reviews') loadReviews() }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const reviewsRef = useRef(null)
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    grade: '',
    course: '',
    review: '',
    ratings: {
      teachingQuality: 5,
      personalAttention: 5,
      testSystem: 5,
      overallExperience: 5,
      conceptClarity: 5,
      doubtSolving: 5,
      studyMaterial: 5,
      improvementInConfidence: 5,
      structuredPlanning: 5,
      examOrientedPractice: 5,
      reinforcementClasses: 5,
      overallSatisfaction: 5,
      batchSizeAdvantage: 5,
      individualMonitoring: 5,
      teacherExperience: 5,
      resultImprovement: 5
    }
  })
  const [pendingReviews, setPendingReviews] = useState([])
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const filteredReviews = reviews

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  const totalReviews = reviews.length

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const StarRating = ({ rating, size = 16 }) => (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  )

  const RatingInput = ({ label, value, onChange }) => (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">{label}</label>
      <div className="flex gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              size={22}
              className={star <= value ? 'fill-yellow-400 text-yellow-400 cursor-pointer' : 'text-gray-300 cursor-pointer hover:text-yellow-200'}
            />
          </button>
        ))}
      </div>
    </div>
  )

  const handleRatingChange = (category, value) => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        [category]: value
      }
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()

    // Calculate overall rating from individual ratings
    const ratingsArray = Object.values(formData.ratings)
    const overallRating = Math.round(ratingsArray.reduce((sum, r) => sum + r, 0) / ratingsArray.length)

    const newReview = {
      id: `review_${Date.now()}`,
      studentName: formData.studentName,
      parentName: formData.parentName,
      email: formData.email,
      grade: formData.grade,
      course: formData.course,
      rating: overallRating,
      review: formData.review,
      date: new Date().toISOString(),
      detailedRatings: formData.ratings,
      status: 'pending'
    }

    // Save to localStorage for admin approval
    const existing = JSON.parse(localStorage.getItem('icfy_reviews') || '[]')
    localStorage.setItem('icfy_reviews', JSON.stringify([...existing, newReview]))
    window.dispatchEvent(new StorageEvent('storage', { key: 'icfy_reviews' }))

    setPendingReviews([newReview, ...pendingReviews])
    setSubmitSuccess(true)
    setShowReviewForm(false)
    setFormData({
      studentName: '',
      parentName: '',
      email: '',
      grade: '',
      course: '',
      review: '',
      ratings: {
        teachingQuality: 5,
        personalAttention: 5,
        testSystem: 5,
        overallExperience: 5,
        conceptClarity: 5,
        doubtSolving: 5,
        studyMaterial: 5,
        improvementInConfidence: 5,
        structuredPlanning: 5,
        examOrientedPractice: 5,
        reinforcementClasses: 5,
        overallSatisfaction: 5,
        batchSizeAdvantage: 5,
        individualMonitoring: 5,
        teacherExperience: 5,
        resultImprovement: 5
      }
    })

    // Show success message for 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative py-8 sm:py-8 md:py-8 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
            alt="Reviews"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/75 to-black/70" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-primary-foreground">
            Student <span className="text-accent">Reviews</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Real feedback from students and parents who have experienced the Nova difference
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={scrollToReviews}
              className="px-6 sm:px-8 py-3 rounded-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition text-sm sm:text-base shadow-lg"
            >
              Explore Reviews
            </button>
            <a
              href="/write-review"
              className="px-6 sm:px-8 py-3 rounded-lg font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition text-sm sm:text-base shadow-lg"
            >
              Write a Review
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section ref={reviewsRef} className="py-12 sm:py-16 bg-secondary/30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, index) => (
              <div
                key={review.id || `${review.name || 'review'}-${index}`}
                className="bg-card rounded-xl border-2 border-border p-6 hover:shadow-xl hover:border-primary transition-all flex flex-col"
              >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{review.name}</h3>
                      <p className="text-sm text-primary">
                        {review.course}
                      </p>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-4 leading-relaxed text-sm">
                    &ldquo;{review.review}&rdquo;
                  </p>

                  {review.detailedRatings && (
                    <div className="mb-4 space-y-2 bg-secondary p-4 rounded-lg">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Detailed Ratings</h4>
                      
                      {[
                        { label: 'Teaching Quality', key: 'teachingQuality' },
                        { label: 'Personal Attention', key: 'personalAttention' },
                        { label: 'Test System', key: 'testSystem' },
                        { label: 'Overall Experience', key: 'overallExperience' },
                      ].map(({ label, key }) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{label}:</span>
                          <StarRating rating={review.detailedRatings[key]} size={12} />
                        </div>
                      ))}

                      <div className="pt-2 mt-2 border-t border-border space-y-2">
                        {[
                          { label: 'Concept Clarity', key: 'conceptClarity' },
                          { label: 'Doubt Solving', key: 'doubtSolving' },
                          { label: 'Study Material', key: 'studyMaterial' },
                          { label: 'Improvement in Confidence', key: 'improvementInConfidence' },
                        ].map(({ label, key }) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{label}:</span>
                            <StarRating rating={review.detailedRatings[key]} size={12} />
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 mt-2 border-t border-border space-y-2">
                        {[
                          { label: 'Structured Planning', key: 'structuredPlanning' },
                          { label: 'Exam-Oriented Practice', key: 'examOrientedPractice' },
                          { label: 'Reinforcement Classes', key: 'reinforcementClasses' },
                          { label: 'Overall Satisfaction', key: 'overallSatisfaction' },
                        ].map(({ label, key }) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{label}:</span>
                            <StarRating rating={review.detailedRatings[key]} size={12} />
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 mt-2 border-t border-border space-y-2">
                        {[
                          { label: 'Batch Size Advantage', key: 'batchSizeAdvantage' },
                          { label: 'Individual Monitoring', key: 'individualMonitoring' },
                          { label: 'Teacher Experience', key: 'teacherExperience' },
                          { label: 'Result Improvement', key: 'resultImprovement' },
                        ].map(({ label, key }) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{label}:</span>
                            <StarRating rating={review.detailedRatings[key]} size={12} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-foreground/80">Overall Rating:</span>
                      <StarRating rating={review.rating} size={16} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Success Message */}
      {submitSuccess && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <span className="text-lg">✓</span>
            <p className="font-semibold text-sm">Review submitted! Pending admin approval.</p>
          </div>
        </div>
      )}

      {/* Pending Reviews Section */}
      {pendingReviews.length > 0 && (
        <section className="py-12 px-4 bg-yellow-50/50 border-t border-yellow-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">⏳ Pending Approval</span>
              <h2 className="text-xl font-bold text-foreground">Your Submitted Reviews</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-xl border-2 border-yellow-300 p-6 shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{review.studentName}</h3>
                      <p className="text-sm text-primary">{review.course}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">PENDING</span>
                  </div>
                  <p className="text-foreground/80 mb-3 text-sm leading-relaxed line-clamp-3">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <span className="text-sm font-semibold text-foreground/80">Overall: {review.rating}/5</span>
                    <span className="text-xs text-muted-foreground">Submitted: {new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-sm mt-6">
              Your reviews will be visible to everyone after admin approval.
            </p>
          </div>
        </section>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignup={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true) }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onOpenLogin={() => { setIsSignupModalOpen(false); setIsLoginModalOpen(true) }}
      />
    </div>
  )
}
