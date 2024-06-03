import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import { autoAuth } from '../../utils/autoAuth'
import { useNavigate } from 'react-router-dom'
import styles from './task.module.css'

export const TaskList = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(()=>{
        if (autoAuth()){
            setIsLoggedIn(true)
        }
        else {
            navigate('/login')
        }
    },[])

  return (
    <div className={styles.main}>
        <div className={styles.search}>
            <button onClick={console.log("Кнопка поиска")} className={styles.search_button}>Поиск</button>
            <input type='text' className={styles.search_input}/>
        </div>
        <div className={styles.task}>
          <div className={styles.task_color}></div>
          <span className={styles.task_title}>ЗадачаЗадачаЗадачаЗадачаЗадача
          ЗадачаЗадачаЗадача</span>
          <div className={styles.task_mentor}>
              <span className={styles.mentor_title}>Наставник</span>
              <span className={styles.mentor_name}>Фамилия Имя</span>
          </div>
          <span className={styles.task_date}>До 00.00.0000</span>
        </div>
        <div className={styles.task}>
          <div className={styles.task_color}></div>
          <span className={styles.task_title}>Задача</span>
          <div className={styles.task_mentor}>
              <span className={styles.mentor_title}>Наставник</span>
              <span className={styles.mentor_name}>Фамилия Имя</span>
          </div>
          <span className={styles.task_date}>До 00.00.0000</span>
        </div>
        <div className={styles.task}>
          <div className={styles.task_color}></div>
          <span className={styles.task_title}>Задача</span>
          <div className={styles.task_mentor}>
              <span className={styles.mentor_title}>Наставник</span>
              <span className={styles.mentor_name}>Фамилия Имя</span>
          </div>
          <span className={styles.task_date}>До 00.00.0000</span>
        </div>
    </div>
  )
}
