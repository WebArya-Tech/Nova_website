import React from 'react'
import { GraduationCap, ClipboardList, HelpCircle } from 'lucide-react'

interface StudentData {
  name: string
  email: string
  studentId: string
  courses: number
  assignments: number
  completedAssignments: number
}

export default function DashboardHome({ studentData, setCurrentView }: { studentData: StudentData; setCurrentView: (v: string) => void }) {
  const stats = [
    { label: 'Enrolled Courses', value: '5', change: '+2 this month' },
    { label: 'Pending Assignments', value: '4', change: 'Due this week' },
    { label: 'Completed', value: '8', change: '67% completion' },
    { label: 'Upcoming Classes', value: '3', change: 'This week' },
  ]

  const upcomingClasses = [
    { subject: 'Mathematics - Calculus', tutor: 'Ms. Ramya Rajamani', time: 'Today, 4:00 PM', duration: '60 min', status: 'upcoming' },
    { subject: 'Physics - Mechanics', tutor: 'Mr. Ram G. Mohan', time: 'Tomorrow, 3:00 PM', duration: '60 min', status: 'upcoming' },
    { subject: 'Chemistry - Organic', tutor: 'B. Aishwarya', time: 'Mar 23, 5:00 PM', duration: '60 min', status: 'scheduled' }
  ]

  const recentAssignments = [
    { title: 'Calculus Problem Set 3', course: 'Mathematics', dueDate: 'Mar 25, 2026', status: 'pending', priority: 'high' },
    { title: 'Physics Lab Report', course: 'Physics', dueDate: 'Mar 23, 2026', status: 'pending', priority: 'high' },
    { title: 'Chemistry Quiz 2', course: 'Chemistry', dueDate: 'Mar 28, 2026', status: 'pending', priority: 'medium' },
    { title: 'Linear Algebra Assignment', course: 'Mathematics', dueDate: 'Submitted', status: 'completed', priority: null }
  ]

  const notifications = [
    { message: 'New study material added for Calculus Chapter 9', time: '2 hours ago' },
    { message: 'Assignment "Physics Lab Report" submitted successfully', time: '5 hours ago' },
    { message: 'Upcoming class reminder: Mathematics at 4:00 PM today', time: '1 day ago' }
  ]

  return (
    <div className="space-y-8">

      {/* Welcome Banner — matches homepage gradient style */}
      <div className="rounded-2xl p-8 text-white shadow-lg bg-gradient-to-br from-primary to-primary/80">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {studentData.name.split(' ')[0]}!</h2>
        <p className="text-lg opacity-90">Ready to continue your learning journey with Nova Tuitions today?</p>
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => setCurrentView('runningClasses')}
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
          >
            Join Live Class →
          </button>
          <button
            onClick={() => setCurrentView('courses')}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            My Courses
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100"
          >
            <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
            <p className="text-gray-700 font-semibold mb-1">{stat.label}</p>
            <p className="text-sm text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentView('courses')}
            className="flex items-center gap-3 p-5 rounded-xl shadow-md hover:shadow-lg transition-all bg-primary text-white font-semibold text-base"
          >
            <GraduationCap className="w-6 h-6" />
            Browse Courses
          </button>
          <button
            onClick={() => setCurrentView('assignments')}
            className="flex items-center gap-3 p-5 rounded-xl shadow-md hover:shadow-lg transition-all bg-accent text-white font-semibold text-base"
          >
            <ClipboardList className="w-6 h-6" />
            Submit Assignment
          </button>
          <button
            onClick={() => setCurrentView('support')}
            className="flex items-center gap-3 p-5 rounded-xl shadow-md hover:shadow-lg transition-all bg-primary text-white font-semibold text-base"
          >
            <HelpCircle className="w-6 h-6" />
            Get Help
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">Upcoming Classes</h3>
            <button
              onClick={() => setCurrentView('runningClasses')}
              className="text-sm font-semibold text-accent hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {upcomingClasses.map((cls, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 hover:shadow-md transition-all bg-white border border-gray-100 ${
                  cls.status === 'upcoming' ? 'border-l-accent' : 'border-l-primary'
                }`}
              >
                <h4 className="font-bold text-foreground mb-1">{cls.subject}</h4>
                <p className="text-sm text-muted-foreground mb-2">Tutor: {cls.tutor}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{cls.time}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    cls.status === 'upcoming' ? 'bg-accent' : 'bg-primary'
                  }`}>
                    {cls.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">Recent Assignments</h3>
            <button
              onClick={() => setCurrentView('assignments')}
              className="text-sm font-semibold text-accent hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentAssignments.map((assignment, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 hover:shadow-md transition-all bg-white border border-gray-100 ${
                  assignment.status === 'completed'
                    ? 'border-l-green-500'
                    : assignment.priority === 'high'
                    ? 'border-l-red-500'
                    : 'border-l-accent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-1">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">Course: {assignment.course}</p>
                    <p className="text-sm text-foreground">Due: {assignment.dueDate}</p>
                  </div>
                  <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    assignment.status === 'completed' ? 'bg-green-500' :
                    assignment.priority === 'high' ? 'bg-red-500' : 'bg-accent'
                  }`}>
                    {assignment.status === 'completed' ? 'Done' : assignment.priority === 'high' ? 'High' : 'Medium'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-primary">Recent Notifications</h3>
          <button
            onClick={() => setCurrentView('notifications')}
            className="text-sm font-semibold text-accent hover:underline"
          >
            View All →
          </button>
        </div>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border-l-4 border-l-primary bg-white border border-gray-100 hover:shadow-md transition-all"
            >
              <p className="text-foreground mb-1">{notification.message}</p>
              <p className="text-sm text-muted-foreground">{notification.time}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
