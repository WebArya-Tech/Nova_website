import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const ADMIN_EMAIL = 'novatuitions@ixpoe.com'
const ADMIN_DEFAULT_PASSWORD = 'Admin@123'
const ADMIN_PASSWORD_KEY = 'admin_password_override'

// Get current admin password (may have been changed)
const getAdminPassword = () =>
  localStorage.getItem(ADMIN_PASSWORD_KEY) || ADMIN_DEFAULT_PASSWORD

const USERS_KEY = 'ithinklearn_users'

const getStoredUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}

const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users))

// Initialize test user account if it doesn't exist
const initializeTestUsers = () => {
  const users = getStoredUsers()
  const testUserExists = users.some(u => u.email.toLowerCase() === 'kumuyadav249@gmail.com')
  
  if (!testUserExists) {
    const testUser = {
      fullName: 'Test Student',
      email: 'kumuyadav249@gmail.com',
      phone: '9876543210',
      password: 'Sudha@123'
    }
    saveUsers([...users, testUser])
  }
}

// In-memory OTP store: { [email]: { otp, expiresAt } }
const otpStore = {}

export const generateOtp = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }
  return otp
}

export const verifyOtp = (email, inputOtp) => {
  const record = otpStore[email]
  if (!record) return { valid: false, message: 'No OTP found. Please request a new one.' }
  if (Date.now() > record.expiresAt) {
    delete otpStore[email]
    return { valid: false, message: 'OTP has expired. Please request a new one.' }
  }
  if (record.otp !== inputOtp) return { valid: false, message: 'Invalid OTP. Please try again.' }
  delete otpStore[email]
  return { valid: true }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('auth_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  useEffect(() => {
    // Initialize test users on first load
    initializeTestUsers()
    
    const handleStorageChange = (e) => {
      if (e.key === 'auth_user') {
        try { setUser(e.newValue ? JSON.parse(e.newValue) : null) } catch { setUser(null) }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const isAdmin = !!(user && user.role === 'admin')

  const login = (email, password) => {
    if (!email || !password) return { success: false, message: 'Email and password are required' }

    // Admin check — uses current password (may have been changed)
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      if (password !== getAdminPassword()) {
        return { success: false, message: 'Invalid email or password' }
      }
      const loginTime = new Date().toISOString()
      localStorage.setItem('admin_last_login', loginTime)
      const adminData = {
        email: ADMIN_EMAIL,
        name: 'Admin',
        fullName: 'Administrator',
        role: 'admin',
        adminId: 'ADMIN001',
        lastLogin: loginTime
      }
      setUser(adminData)
      localStorage.setItem('auth_user', JSON.stringify(adminData))
      return { success: true, isAdmin: true }
    }

    // Regular user — must match stored credentials
    const users = getStoredUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) return { success: false, message: 'Invalid email or password' }
    if (found.password !== password) return { success: false, message: 'Invalid email or password' }

    const userData = { email: found.email, name: found.fullName, fullName: found.fullName, phone: found.phone }
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return { success: true, isAdmin: false }
  }

  const signup = (fullName, email, phone, password) => {
    if (!fullName || !email || !password) return { success: false, message: 'All fields are required' }
    const users = getStoredUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists' }
    }
    const newUser = { fullName, email, phone, password }
    saveUsers([...users, newUser])
    const userData = { email, name: fullName, fullName, phone }
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return { success: true }
  }

  const resetPassword = (email, newPassword) => {
    const users = getStoredUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
    if (idx === -1) return { success: false, message: 'No account found with this email' }
    users[idx].password = newPassword
    saveUsers(users)
    return { success: true }
  }

  // Change admin password — validates current password then saves new one
  const changeAdminPassword = (currentPassword, newPassword) => {
    if (currentPassword !== getAdminPassword()) {
      return { success: false, message: 'Current password is incorrect' }
    }
    if (newPassword.length < 8) {
      return { success: false, message: 'New password must be at least 8 characters' }
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword)
    return { success: true }
  }

  const isEmailRegistered = (email) => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return true
    return getStoredUsers().some(u => u.email.toLowerCase() === email.toLowerCase())
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user, isAdmin, isLoading: false,
      login, signup, logout, resetPassword, isEmailRegistered, changeAdminPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
