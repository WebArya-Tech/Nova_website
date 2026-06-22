import React from 'react'
import { useAuth } from '../../context/AuthContext'

interface StudentSidebarProps {
  currentView: string
  setCurrentView: (view: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function StudentSidebar({ currentView, setCurrentView, sidebarOpen, setSidebarOpen }: StudentSidebarProps) {
  const { logout } = useAuth() as any
  
  const menuItems = [
    { id: 'home', label: 'Dashboard' },
    { id: 'courses', label: 'My Courses' },
    { id: 'homework', label: 'Homework' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'practiceTests', label: 'Practice Tests' },
    { id: 'askQuestion', label: 'Ask a Question' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'feePayment', label: 'Fee Payment' },
    { id: 'support', label: 'Support & Help' },
  ]

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <aside
      className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white shadow-lg transition-transform duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '256px' }}
    >
      <nav className="flex flex-col h-full py-4">
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-primary text-white font-bold shadow-sm border-l-4 border-accent'
                  : 'text-foreground hover:bg-primary/5 hover:text-primary border-l-4 border-transparent'
              }`}
            >
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-4 py-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-white font-semibold transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}
