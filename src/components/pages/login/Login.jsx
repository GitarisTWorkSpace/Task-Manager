import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { Header } from '../../UI/Header/Header'
import { AuthContext } from '../../utils/AuthContext'
import axios from 'axios'
import { autoAuth } from '../../utils/autoAuth'

export const Login = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        if (autoAuth()){
            setIsLoggedIn(true)
            navigate('/')
        }
        else {
            navigate('/login')
        }
    },[])

    const submitForm = async () =>  {
        console.log(userEmail)
        console.log(userPassword)

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login',{
            email: userEmail,
            password: userPassword
            })
            
            const tokens = await response.data;
            localStorage.setItem('access_token', tokens.access_token)
            localStorage.setItem('refresh_token', tokens.refresh_token)
            console.log(tokens)
            console.log(isLoggedIn)
            setIsLoggedIn(true)
            navigate('/')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.main}>
            <Header title={'Авторизация'}/>
            <div className={styles.container}>
                <div className={styles.form}>
                    <h2 className={styles.title}>Вход</h2>
                    <input type='email' placeholder='Почта' className={styles.input} onInput={(e) => setUserEmail(e.target.value)}/>
                    <input type='password' placeholder='Пароль' className={styles.input} onInput={(e) => setUserPassword(e.target.value)}/>
                    <button className={styles.button} onClick={submitForm}>Войти</button>
                </div>
            </div>
        </div>
    )
}
