
import React from 'react'
import './loading.css'
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    setTimeout(() => {
      navigate('/home')
    }, 1000)
  })


  React.useEffect(() => {
    if (window?.StatusBar) {
      setTimeout(() => {
        window?.StatusBar.show()
        window?.StatusBar.backgroundColorByHexString("#FFF");
      }, 10)

    }
  }, [])

  return (
    <div className="Loading">

    </div>
  )
}

export default Loading