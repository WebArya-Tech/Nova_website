import React, { useState, useEffect } from 'react'
// import { runningClassesApi } from '../../api/runningClassesApi' // API file not created - using mock data
import { useAuth } from '../../context/AuthContext'

export default function RunningClasses() {
  const { user } = useAuth()
  const [selectedDay, setSelectedDay] = useState('today')
  const [todayPage, setTodayPage] = useState(1)
  const [upcomingPage, setUpcomingPage] = useState(1)
  const [todayClasses, setTodayClasses] = useState([])
  const [upcomingClasses, setUpcomingClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [joiningId, setJoiningId] = useState(null)
  const [reminderIds, setReminderIds] = useState(new Set())
  const itemsPerPage = 5

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // API file not created - using mock data directly
      try {
        // const [todayResponse, upcomingResponse] = await Promise.all([
        //   runningClassesApi.getTodayClasses(),
        //   runningClassesApi.getUpcomingClasses()
        // ])
        // setTodayClasses(todayResponse.data.classes || todayResponse.data)
        // setUpcomingClasses(upcomingResponse.data.classes || upcomingResponse.data)
        throw new Error('API not implemented')
      } catch (apiError) {
        // Fallback to mock data
        console.log('Using mock data (API not available)')
        setTodayClasses([
          {
            id: 1,
            subject: 'Mathematics',
            topic: 'Differential Equations',
            tutor: 'Ms. Ramya Rajamani',
            time: '10:00 AM - 11:30 AM',
            status: 'completed',
            duration: '90 min',
            meetingLink: 'https://meet.google.com/nova-math-001'
          },
          {
            id: 2,
            subject: 'Physics',
            topic: 'Thermodynamics - Laws',
            tutor: 'Mr. Ram G. Mohan',
            time: '2:00 PM - 3:30 PM',
            status: 'live',
            duration: '90 min',
            meetingLink: 'https://meet.google.com/nova-phy-001'
          },
          {
            id: 3,
            subject: 'Chemistry',
            topic: 'Organic Chemistry Basics',
            tutor: 'B. Aishwarya',
            time: '4:00 PM - 5:30 PM',
            status: 'upcoming',
            duration: '90 min',
            meetingLink: 'https://meet.google.com/nova-chem-001'
          }
        ])
        
        setUpcomingClasses([
          {
            id: 4,
            subject: 'Mathematics',
            topic: 'Integration Techniques',
            tutor: 'Ms. Ramya Rajamani',
            date: 'Mar 22, 2026',
            time: '11:00 AM - 12:30 PM',
            duration: '90 min',
            meetingLink: 'https://meet.google.com/nova-math-002'
          },
          {
            id: 5,
            subject: 'Physics',
            topic: 'Wave Optics',
            tutor: 'Mr. Ram G. Mohan',
            date: 'Mar 23, 2026',
            time: '10:00 AM - 11:30 AM',
            duration: '90 min',
            meetingLink: 'https://meet.google.com/nova-phy-002'
          },
          {
            id: 6,
            subject: 'Chemistry',
            topic: 'Chemical Equilibrium',
            tutor: 'B. Aishwarya',
            date: 'Mar 23, 2026',
            time: '2:00 PM - 3:30 PM',
            duration: '90 min',
            meetingLink: 'https://zoom.us/meeting/123457'
          }
        ])
      }
    } catch (err) {
      console.error('Error fetching classes:', err)
      setError('Failed to load classes')
    } finally {
      setLoading(false)
    }
  }

  const handleJoinClass = async (classId) => {
    try {
      setJoiningId(classId)
      // API not implemented - using mock action
      // await runningClassesApi.joinClass(classId)
      // Open meeting link in new tab
      const classItem = todayClasses.find(c => c.id === classId)
      if (classItem && classItem.meetingLink) {
        window.open(classItem.meetingLink, '_blank')
      }
    } catch (err) {
      console.error('Error joining class:', err)
      // Still open link even if API fails
      const classItem = todayClasses.find(c => c.id === classId)
      if (classItem && classItem.meetingLink) {
        window.open(classItem.meetingLink, '_blank')
      }
    } finally {
      setJoiningId(null)
    }
  }

  const handleSetReminder = async (classId) => {
    try {
      // API not implemented - using mock action
      // await runningClassesApi.setClassReminder(classId)
      setReminderIds(new Set([...reminderIds, classId]))
      // Show success message
      setTimeout(() => {
        setReminderIds(prev => {
          const updated = new Set(prev)
          updated.delete(classId)
          return updated
        })
      }, 2000)
    } catch (err) {
      console.error('Error setting reminder:', err)
      // Still mark as set even if API fails
      setReminderIds(new Set([...reminderIds, classId]))
      setTimeout(() => {
        setReminderIds(prev => {
          const updated = new Set(prev)
          updated.delete(classId)
          return updated
        })
      }, 2000)
    }
  }

  const handleViewRecording = (classId) => {
    alert('Recording will be available soon.')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return '#dc3545'
      case 'upcoming':
        return '#28a745'
      case 'completed':
        return '#6c757d'
      default:
        return '#196d83'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'live':
        return 'LIVE NOW'
      case 'upcoming':
        return 'Upcoming'
      case 'completed':
        return 'Completed'
      default:
        return status
    }
  }

  const liveCount = todayClasses.filter(c => c.status === 'live').length
  const upcomingCount = todayClasses.filter(c => c.status === 'upcoming').length + upcomingClasses.length

  // Pagination for Today's Classes
  const todayTotalPages = Math.ceil(todayClasses.length / itemsPerPage)
  const todayStartIndex = (todayPage - 1) * itemsPerPage
  const paginatedTodayClasses = todayClasses.slice(todayStartIndex, todayStartIndex + itemsPerPage)

  // Pagination for Upcoming Classes
  const upcomingTotalPages = Math.ceil(upcomingClasses.length / itemsPerPage)
  const upcomingStartIndex = (upcomingPage - 1) * itemsPerPage
  const paginatedUpcomingClasses = upcomingClasses.slice(upcomingStartIndex, upcomingStartIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#196d83', borderTopColor: '#ddaa2c' }}></div>
          <p className="mt-4 text-lg font-semibold text-primary">Loading classes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Running Classes</h2>
        <p className="text-gray-600 mt-2">View and join your live and upcoming classes</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#dc3545' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Live Now</h3>
          <p className="text-4xl font-bold" style={{ color: '#dc3545' }}>{liveCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Upcoming</h3>
          <p className="text-4xl font-bold" style={{ color: '#28a745' }}>{upcomingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#196d83' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Today's Classes</h3>
          <p className="text-4xl font-bold text-primary">{todayClasses.length}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedDay('today')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedDay === 'today' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: selectedDay === 'today' ? '#196d83' : 'transparent' }}
          >
            Today's Classes
          </button>
          <button
            onClick={() => setSelectedDay('upcoming')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedDay === 'upcoming' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{ backgroundColor: selectedDay === 'upcoming' ? '#196d83' : 'transparent' }}
          >
            Upcoming Classes
          </button>
        </div>
      </div>

      {/* Today's Classes */}
      {selectedDay === 'today' && (
        <div className="space-y-4">
          {paginatedTodayClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-l-4"
              style={{ borderLeftColor: getStatusColor(classItem.status) }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="px-4 py-2 rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: getStatusColor(classItem.status) }}
                    >
                      {getStatusText(classItem.status)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#ddaa2c', color: 'white' }}>
                      {classItem.subject}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">
                    {classItem.topic}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Tutor:</span>
                      <span>{classItem.tutor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Time:</span>
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Duration:</span>
                      <span>{classItem.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {classItem.status === 'live' && (
                    <button
                      onClick={() => handleJoinClass(classItem.id)}
                      disabled={joiningId === classItem.id}
                      className="px-6 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all disabled:opacity-50"
                      style={{ backgroundColor: '#dc3545' }}
                    >
                      {joiningId === classItem.id ? 'Joining...' : 'Join Now'}
                    </button>
                  )}
                  {classItem.status === 'upcoming' && (
                    <button
                      onClick={() => handleSetReminder(classItem.id)}
                      disabled={reminderIds.has(classItem.id)}
                      className="px-6 py-3 rounded-lg font-bold border-2 transition-all hover:bg-gray-50 disabled:opacity-50"
                      style={{ borderColor: '#196d83', color: '#196d83' }}
                    >
                      {reminderIds.has(classItem.id) ? 'Reminder Set!' : 'Set Reminder'}
                    </button>
                  )}
                  {classItem.status === 'completed' && (
                    <button
                      onClick={() => handleViewRecording(classItem.id)}
                      className="px-6 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all bg-primary"
                    >
                      View Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Pagination for Today's Classes */}
          {todayTotalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setTodayPage(prev => Math.max(prev - 1, 1))}
                disabled={todayPage === 1}
                className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: todayPage === 1 ? '#e0e0e0' : '#196d83',
                  color: todayPage === 1 ? '#666' : 'white'
                }}
              >
                Previous
              </button>
              {[...Array(todayTotalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setTodayPage(index + 1)}
                  className="px-4 py-2 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: todayPage === index + 1 ? '#196d83' : 'white',
                    color: todayPage === index + 1 ? 'white' : '#196d83',
                    border: '2px solid #196d83'
                  }}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setTodayPage(prev => Math.min(prev + 1, todayTotalPages))}
                disabled={todayPage === todayTotalPages}
                className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: todayPage === todayTotalPages ? '#e0e0e0' : '#196d83',
                  color: todayPage === todayTotalPages ? '#666' : 'white'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Upcoming Classes */}
      {selectedDay === 'upcoming' && (
        <div className="space-y-4">
          {paginatedUpcomingClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-l-4"
              style={{ borderLeftColor: '#28a745' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#ddaa2c', color: 'white' }}>
                      {classItem.subject}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#28a745', color: 'white' }}>
                      {classItem.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">
                    {classItem.topic}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Tutor:</span>
                      <span>{classItem.tutor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Time:</span>
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Duration:</span>
                      <span>{classItem.duration}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSetReminder(classItem.id)}
                  disabled={reminderIds.has(classItem.id)}
                  className="px-6 py-3 rounded-lg font-bold border-2 transition-all hover:bg-gray-50 disabled:opacity-50"
                  style={{ borderColor: '#196d83', color: '#196d83' }}
                >
                  {reminderIds.has(classItem.id) ? 'Reminder Set!' : 'Set Reminder'}
                </button>
              </div>
            </div>
          ))}

          {/* Pagination for Upcoming Classes */}
          {upcomingTotalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setUpcomingPage(prev => Math.max(prev - 1, 1))}
                disabled={upcomingPage === 1}
                className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: upcomingPage === 1 ? '#e0e0e0' : '#196d83',
                  color: upcomingPage === 1 ? '#666' : 'white'
                }}
              >
                Previous
              </button>
              {[...Array(upcomingTotalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setUpcomingPage(index + 1)}
                  className="px-4 py-2 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: upcomingPage === index + 1 ? '#196d83' : 'white',
                    color: upcomingPage === index + 1 ? 'white' : '#196d83',
                    border: '2px solid #196d83'
                  }}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setUpcomingPage(prev => Math.min(prev + 1, upcomingTotalPages))}
                disabled={upcomingPage === upcomingTotalPages}
                className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: upcomingPage === upcomingTotalPages ? '#e0e0e0' : '#196d83',
                  color: upcomingPage === upcomingTotalPages ? '#666' : 'white'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
