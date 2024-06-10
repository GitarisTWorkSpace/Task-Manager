import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLoaderData, useParams, Link } from 'react-router-dom'
import { AuthContext } from '../../../utils/AuthContext'
import { getUserMeInfo } from '../../../utils/getUserMeInfo'
import styles from './task.module.css'
import axios from 'axios'
import { RootUrl } from '../../../config/config'

export const TaskInfo = () => {
    const {currentUserInfo, setCurrentUserInfo} = useContext(AuthContext)

    const [taskInfo, setTaskInfo] = useState({})

    const {taskId} = useParams()
    const navigate = useNavigate()
    const accessToken = useLoaderData()
    
    const getTaskInfo = async () => {
        console.log(taskId)
        const response = await axios.get(RootUrl+'/task/'+taskId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }})
  
        const data = await response.data
        console.log(data)
  
        setTaskInfo(data)
    }

    const changeStatus = async (status) => {
        console.log(status)
        setTaskInfo({...taskInfo, status: status})
        const response = await axios.put(RootUrl+'/task/'+taskId, {
            title: taskInfo.title,
            description: taskInfo.description,
            create_at: taskInfo.create_at,
            start_task: taskInfo.start_task,
            finish_task: taskInfo.finish_task,
            score: taskInfo.score,
            status: status,
            student: taskInfo.student,
            mentor: taskInfo.mentor
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }})
  
        const data = await response.data
        console.log(data)
  
        setTaskInfo(data)
    }

    useEffect(() => {
        if (accessToken == null){
            navigate('/login') 
        }
        getUserMeInfo().then((user) => setCurrentUserInfo(user))
        console.log(currentUserInfo)

        getTaskInfo()
    },[])

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
            <div className={styles.title}><span className={styles.title_text}>{taskInfo.title}</span></div>
            <div className={styles.deadline}><span className={styles.deadline_text}>{endDate(taskInfo.start_task)} - {endDate(taskInfo.finish_task)}</span></div>
            <div className={styles.description}>
                <span className={styles.description_text}>
                    {taskInfo.description}
                </span>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
                <div className={styles.wrapper}>
                    <div className={styles.status}>
                        <select className={styles.status_dropdown} value={taskInfo.status} onChange={(e) => changeStatus(e.target.value)}>
                            <option value="Новые">Новые</option>
                            <option value="В работе">В работе</option>
                            <option value="Готовы">Готовы</option>
                        </select>
                    </div>
                    <div className={styles.mentor}>
                        <span className={styles.mentor_title}>Наставник</span>
                        <Link to='/' className={styles.mentor_name}>{taskInfo.mentor}</Link>
                    </div>
                </div>
            </div>
            <div className={styles.score}>
                <div className={styles.score_wrapper} style={{backgroundColor: "#505050", height: '100%', }}>
                    <span className={styles.score_title}>Оценка</span>
                    <input type="number"  className={styles.score_input}/>
                </div>
            </div>
            <div className={styles.comment}>
                <div className={styles.columen_wrapper}>
                    <span className={styles.comment_title}>Комментарии</span>
                    <div className={styles.comment_list}>                            
                        <div className={styles.comment_item}>
                            <div className={styles.comment_user}>{taskInfo.mentor}</div>
                            <span className={styles.comment_text}>Lorem, ipsum dolor sit amet consectetur 
                                adipisicing elit. Debitis iusto laudantium 
                                qui minus dolore, soluta quae amet eos, 
                                rerum dolorum
                            </span>
                        </div>
                        <div className={styles.comment_item}>
                            <div className={styles.comment_user}>{taskInfo.mentor}</div>
                            <span className={styles.comment_text}>Lorem, ipsum dolor sit amet consectetur 
                                adipisicing elit. Debitis iusto laudantium 
                                qui minus dolore, soluta quae amet eos, 
                                rerum dolorum
                            </span>
                        </div>
                        <div className={styles.comment_item}>
                            <div className={styles.comment_user}>{currentUserInfo.name}</div>
                            <span className={styles.comment_text}>Lorem, ipsum dolor sit amet consectetur 
                                adipisicing elit. Debitis iusto laudantium 
                                qui minus dolore, soluta quae amet eos, 
                                rerum dolorum
                            </span>
                        </div>
                    </div>
                    <div className={styles.comment_new}>
                        <div className={styles.comment_user}>{currentUserInfo.name}</div>
                        <textarea type='text' className={styles.comment_input}></textarea>
                        <button className={styles.comment_upload}>Отправить</button>
                    </div>
                </div>
            </div>                
        </div>
    )
}
