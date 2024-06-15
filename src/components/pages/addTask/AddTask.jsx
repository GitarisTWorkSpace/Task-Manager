import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLoaderData, Link} from 'react-router-dom'
import styles from './add.module.css'
import axios from 'axios'
import { AuthContext } from '../../../utils/AuthContext'
import { getUserMeInfo } from '../../../utils/getUserMeInfo'
import { RootUrl } from '../../../config/config'


export const AddTask = () => {
    const {currentUserInfo, setCurrentUserInfo} = useContext(AuthContext)

    const [taskInfo, setTaskInfo] = useState({
        title: '',
        description: '',
        start_task: '',
        finish_task: '',
        score: 0,
        status: 'Новые',
        student: 0,
        mentor: 23
    })

    const {taskId} = useParams()
    const navigate = useNavigate()
    const accessToken = useLoaderData()

    useEffect(() => {
        if (accessToken == null){
            navigate('/login') 
        }
        getUserMeInfo().then((user) => setCurrentUserInfo(user))
        console.log(currentUserInfo)

        if (currentUserInfo.role == 'Стажер'){
            setTaskInfo({...taskInfo, student: currentUserInfo.index})
        }
        if (currentUserInfo.role == 'Наставник'){
            setTaskInfo({...taskInfo, mentor: currentUserInfo.index})
        }
    },[])

    const addTaskInfo = async () => {
        try{
            console.log(taskInfo)
            const response = await axios.post(RootUrl+'/task/add', {
                title: taskInfo.title,
                description: taskInfo.description,
                start_task: taskInfo.start_task,
                finish_task: taskInfo.finish_task,
                score: taskInfo.score,
                status: taskInfo.status,
                student: taskInfo.student,
                mentor: taskInfo.mentor
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }})
      
            const data = await response.data
            console.log(data)
            data.start_task = data.start_task.substring(0,10)
            data.finish_task = data.finish_task.substring(0,10)
      
            setTaskInfo(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <div className={styles.title_wrapper}>
                    <input 
                        type="text" 
                        className={styles.title_text} 
                        placeholder='Название задачи'
                        value={taskInfo.title}
                        onChange={(e) => setTaskInfo({...taskInfo, title: e.target.value})}/>
                </div>
            </div>
            <div className={styles.deadline}>
                <div className={styles.deadline_wrapper}>
                    <span>Сроки с </span>
                    <input type="date" 
                        className={styles.deadline_input} 
                        value={taskInfo.start_task}
                        onChange={(e) =>  setTaskInfo({...taskInfo, start_task: e.target.value})}/>
                    <span> по </span>
                    <input type="date" 
                        className={styles.deadline_input} 
                        value={taskInfo.finish_task}
                        onChange={(e) =>  setTaskInfo({...taskInfo, finish_task: e.target.value})}/>
                </div>
            </div>
            <div className={styles.description}>
                <div className={styles.description_wrapper}>
                    <textarea 
                        className={styles.description_text} 
                        value={taskInfo.description} 
                        placeholder='Описание задачи'
                        onChange={(e) => setTaskInfo({...taskInfo, description: e.target.value})}>
                    </textarea>
                </div>
            </div>
            <div className={styles.metadata}>
                <div className={styles.metadata_wrapper}>
                    <div className={styles.status}>
                        <span className={styles.status_title}>Состоние</span>
                        <select className={styles.status_dropdown} value={taskInfo.status} onChange={(e) => setTaskInfo({...taskInfo, status: e.target.value})}>
                            <option value="Новые">Новые</option>
                            <option value="В работе">В работе</option>
                            <option value="Готовы">Готовы</option>
                        </select>
                    </div>
                    <div className={styles.score}>
                        <span className={styles.score_title}>Оценка</span>
                        <input type="number" 
                            className={styles.score_input}
                            value={taskInfo.score}
                            disabled={currentUserInfo.role == 'Стажер' ? true : false}
                            onChange={(e) => setTaskInfo({...taskInfo, score: e.target.value})}/> 
                    </div>
                </div>
            </div>
            <div className={styles.users}>
                <div className={styles.users_wrapper}>
                    <div className={styles.mentor}>
                        <span className={styles.user_title}>Наставник</span>
                        <Link to={'/user/'+taskInfo.mentor} className={styles.user_name}>{taskInfo.mentor}</Link>
                        <button className={styles.user_change}>Назначить наставника</button>
                    </div>
                    <div className={styles.student}>
                        <span className={styles.user_title}>Стажер</span>
                        <Link to={'/user/'+taskInfo.student} className={styles.user_name}>{taskInfo.student}</Link>
                        <button className={styles.user_change}>Назначить стажера</button>
                    </div>
                </div>
            </div>
            <div className={styles.save}>
                <div className={styles.save_wrapper}>
                    <button className={styles.save_button} onClick={addTaskInfo}>Создать</button>
                </div>
            </div>            
        </div>
    )
}
