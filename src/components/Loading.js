
import React from "react";


const Loading=(props) => {
  return (
    <img src={require('./../img/loding.gif')} style={{ width: '1.3rem', height: '1.3rem' }} {...props} />
  )
}

export default Loading