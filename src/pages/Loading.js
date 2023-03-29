
import React from 'react'
import './loading.css'
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    setTimeout(() => {
      navigate('/home')
    },1000)
  })

  return (
    <div className="Loading">

    </div>
  )
}

export default Loading