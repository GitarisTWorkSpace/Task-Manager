import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../UI/Header/Header';
import styles from './home.module.css'

export const HomePage = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)  

    const navigate = useNavigate()

    useEffect(()=>{
        console.log(isLoggedIn)
        if (!isLoggedIn){
            console.log("редирект")
            return navigate("/login")
        }
    },[])

    return (
      <div className={styles.main}>
            <Header backButton={true} title={"Главная"} profileButton={true}/>
            <Link to='user/me'>Профиль</Link>
            <Link to='user/1'>Профиль 1</Link>
      </div>
    )
}
