import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../../../utils/AuthContext.jsx'
import styles from './profile.module.css'
import { Header } from '../../UI/Header/Header.jsx'
import { autoAuth } from '../../../utils/autoAuth.js'
import { getUserMeInfo } from '../../../utils/getUserMeInfo.js'
import { RootUrl } from '../../../config/config.js'
import axios from 'axios'

export const MyProfile = () => {
    const {setIsLoggedIn, currentUserInfo, setCurrentUserInfo} = useContext(AuthContext)

    const [canChangeInfo, setCanChangeInfo] = useState(false)
    const [canChangePassword, setCanChangePassword] = useState(false)
    const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword , setNewPassword] = useState('')

    const navigate = useNavigate()

    const accessToken = useLoaderData()

    useEffect(()=>{
        console.log(accessToken)
        if (accessToken == null){
            navigate('/login')
        }
        setIsLoggedIn(true)

        tryGetMeInfo();
    }, [])

    const tryGetMeInfo = async () => {
        let response = await getUserMeInfo()
        if (response.status === 401){
            autoAuth()
            response = await getUserMeInfo()
        }

        console.log(response)
        setCurrentUserInfo(response)
    }

    const changeInfo = async ()  => {
        try{
            const response = await axios.put(RootUrl+'/user/me', {
                index: currentUserInfo.index,
                name: currentUserInfo.name,
                surname: currentUserInfo.surname,
                email: currentUserInfo.email,
                profile_type: currentUserInfo.profile_type,
                is_active: currentUserInfo.is_active
            },  {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            const userData = await response.data
            console.log(userData)
            setCurrentUserInfo(userData)
        } catch (e){
            console.log(e)
        }
    }

    const changePassword = async () => {
        try {
            const response = await axios.post(RootUrl+'/user/me', {
                old_password: oldPassword,
                new_password: newPassword
            },  {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            })
    
            const data = await response.data
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteAccount = async () => {
        const response = await axios.delete(RootUrl+'/user/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        })

        const data = await response.data
        console.log(data)

        logOut()
    }

    const logOut = () => {
        setIsLoggedIn(false)
        localStorage.clear()
        navigate('/login')
        console.log("logOut")
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

    return (
        <div className={styles.main}>
            <Header backButton={true} title={"Профиль"}/>
            <div className={styles.profile}>
                <div className={styles.left_bar}>
                    <div className={styles.profile_image}>
                        <img className={styles.img} src="http://127.0.0.1:8000/api/json_tea" alt="Logo" />
                        <input className={styles.img_input} type="file" id="imgFile" accept="image/png, image/jpeg" onChange={(e) => console.log(e.target.files)}/>
                        <label className={styles.img_button} htmlFor="imgFile"><span>Выберите изображение</span></label>
                    </div>
                    <div className={styles.log_out}>
                        <button className={styles.log_out__button} onClick={logOut}>Выйти</button>
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={styles.user}>
                        <div className={styles.user__block}>
                            <span className={styles.block_title}>Информация</span>
                            <div className={styles.user__change_info}>
                                <input className={styles.user__input} 
                                       type='text' 
                                       disabled={!canChangeInfo} 
                                       value={currentUserInfo.name} 
                                       onInput={(e) => setCurrentUserInfo({...currentUserInfo, name: e.target.value})} 
                                       placeholder='Имя'/>
                                <input className={styles.user__input} 
                                       type='text' disabled={!canChangeInfo} 
                                       value={currentUserInfo.surname} 
                                       onInput={(e) => setCurrentUserInfo({...currentUserInfo, surname: e.target.value})} 
                                       placeholder='Фамилия'/>
                                <input className={styles.user__input} 
                                       type='email' disabled={!canChangeInfo} 
                                       value={currentUserInfo.email} 
                                       onInput={(e) => setCurrentUserInfo({...currentUserInfo, email: e.target.value})} 
                                       placeholder='Почта'/>
                                <div className={styles.user_profile_type}>{currentUserInfo.role}</div>
                            </div>
                            <button className={styles.change_info} onClick={changeInfoButton}>Изменить информацию</button>
                            {canChangeInfo ? <button className={styles.save_button} onClick={changeInfo}>Сохранить</button> : <></>}
                        </div>
                        <div className={styles.user__block}>
                            <span className={styles.block_title}>Смена пароля</span>
                            <div className={styles.change_password_block}>
                                <input className={styles.user__input} type='text' disabled={!canChangePassword} onInput={(e) => setOldPassword(e.target.value)} placeholder='Старый пароль'/>
                                <input className={styles.user__input} type='text' disabled={!canChangePassword} onInput={(e) => setNewPassword(e.target.value)} placeholder='Новый пароль'/>
                                <input className={styles.user__input} type='password' disabled={!canChangePassword} placeholder='Снова новый пароль'/>
                            </div>
                            <button className={styles.change_password} onClick={changePasswordButton}>Изменить пароль</button>
                            {canChangePassword ? <button className={styles.save_button} onClick={changePassword}>Сохранить</button> : <></>}
                        </div>
                        <div className={styles.user__delete}>
                            {confirmDeleteAccount ? <button className={styles.delete_profile} onClick={deleteAccount}>Подвердить удаление</button> : <></>}
                            <button className={styles.delete_profile} onClick={confirmDeleteAccountButton}>Удалить аккаунт</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
