import React, { useState, useEffect } from 'react'
// import { courseApi } from '../../api/courseApi' // API file not created - using mock data
import { useAuth } from '../../context/AuthContext'

export default function MyCourses() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enrollingId, setEnrollingId] = useState(null)
  const [showMaterialsId, setShowMaterialsId] = useState(null)
  const itemsPerPage = 5

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      // API file not created - using mock data directly
      try {
        // const response = await courseApi.getStudentCourses()
        // setCourses(response.data.courses || response.data)
        throw new Error('API not implemented')
      } catch (apiError) {
        // Fallback to mock data if API is not available
        console.log('Using mock data (API not available)')
        setCourses([
          {
            id: 1,
            title: 'Mathematics - Calculus & Integration',
            tutor: 'Ms. Ramya Rajamani',
            progress: 75,
            totalClasses: 40,
            completedClasses: 30,
            upcomingClass: 'Today, 4:00 PM',
            status: 'active',
            image: '📐',
            category: 'Mathematics'
          },
          {
            id: 2,
            title: 'Physics - Mechanics & Electromagnetism',
            tutor: 'Mr. Ram G. Mohan',
            progress: 60,
            totalClasses: 35,
            completedClasses: 21,
            upcomingClass: 'Tomorrow, 3:00 PM',
            status: 'active',
            image: '⚡',
            category: 'Physics'
          },
          {
            id: 3,
            title: 'Chemistry - Organic & Inorganic',
            tutor: 'B. Aishwarya',
            progress: 85,
            totalClasses: 30,
            completedClasses: 25,
            upcomingClass: 'Mar 23, 5:00 PM',
            status: 'active',
            image: '🧪',
            category: 'Chemistry'
          },
          {
            id: 4,
            title: 'Mathematics - Algebra & Trigonometry',
            tutor: 'Mr. Ashwin Jain',
            progress: 45,
            totalClasses: 38,
            completedClasses: 17,
            upcomingClass: 'Mar 24, 2:00 PM',
            status: 'active',
            image: '📏',
            category: 'Mathematics'
          },
          {
            id: 5,
            title: 'Statistics & Probability',
            tutor: 'Ms. Ramya Rajamani',
            progress: 100,
            totalClasses: 25,
            completedClasses: 25,
            upcomingClass: 'Completed',
            status: 'completed',
            image: '📊',
            category: 'Mathematics'
          }
        ])
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollCourse = async (courseId) => {
    alert('Enrollment request sent! Our team will contact you shortly.')
  }

  const handleViewMaterials = (courseId) => {
    alert('Course materials will be available soon.')
  }

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.status === filter)

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#196d83', borderTopColor: '#ddaa2c' }}></div>
          <p className="mt-4 text-lg font-semibold text-primary">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary">My Courses</h2>
          <p className="text-gray-600 mt-2">Track your enrolled courses and progress</p>
        </div>
        <button
          className="px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all bg-accent"
        >
          + Enroll New Course
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md">
        <button
          onClick={() => { setFilter('all'); setCurrentPage(1) }}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'all' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'all' ? '#196d83' : 'transparent' }}
        >
          All Courses ({courses.length})
        </button>
        <button
          onClick={() => { setFilter('active'); setCurrentPage(1) }}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'active' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'active' ? '#ddaa2c' : 'transparent' }}
        >
          Active ({courses.filter(c => c.status === 'active').length})
        </button>
        <button
          onClick={() => { setFilter('completed'); setCurrentPage(1) }}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'completed' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'completed' ? '#28a745' : 'transparent' }}
        >
          Completed ({courses.filter(c => c.status === 'completed').length})
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border-t-4"
            style={{ borderTopColor: course.status === 'completed' ? '#28a745' : '#196d83' }}
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md"
                  style={{ backgroundColor: course.status === 'completed' ? '#28a745' : '#196d83' }}
                >
                  {course.category ? course.category.charAt(0) : course.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 text-primary">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm">Tutor: {course.tutor}</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{
                    backgroundColor: course.status === 'completed' ? '#28a745' : '#ddaa2c',
                    color: 'white'
                  }}
                >
                  {course.status === 'completed' ? 'Completed' : 'Active'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-primary">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.status === 'completed' ? '#28a745' : '#ddaa2c'
                    }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                  <p className="text-xs text-gray-600 mb-1">Classes</p>
                  <p className="font-bold text-gray-800">
                    {course.completedClasses}/{course.totalClasses}
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                  <p className="text-xs text-gray-600 mb-1">Next Class</p>
                  <p className="font-bold text-gray-800 text-sm">{course.upcomingClass}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  className="flex-1 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 bg-primary"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleViewMaterials(course.id)}
                  className="flex-1 py-2 rounded-lg font-semibold transition-all border-2 hover:bg-gray-50"
                  style={{ 
                    borderColor: '#196d83',
                    color: '#196d83',
                    backgroundColor: 'transparent'
                  }}
                >
                  Materials
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: currentPage === 1 ? '#e0e0e0' : '#196d83',
              color: currentPage === 1 ? '#666' : 'white'
            }}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className="px-4 py-2 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: currentPage === index + 1 ? '#196d83' : 'white',
                color: currentPage === index + 1 ? 'white' : '#196d83',
                border: '2px solid #196d83'
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#196d83',
              color: currentPage === totalPages ? '#666' : 'white'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
