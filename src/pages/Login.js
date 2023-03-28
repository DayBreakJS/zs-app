/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Input, NavBar, Avatar, Button ,NumberKeyboard } from 'antd-mobile'
import _ from 'lodash'
import { RightOutline, MoreOutline, QuestionCircleOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";
import './login.css'
const Login = () => {
const [visible,setVisible]=React.useState(false)
  const navigate = useNavigate()

  const right = (
    <div style={{ fontSize: 24, padding:'0 1rem' }}>
      <Space style={{ '--gap': '19px' }}>
        <img style={{ width: '1.5rem' }} src={require('./../img/ej.png')} />
      </Space>
    </div>
  )

  const back = () => {
    navigate('/listPage')
  }

  const actions = {
    onClose: () => {
      setVisible('')
    },
    onInput: (key) => {
    },
    onDelete: () => {
    },
  }

  return (
    <div className='Login'>
      <NavBar className='listPage-NavBar' right={right} onBack={back}>
      </NavBar>
      <Avatar src='' style={{ '--size': '70px', borderRadius: '50%', margin: '0 auto', marginTop: '2.5rem',marginBottom:'1.2rem' }} />
      <span style={{ fontSize: '2rem' }}>176*****053上午好</span>
      <div onClick={() => setVisible(true)}>

      <Input placeholder='请输入登录密码' clearable
        style={{ width: '89vw',margin:'0 auto', borderBottom: '1px solid #ccc', padding: '1rem 0',marginTop:'1.2rem' }}
        />
      </div>

      <Button style={{
        width: '35vw', margin: '0 auto', marginTop: '5rem',
        '--background-color': '#E74A59', '--border-color':'#E74A59'
      }}
        block
        shape='rounded'
        color='primary'
        onClick={()=>navigate('/listPage')}
      >
        登录
      </Button>
      <p style={{ fontSize: '0.9rem', marginTop: '2rem' }}>快速找回密码 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 短信安全登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 更多</p>
      
      <NumberKeyboard
        visible={visible }
        onClose={actions.onClose}
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        title='招商银行安全输入'
        customKey='ABC'
      />
    </div>
  )
}

export default Login