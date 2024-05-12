import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './registration.module.css'
import { Header } from '../../UI/Header/Header'
import { AuthContext } from '../../utils/AuthContext'
import axios from 'axios'

export const Registration = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const [userName, setUserName] = useState('')
    const [userSurname, setUserSurname] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userProfileType, setUserProfileType] = useState('Стажер') // Наставник
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn)
            navigate('/')
    }, [])

    const submitForm = async () =>  {
        console.log(userEmail)
        console.log(userPassword)

        const response = await axios.post('http://127.0.0.1:8000/api/jwt/registration', {
            name: userName,
            surname: userSurname,
            email: userEmail,
            profile_type: userProfileType,
            password: userPassword
        })

        const userInfo = await response.data

        console.log(userInfo)
        navigate('/login')
    }

    const changeProfileType = (e) => {
        e.preventDefault();

        const type = e.target.value;

        console.log(type)
        setUserProfileType(type)
    }

    return (
        <div className={styles.main}>
            <Header title={'Авторизация'}/>
            <div className={styles.container}>
                <label className={styles.form}>
                    <h2 className={styles.title}>Вход</h2>
                    <input type='text' placeholder='Имя' className={styles.input} onInput={(e) => setUserName(e.target.value)}/>
                    <input type='text' placeholder='Фамилия' className={styles.input} onInput={(e) => setUserSurname(e.target.value)}/>
                    <input type='email' placeholder='Почта' className={styles.input} onInput={(e) => setUserEmail(e.target.value)}/>
                    <div className={styles.select}>
                        <input className={userProfileType === "Стажер" ? styles.select__button__activ : styles.select__button} 
                            name="profile_type" 
                            type="button" 
                            value="Стажер" 
                            defaultChecked={true} 
                            onClick={changeProfileType}/>
                        <input className={userProfileType === "Наставник" ? styles.select__button__activ : styles.select__button} 
                            name="profile_type"  
                            type="button" 
                            value="Наставник" 
                            onClick={changeProfileType}/>
                    </div>
                    <input type='password' placeholder='Пароль' className={styles.input} onInput={(e) => setUserPassword(e.target.value)}/>
                    <input type='password' placeholder='Повторите пароль' className={styles.input}/>
                    <button className={styles.button} onClick={submitForm}>Регистрация</button>
                </label>
                <div className={styles.nav}>
                  <Link to='/login' className={styles.nav__button}>Войти</Link>
                  <Link to='/registration' className={styles.nav__button}>Регистрация</Link>
                </div>
            </div>
        </div>
    )
}
