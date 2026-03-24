import React, { useEffect, useMemo, useState } from 'react';
import { Star, Filter, X, Play, Video, Headphones, MessageCircle } from 'lucide-react';



type Testimonial = {
  id: string;
  type: 'audio' | 'video' | 'whatsapp';
  name: string;
  role: string;
  subject?: string;
  quote?: string;
  achievement?: string;
  category?: string;
  rating?: number;
  videoUrl?: string;
  audioUrl?: string;
  whatsapp?: Array<{ message: string; phone: string }>;
  image?: string;
};

// Note: The testimonials array below is seeded with sample data for demo purposes.

const ITEMS_PER_PAGE = 9;

const Testimonials = () => {
  const categories = ['All', 'IGCSE', 'AS/A Level'] as const;
  type Category = (typeof categories)[number];

  const types = ['All', 'audio', 'video', 'whatsapp'] as const;
  type TestimonialType = (typeof types)[number];

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedType, setSelectedType] = useState<TestimonialType>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      type: 'audio',
      name: 'Rahul Sharma',
      role: 'Parent',
      subject: 'Mathematics (IGCSE)',
      quote: 'His teaching style made complex topics easy to understand.',
      achievement: 'Improved grades from B to A* in 1 term',
      category: 'IGCSE',
      rating: 5,
      audioUrl: '/audio/testimonial1.mp3',
      whatsapp: [
        {
          phone: '+91 98XX XXX123',
          message: 'Rahul’s perspective was really helpful.',
        },
      ],
    },
    {
      id: 't-2',
      type: 'audio',
      name: 'Priya Singh',
      role: 'Student',
      subject: 'Chemistry (AS/A Level)',
      quote: 'The audio walkthroughs helped me revise without feeling overwhelmed.',
      achievement: 'Secured A* in Chemistry practicals',
      category: 'AS/A Level',
      rating: 5,
      audioUrl: '/audio/testimonial2.mp3',
      whatsapp: [
        {
          phone: '+91 97XX XXX678',
          message: 'The audio recaps were perfect for last-minute revision.',
        },
      ],
    },
    {
      id: 't-3',
      type: 'audio',
      name: 'Arjun Mehta',
      role: 'Student',
      subject: 'Biology (IGCSE)',
      quote: 'Listening to the summary audio made tricky diagrams stick.',
      achievement: 'Top scorer in biology practicals',
      category: 'IGCSE',
      rating: 5,
      audioUrl: '/audio/testimonial3.mp3',
      whatsapp: [
        {
          phone: '+91 96XX XXX890',
          message: 'The audio notes were a game-changer for revision.',
        },
      ],
    },
    {
      id: 't-4',
      type: 'video',
      name: 'Aman Verma',
      role: 'Student',
      subject: 'Physics (AS/A Level)',
      quote: 'The video lessons made revision so easy and effective.',
      achievement: 'Cleared boards with distinction',
      category: 'AS/A Level',
      rating: 5,
      videoUrl: '',
    },
    {
      id: 't-5',
      type: 'video',
      name: 'Kavya Patel',
      role: 'Student',
      subject: 'Mathematics (IGCSE)',
      quote: 'Watching the walkthroughs and solved examples helped me understand faster.',
      achievement: 'Improved from B to A* in 2 months',
      category: 'IGCSE',
      rating: 5,
      videoUrl: '',
    },
    {
      id: 't-6',
      type: 'video',
      name: 'Sanjay Kapoor',
      role: 'Student',
      subject: 'Economics (AS/A Level)',
      quote: 'The concept videos were perfectly paced and super clear.',
      achievement: 'Top 5 percentile in economics',
      category: 'AS/A Level',
      rating: 5,
      videoUrl: '',
    },
    {
      id: 't-7',
      type: 'whatsapp',
      name: 'Neha Gupta',
      role: 'Parent',
      subject: 'English (IGCSE)',
      quote: 'Seeing the WhatsApp feedback reassured me about the coaching quality.',
      achievement: 'Child ranked top in class',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 99XX XXX456',
          message: 'Thanks for the consistent support!',
        },
      ],
    },
    {
      id: 't-8',
      type: 'whatsapp',
      name: 'Riya Khanna',
      role: 'Parent',
      subject: 'Biology (IGCSE)',
      quote: 'The WhatsApp snippets gave us honest insight into the classroom vibe.',
      achievement: 'Top 10 in the cohort',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 95XX XXX567',
          message: 'Really appreciate the quick updates and responses!',
        },
      ],
    },
    {
      id: 't-9',
      type: 'whatsapp',
      name: 'Vikram Desai',
      role: 'Parent',
      subject: 'Computer Science (AS/A Level)',
      quote: 'The WhatsApp feedback helped us track progress every week.',
      achievement: 'Consistent A grades in programming',
      category: 'AS/A Level',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 91XX XXX345',
          message: 'The consistent communication made a big difference.',
        },
      ],
    },
    {
      id: 't-10',
      type: 'whatsapp',
      name: 'Mahi & Ria',
      role: 'Parents',
      subject: 'Mathematics (IGCSE)',
      quote: 'The WhatsApp updates made it easy to stay on top of their progress.',
      achievement: 'Scored A* and A in Math',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 94XX XXX123',
          message: 'Thank you for the detailed feedback and encouragement!',
        },
      ],
    },
    {
      id: 't-11',
      type: 'whatsapp',
      name: 'Pradyumna',
      role: 'Student',
      subject: 'Math (IGCSE Bridge)',
      quote: 'The bridge course made the CBSE → IGCSE shift smooth and confident.',
      achievement: 'Strong transition into IGCSE math',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 92XX XXX456',
          message: 'Really appreciated the step-by-step guidance for the new syllabus.',
        },
      ],
    },
    {
      id: 't-12',
      type: 'whatsapp',
      name: 'Rhea, Thea & Ojal',
      role: 'Students',
      subject: 'Math Group (IGCSE)',
      quote: 'Group sessions and WhatsApp updates kept everyone aligned and motivated.',
      achievement: 'Strong performance across the group',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 93XX XXX789',
          message: 'Thank you for the weekly progress snapshots and support!',
        },
      ],
    },
    {
      id: 't-13',
      type: 'whatsapp',
      name: 'Siddhant',
      role: 'Student',
      subject: 'Physics & Chemistry (IGCSE)',
      quote: 'The WhatsApp updates made it easy to track lab progress and concept clarity.',
      achievement: 'A* grades in both subjects',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 90XX XXX321',
          message: 'Thanks for the consistent guidance on lab reports and exam prep!',
        },
      ],
    },
    {
      id: 't-14',
      type: 'whatsapp',
      name: 'Siddhant (IA-ML)',
      role: 'Student',
      subject: 'Computer Science (IA-ML)',
      quote: 'The project feedback on WhatsApp helped me polish every submission.',
      achievement: 'Excellent IA grade',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 90XX XXX654',
          message: 'Appreciated the detailed feedback on my IA progress.',
        },
      ],
    },
    {
      id: 't-15',
      type: 'whatsapp',
      name: 'Thanya',
      role: 'Student',
      subject: 'Math (8th grade/IGCSE)',
      quote: 'The WhatsApp updates helped keep my revision on track every week.',
      achievement: 'A grade in Math',
      category: 'IGCSE',
      rating: 5,

      whatsapp: [
        {
          phone: '+91 88XX XXX987',
          message: 'Thank you for the regular check-ins and materials!',
        },
      ],
    },
  ];

  const [active, setActive] = useState<Testimonial | null>(null);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [active]);

  const maskPhone = (phone: string) => {
    const match = phone.match(/^(.*\D)?(\d{4})$/);
    if (!match) return phone;

    const prefix = match[1] ?? '';
    const last4 = match[2];

    return (
      <>
        <span className="blur-sm">{prefix}</span>
        <span>{last4}</span>
      </>
    );
  };

  const typeStyles = {
    audio: {
      border: 'border-l-4 border-primary/50',
      badge: 'bg-primary/10 text-primary',
      icon: 'text-primary',
      quote: 'bg-primary/5 border-primary/20',
    },
    video: {
      border: 'border-l-4 border-accent/60',
      badge: 'bg-accent/10 text-accent',
      icon: 'text-accent',
      quote: 'bg-accent/5 border-accent/20',
    },
    whatsapp: {
      border: 'border-l-4 border-primary/50',
      badge: 'bg-primary/10 text-primary',
      icon: 'text-primary',
      quote: 'bg-primary/5 border-primary/20',
    },
  } as const;

  const categoryStyles = {
    'IGCSE': 'bg-gradient-to-br from-primary/5 to-white',
    'AS/A Level': 'bg-gradient-to-br from-accent/5 to-white',
    default: 'bg-white',
  } as const;

  const filteredTestimonials = useMemo(() => {
    let filtered = testimonials;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((testimonial) => testimonial.category === selectedCategory);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter((testimonial) => testimonial.type === selectedType);
    }

    return filtered;
  }, [selectedCategory, selectedType]);

  const totalPages = Math.max(1, Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE));
  const paginatedTestimonials = filteredTestimonials.slice(0, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedType]);

  return (
    <div className="min-h-screen bg-background">

      {/* Filter Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-14">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">
              Student Testimonials
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80">
              Hear from Nova Tuitions students and parents. Use the filters below to view audio, video, or WhatsApp feedback.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-3">
                Level
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedType('All');
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedCategory === category
                      ? 'bg-white text-primary shadow-sm'
                      : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-3">
                Format
              </p>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedType === type
                      ? 'bg-white text-primary shadow-sm'
                      : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {type === 'audio' && <Headphones className="h-4 w-4" />}
                      {type === 'video' && <Video className="h-4 w-4" />}
                      {type === 'whatsapp' && <MessageCircle className="h-4 w-4" />}
                      {type === 'All' && <Filter className="h-4 w-4" />}
                      <span className="capitalize">{type}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/80">
              Showing <span className="font-semibold text-white">{filteredTestimonials.length}</span> testimonials
              {selectedCategory !== 'All' && (
                <>
                  {' '}
                  for <span className="font-semibold text-white">{selectedCategory}</span>
                </>
              )}
              {selectedType !== 'All' && (
                <>
                  {' '}&middot; <span className="font-semibold text-white capitalize">{selectedType}</span>
                </>
              )}
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedType('All');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/40 transition"
            >
              <Filter className="h-4 w-4" />
              Reset filters
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedTestimonials.map((testimonial) => {
              const theme = typeStyles[testimonial.type] ?? typeStyles.audio;
              const categoryStyle = categoryStyles[testimonial.category as keyof typeof categoryStyles] ?? categoryStyles.default;

              return (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActive(testimonial)}
                  className={`relative flex flex-col justify-between items-start ${categoryStyle} rounded-3xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/30 ring-1 ring-black/5 ${theme.border}`}
                >

                  {/* Header */}
                  <div className="mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role} • {testimonial.subject}
                      </p>
                      <p className="text-xs text-primary font-medium">{testimonial.achievement}</p>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className={`absolute top-5 right-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${theme.badge} shadow-sm`}
                  >
                    {testimonial.type === 'video' && <Video className={`h-4 w-4 ${theme.icon}`} />}
                    {testimonial.type === 'audio' && <Headphones className={`h-4 w-4 ${theme.icon}`} />}
                    {testimonial.type === 'whatsapp' && <MessageCircle className={`h-4 w-4 ${theme.icon}`} />}
                    <span className="uppercase tracking-wide">{testimonial.type}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= testimonial.rating
                          ? 'fill-current text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  {/* Quote */}
                  <blockquote className={`text-gray-700 italic leading-relaxed mb-6 rounded-2xl border ${theme.quote} px-6 py-5`}
                  >
                    "{testimonial.quote}"
                  </blockquote>
                  {testimonial.type === 'whatsapp' && testimonial.whatsapp?.[0]?.message && (
                    <div className={`mb-6 rounded-xl border ${theme.quote} px-4 py-3 text-sm text-emerald-800`}>
                      “{testimonial.whatsapp[0].message}”
                    </div>
                  )}
                  {testimonial.type === 'audio' && testimonial.audioUrl && (
                    <div className="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">
                      Audio highlight available in the modal.
                    </div>
                  )}
                  {testimonial.type === 'video' && testimonial.videoUrl && (
                    <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
                      Watch the full video testimonial in the modal.
                    </div>
                  )}
                  {/* University/Achievement */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Achievement:</span>
                      <span className="text-sm font-bold text-green-600">{testimonial.achievement}</span>
                    </div>
                  </div>
                  {/* Category Badge */}
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${testimonial.category === 'IGCSE' ? 'bg-primary/10 text-primary' :
                      testimonial.category === 'AS/A Level' ? 'bg-accent/15 text-accent' :
                        'bg-secondary text-foreground'
                      }`}>
                      {testimonial.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          {filteredTestimonials.length > paginatedTestimonials.length && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90 transition-colors"
              >
                Load more
              </button>
              <div className="text-sm text-gray-600">
                Showing {paginatedTestimonials.length} of {filteredTestimonials.length} testimonials
              </div>
            </div>
          )}
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials found for the selected filters.</p>
            </div>
          )}
        </div>
      </section >
      {/* Testimonial Modal */}
      {
        active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <div className={`relative z-10 w-full max-w-4xl max-h-[95vh] ${active?.type === 'video' ? 'overflow-hidden' : 'overflow-y-auto'} bg-white rounded-3xl shadow-2xl ring-1 ring-black/10`}>
              <div className="flex items-start justify-between p-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{active.name}</h2>
                  <p className="text-xs text-gray-600">
                    {active.role} • {active.subject}
                  </p>
                  <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                    {active.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {active.type === 'video' && active.videoUrl && (
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Video Testimonial</h3>
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-sm h-[40vh] md:h-[50vh] lg:h-[55vh]">
                      <iframe
                        src={active.videoUrl}
                        title={`${active.name} testimonial video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                )}
                {active.type === 'audio' && active.audioUrl && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Audio Highlight</h3>
                    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <Play className="h-6 w-6 text-green-600" />
                      <audio controls src={active.audioUrl} className="w-full" />
                    </div>
                  </div>
                )}
                {active.type === 'whatsapp' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">WhatsApp Feedback</h3>
                    {active.image && (
                      <div className="rounded-2xl overflow-hidden border border-gray-200 mb-4">
                        <img
                          src={active.image}
                          alt={`${active.name} whatsapp screenshot`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    {active.whatsapp?.length ? (
                      <div className="grid gap-4 lg:grid-cols-2">
                        {active.whatsapp.map((message, messageIndex) => (
                          <div
                            key={messageIndex}
                            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold tracking-wide text-gray-500">
                                WhatsApp
                              </span>
                              <span className="text-xs text-gray-400">📱</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {maskPhone(message.phone)}
                            </div>
                            <div className="mt-2 text-sm text-gray-600">{message.message}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No WhatsApp feedback available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
      {/* Submit Testimonial CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Share Your Success Story
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Are you a Nova Tuitions student? We'd love to hear about your journey and achievements!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://wa.me/917348956284', '_blank')}
              className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors"
            >
              Submit Your Story
            </button>
            <button
              onClick={() => window.open('https://wa.me/917348956284', '_blank')}
              className="border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div >
  );
};
export default Testimonials;