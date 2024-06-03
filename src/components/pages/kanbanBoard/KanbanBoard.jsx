import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../utils/AuthContext'
import { autoAuth } from '../../utils/autoAuth'
import { useNavigate } from 'react-router-dom'

export const KanbanBoard = () => {
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
    <div>KanbanBoard</div>
  )
}
