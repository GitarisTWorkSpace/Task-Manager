import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../utils/AuthContext'
import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import styles from './task.module.css'
import axios from 'axios'
import { RootUrl } from '../../../config/config'

export const TaskList = () => {
    const {setIsLoggedIn} = useContext(AuthContext)

    const [taskList, setTaskList] = useState([{}])

    const navigate = useNavigate()

    const accessToken = useLoaderData()

    const getAllTasks = async () => {
        const response = await axios.get(RootUrl+'/task/all', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }})

        const data = await response.data
        console.log(data)

        setTaskList(data)
    }

    const getUserInfo = async (index) => {
      if (index === undefined) return null
      const response = await axios.get(RootUrl+'/user/'+index, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }})

      const data = await response.data

      return data.name + ' ' +  data.surname
    }

    useEffect(()=>{
        console.log(accessToken)
        if (accessToken == null){
            navigate('/login') 
        }

        getAllTasks()
        setIsLoggedIn(true)
    },[])

    const searchTask = async () => {
    }

    const endDate = (date) => {
      if (date !== undefined)  
      {
        const reverseDate = date.substring(0, 10).replaceAll('-', '.')
        const year = reverseDate.substring(0, 4)
        const mounth = reverseDate.substring(5, 7)
        const day = reverseDate.substring(8, 10)
        return day+'.'+mounth+'.'+year
      }
    }

  return (
    <div className={styles.main}>
        <div className={styles.search}>
            <button onClick={searchTask} className={styles.search_button}>Поиск</button>
            <input type='text' className={styles.search_input}/>
        </div>
        {taskList.map((item) => 
          <Link to={'/task/'+item.index} className={styles.task}>
            <div className={styles.task_color}></div>
            <span className={styles.task_title}>{item.title}</span>
            <div className={styles.task_mentor}>
                <span className={styles.mentor_title}>Наставник</span>
                <span className={styles.mentor_name}>{item.mentor}</span>
            </div>
            <span className={styles.task_date}>До {endDate(item.finish_task)}</span>
          </Link>
        )}        
    </div>
  )
}
