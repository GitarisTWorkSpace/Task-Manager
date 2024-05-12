import React from 'react'
import styles from './header.module.css'

export const Header = (props) => {
    return (
        <div className={styles.header}>
            <span className={styles.title}>{props.title}</span>
        </div>
    )
}
