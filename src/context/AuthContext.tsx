import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('nova_user')
    const storedToken = localStorage.getItem('nova_token')
    const storedRole = localStorage.getItem('nova_role')
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setToken(storedToken)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('nova_user')
        localStorage.removeItem('nova_token')
        localStorage.removeItem('nova_role')
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    // ── Admin credentials ──
    if (email === 'novatuitions@ixpoe.com' && password === 'Admin@123') {
      const adminSession = {
        id: 'ADMIN001',
        fullName: 'Nova Admin',
        email: 'novatuitions@ixpoe.com',
        phone: '+91 73489 56284',
        adminId: 'ADMIN001',
        role: 'admin'
      }
      const adminToken = `admin_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setUser(adminSession)
      setToken(adminToken)
      localStorage.setItem('nova_user', JSON.stringify(adminSession))
      localStorage.setItem('nova_token', adminToken)
      localStorage.setItem('nova_role', 'admin')
      return { success: true, user: adminSession, token: adminToken }
    }

    // ── Hardcoded student credentials ──
    if (email === 'kumuyadav249@gmail.com' && password === 'sudha@123') {
      const studentSession = {
        id: 'STU001',
        fullName: 'Sudha Yadav',
        email: 'kumuyadav249@gmail.com',
        phone: '',
        studentId: 'NOVA2026001',
        enrollmentDate: '2026-01-01',
        role: 'student'
      }
      const studentToken = `student_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setUser(studentSession)
      setToken(studentToken)
      localStorage.setItem('nova_user', JSON.stringify(studentSession))
      localStorage.setItem('nova_token', studentToken)
      localStorage.setItem('nova_role', 'student')
      return { success: true, user: studentSession, token: studentToken }
    }

    // Check against stored users
    const users = JSON.parse(localStorage.getItem('nova_users') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        phone: foundUser.phone,
        studentId: foundUser.studentId,
        enrollmentDate: foundUser.enrollmentDate,
        role: foundUser.role || 'student'
      }
      // Generate a mock token for student
      const studentToken = `student_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      setUser(userSession)
      setToken(studentToken)
      // Store in localStorage for persistence
      localStorage.setItem('nova_user', JSON.stringify(userSession))
      localStorage.setItem('nova_token', studentToken)
      localStorage.setItem('nova_role', userSession.role)
      
      return { success: true, user: userSession, token: studentToken }
    }

    return { success: false, message: 'Invalid email or password' }
  }

  // Signup function
  const signup = (fullName, email, phone, password) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('nova_users') || '[]')
    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
      return { success: false, message: 'Email already registered' }
    }

    // Create new user
    const newUser = {
      id: `NOVA${Date.now()}`,
      fullName,
      email,
      phone,
      password, // In production, this should be hashed
      studentId: `NOVA${new Date().getFullYear()}${String(users.length + 1).padStart(3, '0')}`,
      enrollmentDate: new Date().toISOString().split('T')[0],
      role: 'student',
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('nova_users', JSON.stringify(users))

    // Auto login after signup
    const userSession = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      studentId: newUser.studentId,
      enrollmentDate: newUser.enrollmentDate,
      role: newUser.role
    }
    setUser(userSession)
    localStorage.setItem('nova_user', JSON.stringify(userSession))

    return { success: true, user: userSession }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('nova_user')
    localStorage.removeItem('nova_token')
    localStorage.removeItem('nova_role')
    // Navigate to home
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  // Update user profile
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('nova_user', JSON.stringify(updatedUser))

    // Also update in users array
    const users = JSON.parse(localStorage.getItem('nova_users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem('nova_users', JSON.stringify(users))
    }

    return { success: true, user: updatedUser }
  }

  // Change password
  const changePassword = (currentPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem('nova_users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)

    if (userIndex === -1) {
      return { success: false, message: 'User not found' }
    }

    if (users[userIndex].password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect' }
    }

    users[userIndex].password = newPassword
    localStorage.setItem('nova_users', JSON.stringify(users))

    return { success: true, message: 'Password changed successfully' }
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    login,
    signup,
    logout,
    updateProfile,
    changePassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
