import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import AdminSidebar from './AdminSidebar'
import AdminHome from './AdminHome'
import StudentManagement from './StudentManagement'
import QuestionManagement from './QuestionManagement'
import DemoClassRequests from './DemoClassRequests'
import CourseManagement from './CourseManagement'
import FeePaymentManagement from './FeePaymentManagement'
import FeedbackManagement from './FeedbackManagement'
import PracticeTestManagement from './PracticeTestManagement'
import HomeworkManagement from './HomeworkManagement'
import TestimonialManagement from './TestimonialManagement'
import AnnouncementManagement from './AnnouncementManagement'
import { BlogModerationPage } from './BlogModerationPage'
import { SubscribersPage } from './SubscribersPage'
import { CommentManagement } from './CommentManagement'
import BlogDashboard from './BlogDashboard'
import AdminProfile from './AdminProfile'
import AdminNotifications from './AdminNotifications'
import PhotoGalleryManagement from './PhotoGalleryManagement'
import VideoGalleryManagement from './VideoGalleryManagement'
import TutorManagement from './TutorManagement'
import logoImage from '@/assets/nova-logo.jpg'

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading, isAdmin } = useAuth() as any
  const [currentView, setCurrentViewState] = useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const viewFromUrl = urlParams.get('view')
    return viewFromUrl || localStorage.getItem('adminCurrentView') || 'home'
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const setCurrentView = (view: string) => {
    setCurrentViewState(view)
    localStorage.setItem('adminCurrentView', view)
  }

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const urlParams = new URLSearchParams(window.location.search)
      const viewFromUrl = urlParams.get('view') || 'home'
      setCurrentViewState(viewFromUrl)
      localStorage.setItem('adminCurrentView', viewFromUrl)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Clear saved view when logging out
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      localStorage.removeItem('adminCurrentView')
    }
  }, [isAuthenticated, isAdmin])

  // Show loading screen while auth is being verified
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#196d83', borderTopColor: '#ddaa2c' }}></div>
          <p className="mt-4 text-lg font-semibold" style={{ color: '#196d83' }}>Loading...</p>
        </div>
      </div>
    )
  }

  const adminData = {
    name: user?.fullName || 'Admin',
    email: user?.email || 'admin@nova.com',
    role: 'Administrator',
    adminId: user?.adminId || user?.id || 'ADMIN001'
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <AdminHome setCurrentView={setCurrentView} />
      case 'students':
        return <StudentManagement />
      case 'courses':
        return <CourseManagement />
      case 'questions':
        return <QuestionManagement />
      case 'demo-requests':
        return <DemoClassRequests />
      case 'homework':
        return <HomeworkManagement />
      case 'practice-tests':
        return <PracticeTestManagement />
      case 'notifications':
        return <AdminNotifications />
      case 'fee-payment':
        return <FeePaymentManagement />
      case 'feedback':
        return <FeedbackManagement />
      case 'testimonials':
        return <TestimonialManagement />
      case 'announcements':
        return <AnnouncementManagement />
      case 'blog':
        return <BlogDashboard setCurrentView={setCurrentView} />
      case 'blogs':
        return <BlogModerationPage onBack={() => setCurrentView('blog')} />
      case 'subscribers':
        return <SubscribersPage onBack={() => setCurrentView('blog')} />
      case 'comment-management':
        return <CommentManagement onBack={() => setCurrentView('blog')} />
      case 'photo-gallery':
        return <PhotoGalleryManagement />
      case 'video-gallery':
        return <VideoGalleryManagement />
      case 'tutors':
        return <TutorManagement />
      case 'profile':
        return <AdminProfile adminData={adminData} />
      default:
        return <AdminHome setCurrentView={setCurrentView} />
    }
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="shadow-md h-[72px] fixed top-0 left-0 right-0 z-50 bg-primary">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg transition text-white hover:bg-white/10"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src={logoImage} alt="Nova Tuitions" className="h-10 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:inline">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              onClick={() => setCurrentView('notifications')}
              className="p-2 rounded-lg transition relative text-white hover:bg-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            {/* Admin Profile */}
            <button
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2 transition cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border-2 bg-accent"
                style={{ borderColor: '#ffd700' }}
              >
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block text-white">
                <p className="font-semibold text-sm">{user?.fullName || 'Admin'}</p>
                <p className="text-xs opacity-80">Administrator</p>
              </div>
            </button>
          </div>
        </div>
      </header>
      {/* Sidebar */}
      <AdminSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex">
        {/* Main Content */}
        <main
          className={`flex-1 pt-[72px] transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-6">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}