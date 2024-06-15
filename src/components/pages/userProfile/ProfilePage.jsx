import React, { useState, useEffect }from 'react'
import { useNavigate, useLoaderData, useParams } from 'react-router-dom'
import styles from './profile.module.css'
import { Header } from '../../UI/Header/Header'
import axios from 'axios'
import { RootUrl } from '../../../config/config'

export const ProfilePage = () => {
    const [currentUserInfo, setCurrentUserInfo] = useState({})

    const navigate = useNavigate()
    const {userId} = useParams() 
    const accessToken = useLoaderData()

    const getUserInfo = async () => {
        try{
            const response = await axios.get(RootUrl+'/user/'+userId, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }})
    
            const data = await response.data

            setCurrentUserInfo(data)
        } catch(e) {
            if (e.response.status != 200)
            {
                navigate('/error')
            }
        }
        
        
    }

    useEffect(()=>{
        console.log(accessToken)
        if (accessToken == null){
            navigate('/login')
        }
        
        getUserInfo()
    }, [])

    return (
        <div className={styles.main}>
            <Header backButton={true} title={"Профиль"}/>
            <div className={styles.profile}>
                <div className={styles.left_bar}>
                    <div className={styles.profile_image}>
                        <img className={styles.img} src="http://127.0.0.1:8000/api/json_tea" alt="Logo" />
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={styles.user}>
                        <div className={styles.user__block}>
                            <span className={styles.block_title}>Информация</span>
                            <div className={styles.user__change_info}>
                                <input className={styles.user__input} 
                                       type='text' 
                                       disabled={true} 
                                       value={currentUserInfo.name} 
                                       placeholder='Имя'/>
                                <input className={styles.user__input} 
                                       type='text' 
                                       disabled={true} 
                                       value={currentUserInfo.surname} 
                                       placeholder='Фамилия'/>
                                <input className={styles.user__input} 
                                       type='email' 
                                       disabled={true} 
                                       value={currentUserInfo.email} 
                                       placeholder='Почта'/>
                                <div className={styles.user_profile_type}>{currentUserInfo.role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
