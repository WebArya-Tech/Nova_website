import React, { useState } from 'react'

export default function FeePayment() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedFee, setSelectedFee] = useState(null)
  const [feePage, setFeePage] = useState(1)
  const [historyPage, setHistoryPage] = useState(1)
  const itemsPerPage = 5

  const feeStructure = [
    {
      id: 1,
      course: 'Mathematics - Calculus & Integration',
      amount: 15000,
      dueDate: 'Apr 5, 2026',
      status: 'pending',
      term: 'Term 2'
    },
    {
      id: 2,
      course: 'Physics - Mechanics & Electromagnetism',
      amount: 12000,
      dueDate: 'Apr 5, 2026',
      status: 'pending',
      term: 'Term 2'
    },
    {
      id: 3,
      course: 'Chemistry - Organic & Inorganic',
      amount: 10000,
      dueDate: 'Feb 15, 2026',
      status: 'paid',
      term: 'Term 1',
      paidOn: 'Feb 10, 2026'
    },
    {
      id: 4,
      course: 'Mathematics - Algebra & Trigonometry',
      amount: 12000,
      dueDate: 'Feb 15, 2026',
      status: 'paid',
      term: 'Term 1',
      paidOn: 'Feb 12, 2026'
    }
  ]

  const paymentHistory = [
    {
      id: 'NOVA-2026-001',
      course: 'Chemistry - Organic & Inorganic',
      amount: 10000,
      date: 'Feb 10, 2026',
      method: 'UPI',
      status: 'success'
    },
    {
      id: 'NOVA-2026-002',
      course: 'Mathematics - Algebra & Trigonometry',
      amount: 12000,
      date: 'Feb 12, 2026',
      method: 'Credit Card',
      status: 'success'
    },
    {
      id: 'NOVA-2025-015',
      course: 'Mathematics - Calculus & Integration',
      amount: 15000,
      date: 'Dec 20, 2025',
      method: 'Bank Transfer',
      status: 'success'
    }
  ]

  const pendingAmount = feeStructure.filter(f => f.status === 'pending').reduce((acc, f) => acc + f.amount, 0)
  const paidAmount = feeStructure.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0)

  // Pagination for Fee Structure
  const feeTotalPages = Math.ceil(feeStructure.length / itemsPerPage)
  const feeStartIndex = (feePage - 1) * itemsPerPage
  const paginatedFeeStructure = feeStructure.slice(feeStartIndex, feeStartIndex + itemsPerPage)

  // Pagination for Payment History
  const historyTotalPages = Math.ceil(paymentHistory.length / itemsPerPage)
  const historyStartIndex = (historyPage - 1) * itemsPerPage
  const paginatedPaymentHistory = paymentHistory.slice(historyStartIndex, historyStartIndex + itemsPerPage)

  const handlePayNow = (fee) => {
    setSelectedFee(fee)
    setShowPaymentModal(true)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    alert('Payment processed successfully!')
    setShowPaymentModal(false)
    setSelectedFee(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Fee Payment</h2>
        <p className="text-gray-600 mt-2">Manage your course fees and payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#dc3545' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Pending Payment</h3>
          <p className="text-3xl font-bold" style={{ color: '#dc3545' }}>₹{pendingAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#28a745' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Paid This Term</h3>
          <p className="text-3xl font-bold" style={{ color: '#28a745' }}>₹{paidAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: '#196d83' }}>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Courses</h3>
          <p className="text-3xl font-bold text-primary">{feeStructure.length}</p>
        </div>
      </div>

      {/* Current Fee Structure */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6 text-primary">Current Fee Structure</h3>
        <div className="space-y-4">
          {paginatedFeeStructure.map((fee) => (
            <div
              key={fee.id}
              className="p-5 rounded-lg border-l-4"
              style={{
                backgroundColor: 'white',
                borderLeftColor: fee.status === 'paid' ? '#28a745' : '#dc3545'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-800">{fee.course}</h4>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: fee.status === 'paid' ? '#28a745' : '#dc3545' }}
                    >
                      {fee.status.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#ddaa2c', color: 'white' }}>
                      {fee.term}
                    </span>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <span className="font-semibold text-lg text-primary">₹{fee.amount.toLocaleString()}</span>
                    <span>Due: {fee.dueDate}</span>
                    {fee.paidOn && <span className="text-green-600">Paid on: {fee.paidOn}</span>}
                  </div>
                </div>
                {fee.status === 'pending' && (
                  <button
                    onClick={() => handlePayNow(fee)}
                    className="px-6 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all bg-primary"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination for Fee Structure */}
        {feeTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFeePage(prev => Math.max(prev - 1, 1))}
              disabled={feePage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: feePage === 1 ? '#e0e0e0' : '#196d83',
                color: feePage === 1 ? '#666' : 'white'
              }}
            >
              Previous
            </button>
            {[...Array(feeTotalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setFeePage(index + 1)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: feePage === index + 1 ? '#196d83' : 'white',
                  color: feePage === index + 1 ? 'white' : '#196d83',
                  border: '2px solid #196d83'
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setFeePage(prev => Math.min(prev + 1, feeTotalPages))}
              disabled={feePage === feeTotalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: feePage === feeTotalPages ? '#e0e0e0' : '#196d83',
                color: feePage === feeTotalPages ? '#666' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6 text-primary">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#196d83' }}>
                <th className="text-left py-3 px-4 font-bold text-primary">Transaction ID</th>
                <th className="text-left py-3 px-4 font-bold text-primary">Course</th>
                <th className="text-left py-3 px-4 font-bold text-primary">Amount</th>
                <th className="text-left py-3 px-4 font-bold text-primary">Date</th>
                <th className="text-left py-3 px-4 font-bold text-primary">Method</th>
                <th className="text-left py-3 px-4 font-bold text-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPaymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{payment.id}</td>
                  <td className="py-3 px-4">{payment.course}</td>
                  <td className="py-3 px-4 font-bold" style={{ color: '#28a745' }}>₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">{payment.date}</td>
                  <td className="py-3 px-4">{payment.method}</td>
                  <td className="py-3 px-4">
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all"
                      style={{ borderColor: '#196d83', color: '#196d83' }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination for Payment History */}
        {historyTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setHistoryPage(prev => Math.max(prev - 1, 1))}
              disabled={historyPage === 1}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: historyPage === 1 ? '#e0e0e0' : '#196d83',
                color: historyPage === 1 ? '#666' : 'white'
              }}
            >
              Previous
            </button>
            {[...Array(historyTotalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setHistoryPage(index + 1)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: historyPage === index + 1 ? '#196d83' : 'white',
                  color: historyPage === index + 1 ? 'white' : '#196d83',
                  border: '2px solid #196d83'
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setHistoryPage(prev => Math.min(prev + 1, historyTotalPages))}
              disabled={historyPage === historyTotalPages}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: historyPage === historyTotalPages ? '#e0e0e0' : '#196d83',
                color: historyPage === historyTotalPages ? '#666' : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">Payment Details</h2>
            
            <div className="mb-6 p-4 rounded-lg border border-gray-100">
              <h3 className="font-bold text-lg mb-2">{selectedFee.course}</h3>
              <p className="text-3xl font-bold text-primary">₹{selectedFee.amount.toLocaleString()}</p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#196d83' }}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="netbanking">Net Banking</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 rounded-lg font-bold border-2 transition-all"
                  style={{ borderColor: '#dc3545', color: '#dc3545' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg text-white font-bold shadow-md hover:opacity-90 transition-all bg-primary"
                >
                  Proceed to Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
