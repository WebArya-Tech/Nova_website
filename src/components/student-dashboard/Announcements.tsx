import React, { useState, useEffect } from 'react'

const STATIC_ANNOUNCEMENTS = [
  { id: 'static1', title: 'Important: Term-End Exam Schedule Released', message: 'The term-end examination schedule for all subjects has been released. Please check your schedule section for detailed timings and exam centres.', category: 'exam', priority: 'high', date: '2 hours ago', postedBy: 'Admin' },
  { id: 'static2', title: 'Holiday Notice - Holi', message: 'Nova Tuitions online classes will remain suspended on March 25, 2026 on account of Holi. Classes will resume on March 26, 2026.', category: 'holiday', priority: 'medium', date: '1 day ago', postedBy: 'Admin' },
  { id: 'static3', title: 'New Course Materials Uploaded', message: 'New study materials for Mathematics and Physics have been uploaded to the course section. Students are advised to download and review them before the next class.', category: 'academic', priority: 'medium', date: '2 days ago', postedBy: 'Academic Dept' },
  { id: 'static4', title: 'Fee Payment Reminder', message: 'This is a reminder that the last date for Term 2 fee payment is April 5, 2026. Please clear your dues before the deadline to avoid late fees.', category: 'payment', priority: 'high', date: '3 days ago', postedBy: 'Accounts Dept' },
]

const loadAnnouncements = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('nova_announcements') || 'null')
    if (saved && saved.length > 0) {
      // Map admin format to student display format
      const mapped = saved.map(a => ({
        ...a,
        date: a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN') : 'Recent',
        postedBy: 'Admin',
        category: a.category || 'general',
        priority: a.priority || 'medium',
      }))
      // Put admin announcements first, then static ones not already covered
      return mapped
    }
  } catch {}
  return STATIC_ANNOUNCEMENTS
}

export default function Announcements() {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [announcements, setAnnouncements] = useState(loadAnnouncements)
  const itemsPerPage = 5

  // Reload if admin updates announcements while student is logged in
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncements(loadAnnouncements())
    }, 5000) // Refresh every 5s
    return () => clearInterval(interval)
  }, [])

  const filteredAnnouncements = filter === 'all'
    ? announcements
    : announcements.filter(a => a.category === filter)

  // Pagination
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, startIndex + itemsPerPage)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#dc3545'
      case 'medium':
        return '#ffc107'
      case 'low':
        return '#28a745'
      default:
        return '#196d83'
    }
  }

  const getCategoryIcon = (category) => {
    return null
  }

  const getCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  const highPriorityCount = announcements.filter(a => a.priority === 'high').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Announcements</h2>
        <p className="text-gray-600 mt-2">Stay updated with important notices and updates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#196d83' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Announcements</h3>
          <p className="text-4xl font-bold text-primary">{announcements.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#dc3545' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">High Priority</h3>
          <p className="text-4xl font-bold" style={{ color: '#dc3545' }}>{highPriorityCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">This Week</h3>
          <p className="text-4xl font-bold" style={{ color: '#28a745' }}>5</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filter === 'all' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: filter === 'all' ? '#196d83' : 'transparent' }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('exam')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filter === 'exam' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: filter === 'exam' ? '#196d83' : 'transparent' }}
          >
            Exam
          </button>
          <button
            onClick={() => setFilter('academic')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filter === 'academic' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: filter === 'academic' ? '#196d83' : 'transparent' }}
          >
            Academic
          </button>
          <button
            onClick={() => setFilter('class')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filter === 'class' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: filter === 'class' ? '#196d83' : 'transparent' }}
          >
            Class
          </button>
          <button
            onClick={() => setFilter('event')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filter === 'event' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: filter === 'event' ? '#196d83' : 'transparent' }}
          >
            Events
          </button>
          <button
            onClick={() => setFilter('payment')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              filter === 'payment' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: filter === 'payment' ? '#196d83' : 'transparent' }}
          >
            Payment
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {paginatedAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-l-4"
            style={{ borderLeftColor: getPriorityColor(announcement.priority) }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-primary">
                        {announcement.title}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                      >
                        {announcement.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#ddaa2c', color: 'white' }}>
                        {getCategoryName(announcement.category)}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">{announcement.date}</span>
                </div>
                <p className="text-gray-700 mb-3">{announcement.message}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">Posted by:</span>
                  <span>{announcement.postedBy}</span>
                </div>
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

      {filteredAnnouncements.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <h3 className="text-2xl font-bold mb-2 text-primary">
            No Announcements
          </h3>
          <p className="text-gray-600">No announcements found for this category.</p>
        </div>
      )}
    </div>
  )
}
