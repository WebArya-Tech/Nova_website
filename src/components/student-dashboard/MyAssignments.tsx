import React, { useState, useEffect } from 'react'
// import { homeworkApi } from '../../api/homeworkApi' // API file not created - using mock data
import { useAuth } from '../../context/AuthContext'

export default function MyAssignments() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submittingId, setSubmittingId] = useState(null)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const itemsPerPage = 5

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load from localStorage first
      const saved = localStorage.getItem('nova_assignments')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) {
          setAssignments(parsed)
          setLoading(false)
          return
        }
      }

      // API file not created - using mock data directly
      try {
        // const response = await homeworkApi.getStudentAssignments()
        // setAssignments(response.data.assignments || response.data)
        throw new Error('API not implemented')
      } catch (apiError) {
        // Fallback to mock data
        console.log('Using mock data (API not available)')
        setAssignments([
          {
            id: 1,
            title: 'Calculus Problem Set 3',
            course: 'Mathematics - Calculus',
            courseIcon: '📐',
            dueDate: 'Mar 25, 2026',
            daysLeft: 6,
            status: 'pending',
            priority: 'high',
            description: 'Solve problems 1-15 from Chapter 5: Integration',
            points: 100,
            attachments: 2
          },
          {
            id: 2,
            title: 'Physics Lab Report',
            course: 'Physics - Mechanics',
            courseIcon: '⚡',
            dueDate: 'Mar 23, 2026',
            daysLeft: 4,
            status: 'pending',
            priority: 'high',
            description: 'Submit lab report on Projectile Motion experiment',
            points: 50,
            attachments: 1
          },
          {
            id: 3,
            title: 'Chemistry Quiz 2',
            course: 'Chemistry - Organic',
            courseIcon: '🧪',
            dueDate: 'Mar 28, 2026',
            daysLeft: 9,
            status: 'pending',
            priority: 'medium',
            description: 'Online quiz covering Organic Chemistry chapters 3-5',
            points: 30,
            attachments: 0
          },
          {
            id: 4,
            title: 'Algebra & Trigonometry Set 1',
            course: 'Mathematics - Algebra',
            courseIcon: '📏',
            dueDate: 'Apr 1, 2026',
            daysLeft: 13,
            status: 'pending',
            priority: 'medium',
            description: 'Solve all trigonometric identities from Chapter 4',
            points: 100,
            attachments: 1
          },
          {
            id: 5,
            title: 'Linear Algebra Assignment',
            course: 'Mathematics - Calculus',
            courseIcon: '📐',
            dueDate: 'Submitted on Mar 15',
            daysLeft: null,
            status: 'submitted',
            priority: null,
            description: 'Matrix operations and transformations',
            points: 100,
            grade: 92,
            attachments: 2
          }
        ])
      }
    } catch (err) {
      console.error('Error fetching assignments:', err)
      setError('Failed to load assignments')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAssignment = (assignmentId) => {
    const submittedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    const updated = assignments.map(a =>
      a.id === assignmentId
        ? { ...a, status: 'submitted', daysLeft: null, dueDate: `Submitted on ${submittedDate}` }
        : a
    )
    setAssignments(updated)
    localStorage.setItem('nova_assignments', JSON.stringify(updated))
    setShowSubmitModal(false)
    alert('Assignment submitted successfully!')
  }

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment)
    setShowSubmitModal(true)
  }

  const filteredAssignments = filter === 'all'
    ? assignments
    : assignments.filter(assignment => assignment.status === filter)

  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAssignments = filteredAssignments.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#dc3545'
      case 'submitted':
        return '#28a745'
      default:
        return '#ddaa2c'
    }
  }

  const getPriorityBadge = (priority) => {
    if (!priority) return null
    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: priority === 'high' ? '#dc3545' : '#ddaa2c' }}
      >
        {priority === 'high' ? 'High Priority' : 'Medium'}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#196d83', borderTopColor: '#ddaa2c' }}></div>
          <p className="mt-4 text-lg font-semibold text-primary">Loading assignments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary">My Assignments</h2>
          <p className="text-gray-600 mt-2">Manage your assignments and submissions</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderLeftColor: '#dc3545' }}>
          <h3 className="text-2xl font-bold" style={{ color: '#dc3545' }}>
            {assignments.filter(a => a.status === 'pending').length}
          </h3>
          <p className="text-gray-600 text-sm">Pending</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-2xl font-bold" style={{ color: '#28a745' }}>
            {assignments.filter(a => a.status === 'submitted').length}
          </h3>
          <p className="text-gray-600 text-sm">Submitted</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4" style={{ borderLeftColor: '#196d83' }}>
          <h3 className="text-2xl font-bold text-primary">
            {assignments.length}
          </h3>
          <p className="text-gray-600 text-sm">Total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md">
        <button
          onClick={() => { setFilter('all'); setCurrentPage(1) }}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'all' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'all' ? '#196d83' : 'transparent' }}
        >
          All
        </button>
        <button
          onClick={() => { setFilter('pending'); setCurrentPage(1) }}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'pending' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'pending' ? '#dc3545' : 'transparent' }}
        >
          Pending
        </button>
        <button
          onClick={() => { setFilter('submitted'); setCurrentPage(1) }}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'submitted' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'submitted' ? '#28a745' : 'transparent' }}
        >
          Submitted
        </button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {paginatedAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4"
            style={{ borderLeftColor: getStatusColor(assignment.status) }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  style={{ backgroundColor: assignment.status === 'submitted' ? '#28a745' : '#196d83' }}
                >
                  {assignment.course ? assignment.course.charAt(0) : 'A'}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-primary">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                      <p className="text-sm text-gray-700">{assignment.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {getPriorityBadge(assignment.priority)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                <p className="text-xs text-gray-600 mb-1">Due Date</p>
                <p className="font-bold text-sm text-gray-800">{assignment.dueDate}</p>
                {assignment.daysLeft && (
                  <p className="text-xs mt-1" style={{ color: assignment.daysLeft <= 5 ? '#dc3545' : '#28a745' }}>
                    {assignment.daysLeft} days left
                  </p>
                )}
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                <p className="text-xs text-gray-600 mb-1">Points</p>
                <p className="font-bold text-sm text-gray-800">{assignment.points}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                <p className="text-xs text-gray-600 mb-1">Attachments</p>
                <p className="font-bold text-sm text-gray-800">{assignment.attachments}</p>
              </div>
              {assignment.grade !== undefined && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#e8f5e9' }}>
                  <p className="text-xs text-gray-600 mb-1">Grade</p>
                  <p className="font-bold text-sm" style={{ color: '#28a745' }}>
                    {assignment.grade}/{assignment.points} ({Math.round((assignment.grade / assignment.points) * 100)}%)
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {assignment.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleViewDetails(assignment)}
                    className="px-6 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 bg-primary"
                  >
                    Submit Assignment
                  </button>
                  <button
                    className="px-6 py-2 rounded-lg font-semibold transition-all border-2 hover:bg-gray-50"
                    style={{
                      borderColor: '#196d83',
                      color: '#196d83',
                      backgroundColor: 'transparent'
                    }}
                  >
                    View Details
                  </button>
                </>
              )}
              {assignment.status === 'submitted' && (
                <button
                  className="px-6 py-2 rounded-lg font-semibold text-white transition-all"
                  style={{ backgroundColor: '#ffc107' }}
                >
                  Waiting for Grade
                </button>
              )}
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

      {/* Submit Modal */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Submit: {selectedAssignment.title}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Files
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setSelectedAssignment({ ...selectedAssignment, files: e.target.files })
                  }}
                  className="block w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  className="block w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="Add any comments..."
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 px-4 py-2 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: '#196d83', color: '#196d83' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitAssignment(selectedAssignment.id)}
                disabled={submittingId === selectedAssignment.id}
                className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 bg-primary"
              >
                {submittingId === selectedAssignment.id ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
