/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import moment from 'moment'
import { Space, Input, NavBar, Avatar, Button ,NumberKeyboard } from 'antd-mobile'
import { useNavigate } from "react-router-dom";
import './login.css'


const now = moment();
let dateText='上午好'
if (now.hour() >= 6 && now.hour() < 12) {
  dateText = '上午好'
} else if (now.hour() >= 12 && now.hour() < 18) {
  dateText = '下午好'
} else {
  dateText = '晚上好'
}

const Login = () => {
  const [visible, setVisible] = React.useState(false)
  const [str, setStr] = React.useState('')

  const navigate = useNavigate()

  const right = (
    <div style={{ fontSize: 24, padding:'0 0.3rem' }}>
      <Space style={{ '--gap': '19px' }}>
        <img style={{ width: '1.5rem' }} src={require('./../img/ej.png')} />
      </Space>
    </div>
  )

  React.useEffect(() => {
    if (window?.StatusBar) {
      setTimeout(() => {
        window?.StatusBar.backgroundColorByHexString("#FFF");
      }, 10)
    }
  },[])

  const back = () => {
    navigate('/home')
  }

  const actions = {
    onClose: () => {
      setVisible('')
    },
    onInput: (key) => {
      setStr((s)=>s+key)
    },
    onDelete: () => {
      setStr((s) => s.substring(0,s.length-1))

    },
  }

  return (
    <div className='Login'>
      <NavBar className='listPage-NavBar' right={right} onBack={back}>
      </NavBar>
      <Avatar src='' style={{ '--size': '80px', borderRadius: '50%', margin: '0 auto', marginTop: '2.5rem',marginBottom:'1.4rem' }} />
      <span style={{ fontSize: '1.7rem' }}>159*****835，{dateText}</span>
      <div onClick={() => setVisible(true)}>

        <Input placeholder='请输入登录密码'  clearable value={str} type="password"
          onClear={() => setStr('')}
          onFocus={() => {
            // 屏蔽默认键盘弹出
            document.activeElement.blur();
            // TODO ...
          }} 
        style={{ width: '89vw',margin:'0 auto', borderBottom: '1px solid #ccc', padding: '0.1rem 0',marginTop:'1.2rem' }}
        />
      </div>

      <Button style={{
        width: '35vw', margin: '0 auto', marginTop: '5rem',
        '--background-color': '#E74A59', '--border-color': '#E74A59',
      }}
        block
        shape='rounded'
        color='primary'
        disabled={str.length<=0}
        onClick={() => {
          navigate('/listPage')
          localStorage.setItem('filterDate', null)
          sessionStorage.setItem('cardName',null)

          // window.location.reload()

        }}
      >
        登录
      </Button>
      <p style={{ fontSize: '0.9rem', marginTop: '2rem' }}>快速找回密码 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 短信安全登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 更多</p>
      <img style={{width:'1.5rem',marginTop:'1.5rem'}} src={require('./../img/wx.png')} />
      <NumberKeyboard
        visible={visible}
        showCloseButton={false}
        onClose={actions.onClose}
        onInput={actions.onInput}
        onDelete={actions.onDelete}
        title={<span style={{ color:'#9A9A9A',fontSize:'1.1rem'}}>招商银行安全输入
          <span onClick={() => { setVisible('') }} style={{ color: '#4C94F6', position: "absolute", right: '2rem' }}>完成</span>
        </span>}
        customKey='ABC'
      />
    </div>
  )
}

export default Login