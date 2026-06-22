import React, { useMemo, useState, useEffect } from 'react'
import { Trash2, Eye, Copy, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { initializeDummyData } from '../../utils/dummyDemoData'

const OFFICIAL_EMAIL = 'ithinklearn@ixpoe.com'
const OFFICIAL_WHATSAPP = '918197466607'

export default function DemoRequestsManagement() {
  // Initialize dummy data on component mount
  useEffect(() => {
    initializeDummyData()
  }, [])

  const loadRequests = () => {
    const requests = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]')
    return requests.toReversed ? requests.toReversed() : [...requests].reverse()
  }

  const [demoRequests, setDemoRequests] = useState(loadRequests)

  // Live-refresh when a new demo request is submitted (same tab via dispatchEvent)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'runningClassDemoRequests') {
        setDemoRequests(loadRequests())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Filter requests
  const filteredRequests = useMemo(() => {
    let filtered = demoRequests

    if (statusFilter !== 'All') {
      filtered = filtered.filter(r => r.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone?.includes(searchTerm) ||
        r.parentName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [demoRequests, statusFilter, searchTerm])

  const updateRequestStatus = (id, newStatus) => {
    const all = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]')
    const updatedAll = all.map(r => r.id === id ? { ...r, status: newStatus } : r)
    localStorage.setItem('runningClassDemoRequests', JSON.stringify(updatedAll))
    setDemoRequests(loadRequests())
    toast.success(`Status updated to ${newStatus}`)
  }

  const deleteRequest = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      const all = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]')
      const updatedAll = all.filter(r => r.id !== id)
      localStorage.setItem('runningClassDemoRequests', JSON.stringify(updatedAll))
      setDemoRequests(loadRequests())
      toast.success('Request deleted')
    }
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const downloadAsCSV = () => {
    if (filteredRequests.length === 0) {
      toast.error('No data to download')
      return
    }

    const headers = ['Demo Number', 'Student Name', 'Parent Name', 'Grade', 'Board', 'Email', 'Phone', 'Preferred Date', 'Preferred Time', 'Status', 'Request Date']
    const csvContent = [
      headers.join(','),
      ...filteredRequests.map(r => [
        r.demoNumber,
        r.studentName,
        r.parentName,
        r.grade,
        r.board,
        r.email,
        r.phone,
        r.preferredDate,
        r.preferredTime,
        r.status,
        new Date(r.requestDate).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `demo-requests-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('CSV downloaded successfully')
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Contacted': return 'bg-blue-100 text-blue-800'
      case 'Scheduled': return 'bg-green-100 text-green-800'
      case 'Completed': return 'bg-gray-100 text-gray-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Demo Requests</h2>
          <p className="text-gray-600 text-sm mt-1">Manage all free demo scheduling requests</p>
        </div>
        <button
          onClick={downloadAsCSV}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
        >
          <Download size={18} />
          Download CSV
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Contacted">Contacted</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="text-sm text-gray-600 py-2.5">
          {filteredRequests.length} request(s) found
        </div>
      </div>

      {/* Table - Desktop View */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg border border-gray-200">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-semibold">No demo requests found</p>
            <p className="text-sm">Requests will appear here when students schedule demos</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Demo #</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Student / Parent</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Contact</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Details</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Date & Time</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-semibold text-blue-600">{request.demoNumber}</td>
                  <td className="px-4 py-3">
                    <div className="text-gray-900 font-semibold">{request.studentName}</div>
                    <div className="text-gray-600 text-xs">{request.parentName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-900 text-xs">{request.email}</div>
                    <div className="text-gray-600 text-xs">{request.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div className="text-gray-900">{request.grade} - {request.board}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div className="text-gray-900">{request.preferredDate}</div>
                    <div className="text-gray-600">{request.preferredTime}</div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={request.status}
                      onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-semibold border-0 focus:outline-none cursor-pointer ${getStatusBadgeColor(request.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request)
                          setShowDetails(true)
                        }}
                        className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => deleteRequest(request.id)}
                        className="p-1.5 hover:bg-red-50 text-red-600 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
            <p className="text-lg font-semibold">No demo requests found</p>
            <p className="text-sm">Requests will appear here when students schedule demos</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Demo #</p>
                  <p className="font-bold text-blue-600">{request.demoNumber}</p>
                </div>
                <select
                  value={request.status}
                  onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                  className={`text-xs font-semibold px-2 py-1 rounded border-0 focus:outline-none cursor-pointer ${getStatusBadgeColor(request.status)}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Student</p>
                  <p className="font-semibold text-gray-900">{request.studentName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Parent</p>
                  <p className="font-semibold text-gray-900">{request.parentName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Email</p>
                  <a href={`mailto:${request.email}`} className="text-blue-600 font-semibold text-xs break-all hover:underline">
                    {request.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Phone</p>
                  <a href={`tel:${request.phone}`} className="text-blue-600 font-semibold hover:underline">
                    {request.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Course</p>
                  <p className="font-semibold text-gray-900">{request.grade} - {request.board}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Date & Time</p>
                  <p className="font-semibold text-gray-900">{request.preferredDate}</p>
                  <p className="text-xs text-gray-600">{request.preferredTime}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedRequest(request)
                    setShowDetails(true)
                  }}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => deleteRequest(request.id)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-semibold text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-start sticky top-0 bg-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Demo Request Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Demo Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Demo Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Demo Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-blue-600">{selectedRequest.demoNumber}</p>
                      <button
                        onClick={() => copyToClipboard(selectedRequest.demoNumber, 'Demo Number')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold">{selectedRequest.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Request Date</p>
                    <p className="font-semibold">{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Request Time</p>
                    <p className="font-semibold">{new Date(selectedRequest.requestDate).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Student Name</p>
                    <p className="font-semibold">{selectedRequest.studentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Parent Name</p>
                    <p className="font-semibold">{selectedRequest.parentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Grade</p>
                    <p className="font-semibold">{selectedRequest.grade}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Board</p>
                    <p className="font-semibold">{selectedRequest.board}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Email</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a href={`mailto:${selectedRequest.email}`} className="font-semibold text-blue-600 hover:underline break-all">
                        {selectedRequest.email}
                      </a>
                      <button
                        onClick={() => copyToClipboard(selectedRequest.email, 'Email')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone Number</p>
                    <div className="flex items-center gap-2">
                      <a href={`tel:${selectedRequest.phone}`} className="font-semibold text-blue-600 hover:underline">
                        {selectedRequest.phone}
                      </a>
                      <button
                        onClick={() => copyToClipboard(selectedRequest.phone, 'Phone')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Demo Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Preferred Date</p>
                    <p className="font-semibold">{selectedRequest.preferredDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Preferred Time</p>
                    <p className="font-semibold">{selectedRequest.preferredTime}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedRequest.message && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Message</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    const msg = [
                      `🎓 *Demo Request - ${selectedRequest.demoNumber}*`,
                      ``,
                      `👤 *Student:* ${selectedRequest.studentName}`,
                      `👨👩👦 *Parent:* ${selectedRequest.parentName}`,
                      `📚 *Grade/Board:* ${selectedRequest.grade} - ${selectedRequest.board}`,
                      ``,
                      `📧 *Email:* ${selectedRequest.email}`,
                      `📞 *Phone:* ${selectedRequest.phone}`,
                      ``,
                      `📅 *Date:* ${selectedRequest.preferredDate}`,
                      `⏰ *Time:* ${selectedRequest.preferredTime}`,
                      selectedRequest.message ? `\n💬 *Message:* ${selectedRequest.message}` : '',
                    ].filter(Boolean).join('\n')
                    window.open(`https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
                  }}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold text-sm"
                >
                  💬 Notify WhatsApp
                </button>
                <button
                  onClick={() => {
                    const subject = `Demo Request - ${selectedRequest.demoNumber} | ${selectedRequest.studentName}`
                    const body = [
                      `Demo Number: ${selectedRequest.demoNumber}`,
                      `Student: ${selectedRequest.studentName}`,
                      `Parent: ${selectedRequest.parentName}`,
                      `Grade/Board: ${selectedRequest.grade} - ${selectedRequest.board}`,
                      `Email: ${selectedRequest.email}`,
                      `Phone: ${selectedRequest.phone}`,
                      `Preferred Date: ${selectedRequest.preferredDate}`,
                      `Preferred Time: ${selectedRequest.preferredTime}`,
                      selectedRequest.message ? `Message: ${selectedRequest.message}` : ''
                    ].filter(Boolean).join('\n')
                    window.open(`mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                >
                  📧 Notify Email
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-semibold text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
