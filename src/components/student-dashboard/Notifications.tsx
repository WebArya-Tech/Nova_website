import React, { useState } from 'react'

export default function Notifications() {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'Calculus Problem Set 3 has been posted. Due date: Mar 25, 2026',
      time: '2 hours ago',
      icon: '📝',
      color: '#196d83',
      read: false
    },
    {
      id: 3,
      type: 'class',
      title: 'Class Reminder',
      message: 'Mathematics class starting in 30 minutes at 4:00 PM',
      time: '6 hours ago',
      icon: '⏰',
      color: '#ddaa2c',
      read: false
    },
    {
      id: 4,
      type: 'material',
      title: 'New Study Material',
      message: 'Chemistry notes for Chapter 9 (Organic Reactions) have been uploaded',
      time: '1 day ago',
      icon: '📄',
      color: '#196d83',
      read: true
    },
    {
      id: 5,
      type: 'announcement',
      title: 'Important Announcement',
      message: 'Physics Term-End exam scheduled for Mar 28, 2026 at 2:00 PM',
      time: '1 day ago',
      icon: '📢',
      color: '#dc3545',
      read: true
    },
    {
      id: 6,
      type: 'class',
      title: 'Class Rescheduled',
      message: 'Chemistry class on Mar 22 has been rescheduled to Mar 24 at 5:00 PM',
      time: '3 days ago',
      icon: '🗓️',
      color: '#ffc107',
      read: true
    },
    {
      id: 7,
      type: 'event',
      title: 'Free Demo Class Available',
      message: 'Attend our free demo class for CBSE Class 12 students on Mar 30, 2026',
      time: '3 days ago',
      icon: '🎓',
      color: '#ddaa2c',
      read: true
    }
  ])
  const filteredNotifications = filter === 'all'
    ? notifications
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter)

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage)

  const unreadCount = notifications.filter(n => !n.read).length
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true }
        : notification
    ))
  }
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })))
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary">Notifications</h2>
          <p className="text-gray-600 mt-2">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:opacity-90 transition-all bg-primary"
        >
          Mark All as Read
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-md">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
            filter === 'all' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'all' ? '#196d83' : 'transparent' }}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
            filter === 'unread' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'unread' ? '#dc3545' : 'transparent' }}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('assignment')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
            filter === 'assignment' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'assignment' ? '#ddaa2c' : 'transparent' }}
        >
          Assignments
        </button>
        <button
          onClick={() => setFilter('class')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
            filter === 'class' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'class' ? '#196d83' : 'transparent' }}
        >
          Classes
        </button>
        <button
          onClick={() => setFilter('announcement')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
            filter === 'announcement' ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: filter === 'announcement' ? '#dc3545' : 'transparent' }}
        >
          Announcements
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 ${
                !notification.read ? 'border-l-4' : ''
              }`}
              style={{
                borderLeftColor: !notification.read ? notification.color : '#e0e0e0',
                backgroundColor: 'white'
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1 text-primary">
                        {notification.title}
                        {!notification.read && (
                          <span
                            className="ml-3 px-2 py-1 rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: '#dc3545' }}
                          >
                            NEW
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all border-2"
                      style={{
                        borderColor: notification.color,
                        color: notification.color,
                        backgroundColor: 'transparent'
                      }}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <h3 className="text-2xl font-bold mb-2 text-primary">
              No Notifications
            </h3>
            <p className="text-gray-600">You're all caught up! No notifications to show.</p>
          </div>
        )}
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
