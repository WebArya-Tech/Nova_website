import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { getApprovedTestimonials } from '@/api/api/testimonialApi.js'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getApprovedTestimonials()
        const list = data?.content || (Array.isArray(data) ? data : [])
        setReviews(list.length > 0 ? list : FALLBACK_REVIEWS)
      } catch {
        setReviews(FALLBACK_REVIEWS)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  return (
    <>

      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
            alt="Reviews"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary-dark/65 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              What Our Students <span className="text-accent">Say</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Real feedback from students and parents who have experienced the Nova difference
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, idx) => {
                const name = review.name || review.reviewerName || 'Anonymous'
                const text = review.text || review.message || review.quote || review.content || ''
                const rating = review.rating || 5
                const role = review.role || 'Student'
                return (
                  <div
                    key={review.id || review._id || idx}
                    className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < rating ? 'text-accent fill-accent' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm leading-relaxed italic line-clamp-4">
                        "{text}"
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{name}</p>
                        <p className="text-xs text-muted-foreground">{role}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

const FALLBACK_REVIEWS = [
  {
    id: 'fallback-1',
    name: 'Mrs. Bindhu',
    reviewerName: 'Mrs. Bindhu',
    role: 'Parent',
    rating: 5,
    text: 'My daughter has been attending classes at Nova Tuitions for the past 6 months. The improvement in her math scores is remarkable. The teachers are patient, knowledgeable, and truly care about each student\'s progress.'
  },
  {
    id: 'fallback-2',
    name: 'Siddhant',
    reviewerName: 'Siddhant',
    role: 'Student',
    rating: 5,
    text: 'I scored A* grades in Physics and Chemistry. The conceptual teaching approach at Nova helped me understand the subjects deeply rather than just memorizing.'
  },
  {
    id: 'fallback-3',
    name: 'Rithika',
    reviewerName: 'Rithika',
    role: 'Student',
    rating: 5,
    text: 'The AS Level guidance and support for Math and Statistics was exceptional. The teachers provided personalized attention and helped me achieve my target grades.'
  },
  {
    id: 'fallback-4',
    name: 'Sanjana',
    reviewerName: 'Sanjana',
    role: 'Student',
    rating: 5,
    text: 'A Level Math and Statistics guidance at Nova was outstanding. The structured curriculum and regular practice tests built my confidence.'
  }
]
