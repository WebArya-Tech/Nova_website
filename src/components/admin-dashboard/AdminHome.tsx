import React, { useMemo } from 'react';
import { Users, BookOpen, GraduationCap, FileText, DollarSign, MessageSquare, ClipboardList, Bell, BarChart2, Star, HelpCircle, FlaskConical, Newspaper } from 'lucide-react';

const getStats = () => {
  try {
    const students = JSON.parse(localStorage.getItem('nova_admin_students') || localStorage.getItem('nova_users') || '[]').filter(u => u.role !== 'admin')
    const payments = JSON.parse(localStorage.getItem('feePayments') || '[]')
    const demoRequests = JSON.parse(localStorage.getItem('nova_demo_requests') || '[]')
    const homework = JSON.parse(localStorage.getItem('nova_homework') || '[]')
    const announcements = JSON.parse(localStorage.getItem('nova_announcements') || '[]')
    const totalRevenue = payments.reduce((s, p) => s + Number(p.feeAmount || p.amount || 0), 0)
    const pendingDemos = demoRequests.filter(r => r.status === 'pending').length
    return { students: students.length, payments: payments.length, totalRevenue, demoRequests: demoRequests.length, homework: homework.length, announcements: announcements.length, pendingDemos }
  } catch { return { students: 0, payments: 0, classes: 0, totalRevenue: 0, demoRequests: 0, homework: 0, announcements: 0, pendingDemos: 0, pendingEnrollments: 0 } }
}

export default function AdminHome({ setCurrentView }) {
  const stats = useMemo(getStats, [])

  const statCards = [
    { label: 'Total Students', value: stats.students, color: '#196d83', bg: '#f0f7fa', id: 'students' },
    { label: 'Total Payments', value: stats.payments, color: '#28a745', bg: '#f0fff4', id: 'fee-payment' },
    { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, color: '#28a745', bg: '#f0fff4', id: 'fee-payment' },
    { label: 'Demo Requests', value: stats.demoRequests, color: stats.pendingDemos > 0 ? '#ffc107' : '#196d83', bg: '#fffbf0', id: 'demo-requests' },
    { label: 'Homework Tasks', value: stats.homework, color: '#196d83', bg: '#f0f7fa', id: 'homework' },
    { label: 'Announcements', value: stats.announcements, color: '#ddaa2c', bg: '#fef9f0', id: 'announcements' },
  ]

  const menuCards = [
    { id: 'students', label: 'Students', icon: Users, description: 'View & manage registered students' },
    { id: 'courses', label: 'Courses', icon: BookOpen, description: 'Create & manage course catalog' },
    { id: 'fee-payment', label: 'Fee Payments', icon: DollarSign, description: 'Track payment records from frontend' },
    { id: 'demo-requests', label: 'Demo Requests', icon: FileText, description: 'Manage demo class bookings' },
    { id: 'homework', label: 'Homework', icon: ClipboardList, description: 'Assign & manage homework tasks' },
    { id: 'practice-tests', label: 'Practice Tests', icon: FlaskConical, description: 'Create & manage tests' },
    { id: 'announcements', label: 'Announcements', icon: Bell, description: 'Post announcements to students' },
    { id: 'questions', label: 'Q&A Management', icon: HelpCircle, description: 'Answer student questions' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, description: 'View & respond to reviews' },
    { id: 'testimonials', label: 'Testimonials', icon: Star, description: 'Moderate testimonial submissions' },
    { id: 'blog', label: 'Blog', icon: Newspaper, description: 'Manage blog posts & subscribers' },
    { id: 'photo-gallery', label: 'Photo Gallery', icon: GraduationCap, description: 'Manage photo gallery images' },
    { id: 'video-gallery', label: 'Video Gallery', icon: BarChart2, description: 'Manage video gallery content' },
    { id: 'tutors', label: 'Our Tutors', icon: Users, description: 'Manage tutor profiles shown on website' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Admin alerts & notifications' },
    { id: 'profile', label: 'My Profile', icon: BarChart2, description: 'View & edit admin profile' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-1" style={{ color: '#196d83' }}>Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back! Here's a live overview of Nova Tuitions.</p>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map(s => (
          <button key={s.label} onClick={() => setCurrentView(s.id)}
            className="rounded-xl shadow-md p-4 border-l-4 text-left hover:shadow-lg transition-all"
            style={{ backgroundColor: s.bg, borderLeftColor: s.color }}>
            <p className="text-xs font-semibold text-gray-500 mb-1">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </button>
        ))}
      </div>

      {/* Management Sections */}
      <h2 className="text-xl font-bold mb-4" style={{ color: '#196d83' }}>Management Sections</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {menuCards.map(card => (
          <button key={card.id} onClick={() => setCurrentView(card.id)}
            className="bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg hover:border-[#196d83] border-2 border-transparent transition-all">
            <div className="p-2 rounded-lg mb-3 w-fit" style={{ backgroundColor: '#f0f7fa' }}>
              <card.icon className="w-5 h-5" style={{ color: '#196d83' }} />
            </div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: '#196d83' }}>{card.label}</h3>
            <p className="text-xs text-gray-500 leading-tight">{card.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
