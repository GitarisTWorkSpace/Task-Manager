import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../utils/AuthContext'
import { NavLink, Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import { Header } from '../../UI/Header/Header';
import styles from './home.module.css'
import { getUserMeInfo } from '../../../utils/getUserMeInfo';

export const HomePage = () => {
    const {currentUserInfo, setCurrentUserInfo} = useContext(AuthContext)  

    const navigate = useNavigate()
    const accessToken = useLoaderData()

    useEffect(()=>{
        console.log(accessToken)
        if (accessToken == null){
            navigate('/login')
        }
        getUserMeInfo().then((user) => setCurrentUserInfo(user))
    },[])

    return (
        <div className={styles.main}>
                <Header title={"Главная"} profileButton={true}/>
                <div className={styles.home}>
                    <div className={styles.navBar}>
                        {currentUserInfo.role == "Администратор" ? <NavLink to="/registration" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Регистрация</NavLink> : <></>}
                        {currentUserInfo.role == "Администратор" ? <NavLink to="/department" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Отделы</NavLink> : <></>}
                        {currentUserInfo.role == "Администратор" && currentUserInfo.role == "Менеджер" ? <NavLink to="/connection" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Назначение наставников</NavLink> : <></>}
                        {currentUserInfo.role != "Стажер" ? <NavLink to="/templates" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Шаблоны</NavLink> : <></>}
                        {currentUserInfo.role != "Наставник" && currentUserInfo.role != "Стажер" ? <NavLink to="/users" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Профили</NavLink> : <></>}
                        {currentUserInfo.role == "Наставник" ? <NavLink to="/users" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Стажеры</NavLink> : <></>}
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
