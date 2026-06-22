const DEMO_REQUESTS_KEY = 'runningClassDemoRequests'

const dummyRequests = [
  {
    id: 'DEMO1712345678001',
    demoNumber: 'DEMO10011712345678',
    studentName: 'Rahul Sharma',
    parentName: 'Mr. Rajesh Sharma',
    grade: '11-12',
    board: 'CBSE',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    preferredDate: '2026-06-20',
    preferredTime: '5:00 PM - 6:00 PM',
    message: 'Interested in Physics and Chemistry classes for JEE preparation.',
    submittedAt: '2026-06-15T10:30:00.000Z',
    status: 'pending'
  },
  {
    id: 'DEMO1712345678002',
    demoNumber: 'DEMO10021712345678',
    studentName: 'Priya Patel',
    parentName: 'Mrs. Anjali Patel',
    grade: '9-10',
    board: 'IGCSE',
    email: 'priya.patel@example.com',
    phone: '9876543211',
    preferredDate: '2026-06-22',
    preferredTime: '4:00 PM - 5:00 PM',
    message: 'Need help with Mathematics and Science for IGCSE board exams.',
    submittedAt: '2026-06-16T14:00:00.000Z',
    status: 'pending'
  },
  {
    id: 'DEMO1712345678003',
    demoNumber: 'DEMO10031712345678',
    studentName: 'Arjun Kumar',
    parentName: 'Dr. Suresh Kumar',
    grade: '6-8',
    board: 'CBSE',
    email: 'arjun.kumar@example.com',
    phone: '9876543212',
    preferredDate: '2026-06-25',
    preferredTime: '3:00 PM - 4:00 PM',
    message: 'Looking for regular tutoring in all subjects.',
    submittedAt: '2026-06-17T09:15:00.000Z',
    status: 'contacted'
  }
]

export const initializeDummyData = () => {
  const existing = localStorage.getItem(DEMO_REQUESTS_KEY)
  if (!existing || JSON.parse(existing).length === 0) {
    localStorage.setItem(DEMO_REQUESTS_KEY, JSON.stringify(dummyRequests))
  }
}
