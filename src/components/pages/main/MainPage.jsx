import React, { useEffect, useState } from 'react'
import styles from './main.module.css'
import axios from 'axios'

export const MainPage = () => {
    const [projectList, setProjectList] = useState([])

    const getProjects = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/project/all', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessCode')
            }})

        const projects = await response.data

        setProjectList(projects)
        console.log(projectList)
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.diagram}>
                <h3 className={styles.diagram__title}>Диграмма Ганта</h3>
            </div>
            <div className={styles.projects}>
                <h3 className={styles.projects__title}>Проекты</h3>
                <div className={styles.project_list}>
                    {projectList.map((item) => 
                        <div className={styles.project__item}>
                            <span className={styles.project__item_title}>{item.title}</span>
                        </div>
                    )}                    
                </div>
            </div>
            <div className={styles.tasks}>
                <h3 className={styles.tasks__title}>Задачи</h3>
            </div>
        </div>
    )
}
