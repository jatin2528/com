import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [isAuth, setIsAuth] = useState(!!token)

  const login = async (email, password) => {
    const res = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()
    setToken(data.token)
    localStorage.setItem('token', data.token)
    setIsAuth(true)
  }

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    setIsAuth(false)
  }

  useEffect(() => {
    if(token) setIsAuth(true)
    else setIsAuth(false)
  }, [token])

  return (
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
