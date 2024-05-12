import React from 'react'
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUserInfo, setCurrentUserInfo] = useState({})
    const [accessCode, setAccessCode] = useState('')

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUserInfo, setCurrentUserInfo, accessCode, setAccessCode }}>
            {children}
        </AuthContext.Provider>
    )
}
