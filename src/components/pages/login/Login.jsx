import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { Header } from '../../UI/Header/Header'
import { AuthContext } from '../../utils/AuthContext'
import axios from 'axios'

export const Login = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
      if (isLoggedIn)
        navigate('/')
    }, [])

    const submitForm = async () =>  {
        console.log(userEmail)
        console.log(userPassword)

        const response = await axios.post('http://127.0.0.1:8000/api/jwt/login/?email='+userEmail+'&password='+userPassword)
        const accessCode = await response.data.access_token

        localStorage.setItem('accessCode', accessCode)
        console.log(isLoggedIn)
        setIsLoggedIn(true)
        console.log(accessCode)
        navigate('/')
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
                <div className={styles.nav}>
                  <Link to='/login' className={styles.nav__button}>Войти</Link>
                  <Link to='/registration' className={styles.nav__button}>Регистрация</Link>
                </div>
            </div>
        </div>
    )
}
