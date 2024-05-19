import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../UI/Header/Header';
import styles from './home.module.css'
import axios from 'axios';

export const HomePage = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)  
    const [projectList, setProjectList] = useState([{}])

    const navigate = useNavigate()

    const getProjcets = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/project/all', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessCode')
            }})
        const projects = await response.data
        setProjectList(projects)
    }

    useEffect(()=>{
        console.log(isLoggedIn)
        if (!isLoggedIn){
            console.log("редирект")
            return navigate("/login")
        }

        console.log("project")

        getProjcets()
    },[])

    return (
      <div className={styles.main}>
            <Header backButton={true} title={"Главная"} profileButton={true}/>
            <div className={styles.home}>
                <div className={styles.navBar}>
                    <NavLink to="/main" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Главная</NavLink>
                    <NavLink to="/projects" className={({isActive}) => {return isActive ? styles.nav__button_activate : styles.nav__button} }>Проекты</NavLink>
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
