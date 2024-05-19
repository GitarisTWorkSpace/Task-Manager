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

    const [canChangeInfo, setCanChangeInfo] = useState(false)

    const [newName, setNewName] = useState('')
    const [newSurname, setNewSurname] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const [canChangePassword, setCanChangePassword] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword , setNewPassword] = useState('')

    const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false)

    const navigate = useNavigate()

    const params = useParams()

    const getMeInfo = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/user/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessCode')
            }
        })
        const userData = await response.data
        console.log(userData)
        setUserInfo(userData)
    }

    const getUserInfo = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/user/'+params.userId)
        const userData = await response.data
        console.log(userData)
        setUserInfo(userData)
    }

    const logOut = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('accessCode')
        navigate('/login')
        console.log("logOut")
    }

    const changeInfo = async ()  => {
        const response = await axios.put('http://127.0.0.1:8000/api/user/me', {
            index: userInfo.index,
            name: newName,
            surname: newSurname,
            email: newEmail,
            profile_type: userInfo.profile_type,
            is_active: userInfo.is_active
          }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessCode')
            }
        })
        const userData = await response.data
        console.log(userData)
        setUserInfo(userData)
    }

    const changePassword = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/user/me?old_password='+oldPassword+'&new_password='+newPassword, {}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessCode')
            }
        })

        const userData = await response.data
        console.log(userData)
        setUserInfo(userData)
    }

    const deleteAccount = async () => {
        const response = await axios.delete('http://127.0.0.1:8000/api/user/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessCode')
            }
        })

        const data = await response.data
        console.log(data)

        logOut()
    }

    const changeInfoButton = (e) => {
        e.preventDefault();

        setCanChangeInfo(!canChangeInfo)
    }

    const changePasswordButton = (e) => {
        e.preventDefault();

        setCanChangePassword(!canChangePassword)
    }

    const confirmDeleteAccountButton = (e) => {
        e.preventDefault();

        setConfirmDeleteAccount(!confirmDeleteAccount)
    }

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/login')
        }
        if (params.userId == null){
            console.log("sdkfnsduygbds")
            getMeInfo()
        } else 
            getUserInfo()

        setNewName(userInfo.name)
        setNewSurname(userInfo.surname)
        setNewEmail(userInfo.email)
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
                        {params.userId == null ? <button className={styles.log_out__button} onClick={logOut}>Выйти</button> : <></>}
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={styles.user}>
                        <div className={styles.user__block}>
                            <span className={styles.block_title}>Информация</span>
                            <div className={styles.user__change_info}>
                                <input className={styles.user__input} type='text' disabled={!canChangeInfo} value={!canChangeInfo ? userInfo.name : newName} onInput={(e) => setNewName(e.target.value)} placeholder='Имя'/>
                                <input className={styles.user__input} type='text' disabled={!canChangeInfo} value={!canChangeInfo ? userInfo.surname : newSurname} onInput={(e) => setNewSurname(e.target.value)} placeholder='Фамилия'/>
                                <input className={styles.user__input} type='email' disabled={!canChangeInfo} value={!canChangeInfo ? userInfo.email : newEmail} onInput={(e) => setNewEmail(e.target.value)} placeholder='Почта'/>
                                <div className={styles.user_profile_type}>{userInfo.profile_type}</div>
                            </div>
                            {params.userId == null ? <button className={styles.change_info} onClick={changeInfoButton}>Изменить информацию</button> : <></>}
                            {canChangeInfo ? <button className={styles.save_button} onClick={changeInfo}>Сохранить</button> : <></>}
                        </div>
                        {params.userId == null ? <div className={styles.user__block}>
                            <span className={styles.block_title}>Смена пароля</span>
                            <div className={styles.change_password_block}>
                                <input className={styles.user__input} type='text' disabled={!canChangePassword} onInput={(e) => setOldPassword(e.target.value)} placeholder='Старый пароль'/>
                                <input className={styles.user__input} type='text' disabled={!canChangePassword} onInput={(e) => setNewPassword(e.target.value)} placeholder='Новый пароль'/>
                                <input className={styles.user__input} type='password' disabled={!canChangePassword} placeholder='Снова новый пароль'/>
                            </div>
                            <button className={styles.change_password} onClick={changePasswordButton}>Изменить пароль</button>
                            {canChangePassword ? <button className={styles.save_button} onClick={changePassword}>Сохранить</button> : <></>}
                        </div> : <></>}
                        <div className={styles.user__delete}>
                            {confirmDeleteAccount ? <button className={styles.delete_profile} onClick={deleteAccount}>Подвердить удаление</button> : <></>}
                            {params.userId == null ? <button className={styles.delete_profile} onClick={confirmDeleteAccountButton}>Удалить аккаунт</button> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
