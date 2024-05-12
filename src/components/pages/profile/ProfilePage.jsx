import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'

export const ProfilePage = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/login')
        }
        console.log(params)
    }, [])

    return (
        <div>ProfilePage</div>
    )
}
