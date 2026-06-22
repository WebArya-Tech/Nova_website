import React from 'react'
import { useAuth } from '../../context/AuthContext'

interface AdminSidebarProps {
  currentView: string
  setCurrentView: (view: string) => void
  sidebarOpen: boolean
}

export default function AdminSidebar({ currentView, setCurrentView, sidebarOpen }: AdminSidebarProps) {
  const { logout } = useAuth() as any

  const menuItems = [
    { id: 'home', label: 'Dashboard' },
    { id: 'students', label: 'Students' },
    { id: 'courses', label: 'Courses' },
    { id: 'fee-payment', label: 'Fee Payments' },
    { id: 'demo-requests', label: 'Demo Requests' },
    { id: 'running-classes', label: 'Running Classes' },
    { id: 'homework', label: 'Homework' },
    { id: 'practice-tests', label: 'Practice Tests' },
    { id: 'questions', label: 'Q&A Management' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'photo-gallery', label: 'Photo Gallery' },
    { id: 'video-gallery', label: 'Video Gallery' },
    { id: 'tutors', label: 'Our Tutors' },
    { id: 'profile', label: 'Profile' }
  ]

  const handleLogout = () => {
    logout()
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <aside
      className={`fixed left-0 top-[72px] h-[calc(100vh-72px)] bg-white shadow-lg transition-transform duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '256px' }}
    >
      <nav className="flex flex-col h-full py-6">
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-all ${
                currentView === item.id
                  ? 'font-bold text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: currentView === item.id ? '#196d83' : 'transparent',
                borderLeft: currentView === item.id ? '4px solid #ddaa2c' : '4px solid transparent'
              }}
            >
              <span className="text-base">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#196d83' }}
          >
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}
