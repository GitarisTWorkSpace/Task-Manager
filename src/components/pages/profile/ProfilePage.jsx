import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'
import styles from './profile.module.css'
import axios from 'axios'
import { Header } from '../../UI/Header/Header'

export const ProfilePage = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({
        name: '',
        surname: '',
        email: '',
        profile_type: '',
        is_active: ''
    })

    const navigate = useNavigate()

    const params = useParams()

    const getUserInfo = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/user/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessCode')
            }
        })
        const userData = await response.data
        console.log(userData)
        setUserInfo(userData)
    }

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/login')
        }
        if (params.userId == null){
            console.log("sdkfnsduygbds")
            getUserInfo()
        }
    }, [])

    return (
        <div className={styles.main}>
            <Header backButton={true} title={"Профиль"}/>
            <div className={styles.profile}>
                <div className={styles.left_bar}>
                    <div className={styles.profile_image}>
                        Картинка в профиле
                    </div>
                    <div className={styles.log_out}>
                        <button className={styles.log_out__button}>Выйти</button>
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={styles.user}>
                        <div className={styles.user__block}>
                            <span className={styles.block_title}>Информация</span>
                            <div className={styles.user__change_info}>
                                <input className={styles.user__input} type='text' disabled={true} value={userInfo.name} placeholder='Имя'/>
                                <input className={styles.user__input} type='text' disabled={true} value={userInfo.surname} placeholder='Фамилия'/>
                                <input className={styles.user__input} type='email' disabled={true} value={userInfo.email} placeholder='Почта'/>
                                <div className={styles.user_profile_type}>{userInfo.profile_type}</div>
                            </div>
                            <button className={styles.change_info}>Изменить информацию</button>
                        </div>
                        <div className={styles.user__block}>
                            <span className={styles.block_title}>Смена пароля</span>
                            <div className={styles.change_password_block}>
                                <input className={styles.user__input} type='text' disabled={true} placeholder='Старый пароль'/>
                                <input className={styles.user__input} type='text' disabled={true} placeholder='Новый пароль'/>
                                <input className={styles.user__input} type='password' disabled={true} placeholder='Снова новый пароль'/>
                            </div>
                            <button className={styles.change_password}>Изменить пароль</button>
                        </div>
                        <div className={styles.user__delete}>
                            <button className={styles.delete_profile}>Удалить аккаунт</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
