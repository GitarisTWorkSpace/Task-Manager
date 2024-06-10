import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../utils/AuthContext'
import { NavLink, Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import { Header } from '../../UI/Header/Header';
import styles from './home.module.css'

export const HomePage = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)  

    const navigate = useNavigate()
    const accessToken = useLoaderData()

    useEffect(()=>{
        console.log(accessToken)
        if (accessToken == null){
            navigate('/login')
        }
        setIsLoggedIn(true)
    },[])

    return (
        <div className={styles.main}>
                <Header title={"Главная"} profileButton={true}/>
                <div className={styles.home}>
                    <div className={styles.navBar}>
                        <NavLink to="/main" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Главная</NavLink>
                        <NavLink to="/tasks" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Задачи</NavLink>
                        <NavLink to="/diagram" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Диграмма Ганта</NavLink>
                        <NavLink to="/kanban" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Канбан</NavLink>
                    </div>
                    <div className={styles.page}>
                        <Outlet />
                    </div>
                </div>
        </div>
    )
}
