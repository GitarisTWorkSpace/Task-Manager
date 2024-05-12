import React from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

export const Header = (props) => {
    return (
        <div className={styles.header}>
            {props.backButton ? <Link to="/" className={styles.back}>Назад</Link> : <></>}
            <span className={styles.title}>{props.title}</span>
            {props.profileButton ? <Link to="/user/me" className={styles.profile}>Профиль</Link> : <></>}
        </div>
    )
}
