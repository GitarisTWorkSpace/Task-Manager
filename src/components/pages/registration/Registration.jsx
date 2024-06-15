import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLoaderData } from 'react-router-dom'
import styles from './registration.module.css'
import { Header } from '../../UI/Header/Header'
import { AuthContext } from '../../../utils/AuthContext'
import axios from 'axios'
import { RootUrl } from '../../../config/config'

export const Registration = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const [userName, setUserName] = useState('')
    const [userSurname, setUserSurname] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userProfileType, setUserProfileType] = useState('Стажер') // Наставник
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()
    const accessToken = useLoaderData()

    useEffect(() => {
        if (accessToken == null){
            navigate('/login') 
        }
    }, [])

    const submitForm = async () =>  {
        console.log(userEmail)
        console.log(userPassword)

        const response = await axios.post(RootUrl+'/auth/registration', {
            name: userName,
            surname: userSurname,
            email: userEmail,
            role: userProfileType,
            password: userPassword
        })

        const userInfo = await response.data

        console.log(userInfo)
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <label className={styles.form}>
                    <h2 className={styles.title}>Вход</h2>
                    <input type='text' placeholder='Имя' className={styles.input} onInput={(e) => setUserName(e.target.value)}/>
                    <input type='text' placeholder='Фамилия' className={styles.input} onInput={(e) => setUserSurname(e.target.value)}/>
                    <input type='email' placeholder='Почта' className={styles.input} onInput={(e) => setUserEmail(e.target.value)}/>
                    <div className={styles.select}>
                        <select className={styles.role_dropdown} onChange={(e) => setUserProfileType(e.target.value)}>
                            <option value="Стажер">Стажер</option>
                            <option value="Наставник">Наставник</option>
                            <option value="Менеджер">Менеджер</option>
                            <option value="HR">HR</option>
                            <option value="Администратор">Администратор</option>                            
                        </select>
                    </div>
                    <input type='text' placeholder='Пароль' className={styles.input} onInput={(e) => setUserPassword(e.target.value)}/>
                    <button className={styles.button} onClick={submitForm}>Регистрация</button>
                </label>
            </div>
        </div>
    )
}
