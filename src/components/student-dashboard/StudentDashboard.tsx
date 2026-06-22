import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.tsx'
import StudentSidebar from './StudentSidebar'
import DashboardHome from './DashboardHome'
import MyCourses from './MyCourses'
import MyAssignments from './MyAssignments'
import MyProfile from './MyProfile'
import Notifications from './Notifications'
import SupportHelp from './SupportHelp'
import Homework from './Homework'
import PracticeTests from './PracticeTests'
import AskQuestion from './AskQuestion.tsx'
import Announcements from './Announcements'
import FeePayment from './FeePayment'
import FeedbackReviews from './FeedbackReviews'
import logoImage from '@/assets/nova-logo.jpg'

export default function StudentDashboard() {
  const { user, isLoading } = useAuth() as any
  const [currentView, setCurrentView] = useState<string>('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Show loading screen while auth is being verified
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg font-semibold text-primary">Loading...</p>
        </div>
      </div>
    )
  }

  // Student data from auth context
  const studentData = {
    name: user.fullName,
    email: user.email,
    phone: user.phone || '',
    studentId: user.studentId,
    enrollmentDate: user.enrollmentDate,
    profileImage: '',
    courses: 5,
    assignments: 12,
    completedAssignments: 8
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome studentData={studentData} setCurrentView={setCurrentView} />
      case 'courses':
        return <MyCourses />
      case 'homework':
        return <Homework />
      case 'assignments':
        return <MyAssignments />
      case 'practiceTests':
        return <PracticeTests />
      case 'askQuestion':
        return <AskQuestion />
      case 'announcements':
        return <Announcements />
      case 'notifications':
        return <Notifications />
      case 'feePayment':
        return <FeePayment />
      case 'feedback':
        return <FeedbackReviews />
      case 'profile':
        return <MyProfile studentData={studentData} />
      case 'support':
        return <SupportHelp />
      default:
        return <DashboardHome studentData={studentData} setCurrentView={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="shadow-md sticky top-0 z-50 bg-gradient-to-r from-primary to-primary/90">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src={logoImage} alt="Nova Tuitions" className="h-10 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:inline">Student Portal</span>
          </div>
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <button
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2 transition cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg border-2 border-accent bg-accent">
                {studentData.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="hidden md:block text-white">
                <p className="font-semibold text-sm">{studentData.name}</p>
                <p className="text-xs opacity-80">{studentData.studentId}</p>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <StudentSidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}
