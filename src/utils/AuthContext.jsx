import React from 'react'
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUserInfo, setCurrentUserInfo] = useState({
        index: 0,
        name: null,
        surname: null,
        email: null,
        avatar_url: null,
        role: null,
        is_active: false
    })

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUserInfo, setCurrentUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}
