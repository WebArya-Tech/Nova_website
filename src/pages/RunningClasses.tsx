import { useState, useEffect } from 'react'
import { Clock, Users, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/auth/LoginModal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScheduleFreeDemoModal from '../components/ScheduleFreeDemoModal'
import toast from 'react-hot-toast'
import { runningClassesApi } from '../api/runningClassesApi'

export default function RunningClasses() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const { isAuthenticated, user } = useAuth()
  const [runningClasses, setRunningClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(true)

  const FALLBACK_CLASSES = [
    // Grade 10 Board Classes
    { id: 1, subject: 'Class 10 Mathematics (CBSE)', level: 'Grade 10 Board', schedule: 'Mon, Wed, Fri - 5:00 PM IST', students: '8-12', instructor: 'Ms. Neha Aggarwal', description: 'Complete CBSE Grade 10 Mathematics Board preparation with concept clarity and practice', status: 'Active', board: 'CBSE' },
    { id: 2, subject: 'Class 10 Science (CBSE)', level: 'Grade 10 Board', schedule: 'Tue, Thu, Sat - 5:00 PM IST', students: '8-12', instructor: 'B. Aishwarya', description: 'Physics, Chemistry, Biology for CBSE Grade 10 Board examinations', status: 'Active', board: 'CBSE' },
    { id: 3, subject: 'Class 10 Mathematics (ICSE)', level: 'Grade 10 Board', schedule: 'Mon, Wed, Fri - 6:00 PM IST', students: '8-12', instructor: 'Ms. Ramya Rajamani', description: 'Complete ICSE Grade 10 Mathematics Board preparation', status: 'Active', board: 'ICSE' },
    { id: 4, subject: 'Class 10 Science (ICSE)', level: 'Grade 10 Board', schedule: 'Tue, Thu, Sat - 6:00 PM IST', students: '8-12', instructor: 'Mr. K. V. Bala Subramanyam', description: 'ICSE Physics, Chemistry, Biology Board preparation', status: 'Active', board: 'ICSE' },
    
    // Grade 11 Classes
    { id: 5, subject: 'Class 11 Physics (CBSE)', level: 'Grade 11', schedule: 'Mon, Wed, Fri - 7:00 PM IST', students: '8-12', instructor: 'Mr. Ram G. Mohan', description: 'Grade 11 CBSE Physics with concept clarity and numerical practice', status: 'Active', board: 'CBSE' },
    { id: 6, subject: 'Class 11 Chemistry (CBSE)', level: 'Grade 11', schedule: 'Tue, Thu, Sat - 7:00 PM IST', students: '8-12', instructor: 'B. Aishwarya', description: 'Physical, Organic and Inorganic Chemistry for Grade 11 CBSE', status: 'Active', board: 'CBSE' },
    { id: 7, subject: 'Class 11 Mathematics (CBSE)', level: 'Grade 11', schedule: 'Mon, Wed, Fri - 4:00 PM IST', students: '8-12', instructor: 'Ms. Neha Aggarwal', description: 'Advanced Mathematics for Grade 11 CBSE students', status: 'Active', board: 'CBSE' },
    { id: 8, subject: 'Class 11 Biology (CBSE)', level: 'Grade 11', schedule: 'Tue, Thu - 4:00 PM IST', students: '8-12', instructor: 'Mr. Shambhu M. G', description: 'Complete Biology coverage for NEET and Grade 11 Board', status: 'Active', board: 'CBSE' },
    
    // Grade 12 Board Classes
    { id: 9, subject: 'Class 12 Physics (CBSE)', level: 'Grade 12 Board', schedule: 'Mon, Wed, Fri - 8:00 PM IST', students: '8-12', instructor: 'Mr. Ram G. Mohan', description: 'Complete Grade 12 CBSE Physics Board preparation for JEE and Board exams', status: 'Active', board: 'CBSE' },
    { id: 10, subject: 'Class 12 Chemistry (CBSE)', level: 'Grade 12 Board', schedule: 'Tue, Thu, Sat - 8:00 PM IST', students: '8-12', instructor: 'Mr. Rakesh', description: 'CBSE Grade 12 Chemistry for Board and NEET preparation', status: 'Active', board: 'CBSE' },
    { id: 11, subject: 'Class 12 Mathematics (CBSE)', level: 'Grade 12 Board', schedule: 'Mon, Wed, Fri - 6:30 PM IST', students: '8-12', instructor: 'Ms. Ramya Rajamani', description: 'Advanced Mathematics for CBSE Grade 12 Board examinations', status: 'Active', board: 'CBSE' },
    { id: 12, subject: 'Class 12 Biology (CBSE)', level: 'Grade 12 Board', schedule: 'Tue, Thu, Sat - 6:30 PM IST', students: '8-12', instructor: 'Mr. Shambhu M. G', description: 'Complete Biology for NEET and CBSE Grade 12 Board', status: 'Active', board: 'CBSE' },
  ]

  // Fetch running classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true)
        const res = await runningClassesApi.getAll()
        const data = res.data?.data || res.data || []
        const active = Array.isArray(data)
          ? data.filter(c => (c.status === 'Active' || c.status === 'active'))
          : []
        if (active.length > 0) {
          setRunningClasses(active)
        } else {
          throw new Error('empty')
        }
      } catch {
        // Fallback: localStorage → hardcoded defaults
        try {
          const saved = JSON.parse(localStorage.getItem('icfy_running_classes') || 'null')
          if (saved && saved.length > 0) {
            setRunningClasses(saved.filter(c => c.status === 'Active' || c.status === 'active'))
          } else {
            setRunningClasses(FALLBACK_CLASSES)
          }
        } catch {
          setRunningClasses(FALLBACK_CLASSES)
        }
      } finally {
        setLoadingClasses(false)
      }
    }
    fetchClasses()
  }, [])

  const handleFreeDemoClick = (classSubject) => {
    setSelectedClass(classSubject)
    setShowDemoModal(true)
  }

  const handleContactUs = () => {
    // Open WhatsApp with the official iThinkLearn number
    window.open('https://wa.me/918197466607', '_blank')
  }

  const benefits = [
    {
      title: 'Small Batch Classes',
      description: 'Personalized attention with limited class size ensures every student gets mentored effectively'
    },
    {
      title: 'Flexible Timings',
      description: 'Classes scheduled at convenient times for Indian and international students across time zones'
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from seasoned educators with 10+ years of teaching experience and strong subject expertise'
    },
    {
      title: 'Structured Curriculum',
      description: 'Carefully designed course content aligned with academic standards and examination patterns'
    },
    {
      title: 'Interactive Learning',
      description: 'Doubt-clearing sessions, live interactions, and real-time feedback during every class'
    },
    {
      title: 'Class Recordings',
      description: 'Access recorded sessions anytime for revision and to catch up on missed classes'
    },
    {
      title: 'Assignments & Tests',
      description: 'Regular practice assignments and tests to monitor progress and identify learning gaps'
    },
    {
      title: 'Progress Tracking',
      description: 'Periodic evaluations and detailed feedback to help you stay on track with your goals'
    }
  ]

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-8 sm:py-8 md:py-8 lg:py-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
            alt="Students learning in a classroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary-dark/65 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Running <span className="text-accent">Classes</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Join our active online classes with expert instructors, structured curriculum, and personalized guidance across multiple subjects and levels
            </p>
            <button
              onClick={() => handleFreeDemoClick('Running Classes')}
              className="bg-accent text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-accent/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Book Free Demo
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-8 sm:py-10 bg-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Real-Time Learning with Expert Mentors
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                iThinkLearn's running classes are live, interactive learning sessions designed to provide students with expert guidance, structured content delivery, and personalized mentoring. Whether you're pursuing undergraduate courses, professional certifications, or competitive exams, our running classes offer the right learning environment.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Classes are conducted by highly qualified educators with extensive teaching experience. Each session emphasizes conceptual clarity, problem-solving skills, and exam preparation with regular doubt-clearing and interactive discussions.
              </p>
              <div className="flex gap-2 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow">
                  <Users size={20} className="text-blue-700 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">8-18 per batch</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow">
                  <Clock size={20} className="text-blue-700 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">Flexible timing</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow">
                  <Zap size={20} className="text-blue-700 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">Live interaction</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://media.istockphoto.com/id/980786884/photo/coaching-and-mentoring-concept-chart-with-keywords-and-icons.jpg?s=612x612&w=0&k=20&c=4Ai_lvfChwkgVbdLI2Nz_3PPDNgzJKFVdJUim8nGLUI="
                alt="Running Classes"
                className="w-full max-w-xs sm:max-w-md rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Why Join Our Running Classes?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition border-l-4 border-blue-600">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Classes Section */}
      <section className="py-8 sm:py-10 bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2 sm:mb-3">Currently Active Classes</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-2">
            Browse our live and upcoming classes across various subjects and levels
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {loadingClasses ? (
              <div className="col-span-full text-center py-12 text-blue-900 font-semibold text-lg">Loading classes...</div>
            ) : runningClasses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">No active classes at the moment. Check back soon!</div>
            ) : runningClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition border-l-4 border-blue-600 h-full flex flex-col">
                {/* Class image - only show if URL exists */}
                {classItem.image && (
                  <img
                    src={classItem.image}
                    alt={classItem.subject}
                    className="w-full h-32 sm:h-40 object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    {classItem.subject}
                  </h3>
                  
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                      {classItem.level}
                    </span>
                    {classItem.difficultyLevel && (
                      <span className={`inline-block text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ${
                        classItem.difficultyLevel === 'Beginner' ? 'bg-green-600' :
                        classItem.difficultyLevel === 'Intermediate' ? 'bg-blue-600' :
                        classItem.difficultyLevel === 'Advanced' ? 'bg-orange-600' :
                        'bg-red-600'
                      }`}>
                        {classItem.difficultyLevel}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {classItem.description}
                  </p>

                  {/* Topics */}
                  {classItem.topics && (
                    <div className="mb-2 pb-2 border-b border-gray-100">
                      <p className="text-xs text-gray-600 font-semibold">Topics</p>
                      <p className="text-xs text-gray-700 line-clamp-1">{classItem.topics}</p>
                    </div>
                  )}

                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 pt-2 sm:pt-3 text-xs sm:text-sm text-gray-600">
                    <p><strong className="text-gray-900">Instructor:</strong> {classItem.instructor}</p>
                    {classItem.schedule && <p><strong className="text-gray-900">Schedule:</strong> {classItem.schedule}</p>}
                    {classItem.duration && <p><strong className="text-gray-900">Duration:</strong> {classItem.duration}</p>}
                    {classItem.startDate && <p><strong className="text-gray-900">Start:</strong> {new Date(classItem.startDate).toLocaleDateString()}</p>}
                  </div>

                  {/* Enrollment Status Bar */}
                  {classItem.maxCapacity && (
                    <div className="mb-3 sm:mb-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-700">Availability:</span>
                        <span className="text-xs font-bold text-gray-900">
                          {classItem.currentEnrollment || 0}/{classItem.maxCapacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            ((classItem.currentEnrollment || 0) / classItem.maxCapacity) > 0.8 ? 'bg-red-500' :
                            ((classItem.currentEnrollment || 0) / classItem.maxCapacity) > 0.5 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{width: `${Math.min(((classItem.currentEnrollment || 0) / classItem.maxCapacity) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold text-white bg-green-700 whitespace-nowrap">
                      {classItem.status}
                    </span>
                    <button
                      onClick={() => handleFreeDemoClick(classItem.subject)}
                      className="text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 transition whitespace-nowrap ml-2"
                    >
                      Free Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 sm:py-10 bg-blue-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">How Our Classes Work</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '1', title: 'Choose Your Class', desc: 'Browse available classes and select the one matching your subject and schedule' },
              { step: '2', title: 'Enroll & Access', desc: 'Complete enrollment and get instant access to class materials and schedule' },
              { step: '3', title: 'Attend & Interact', desc: 'Join live classes, participate in discussions, and ask doubts in real-time' },
              { step: '4', title: 'Learn & Grow', desc: 'Receive feedback, track progress, and improve with continuous guidance' }
            ].map((item, idx) => (
              <div key={idx} className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white bg-blue-800 mx-auto mb-3 sm:mb-4">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 px-2">
              Ready to start your learning journey with live, interactive classes?
            </p>
            <button
              onClick={handleContactUs}
              className="bg-linear-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Contact Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Schedule Free Demo Modal */}
      <ScheduleFreeDemoModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        classSubject={selectedClass}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onOpenSignup={() => setShowLoginModal(false)}
        onOpenForgotPassword={() => setShowLoginModal(false)}
      />

      <Footer />
    </div>
  )
}
