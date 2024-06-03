import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './main.module.css'
import { autoAuth } from '../../utils/autoAuth'

export const MainPage = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)  
    const navigate = useNavigate()

    useEffect(() => {
        if (autoAuth()){
            setIsLoggedIn(true)
        }
        else {
            navigate('/login')
        }
    }, [])

    return (
        <div className={styles.main}>
        </div>
    )
}
