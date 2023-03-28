/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Switch, NavBar, Toast } from 'antd-mobile'
import _ from 'lodash'
import { RightOutline, MoreOutline, QuestionCircleOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";
import './detail.css'
const Detail = () => {
  const navigate = useNavigate()

  const right = (
    <div style={{ fontSize: 24, background: '#F8F8F8' }}>
      <Space style={{ '--gap': '16px' }}>
        <img style={{ width: '1.5rem' }} src={require('./../img/ej.png')} />
        <MoreOutline />
      </Space>
    </div>
  )

  const back = () => {
    navigate('/listPage')
  }

  return (
    <div className='detail-Page'>
      <NavBar className='detail-Page-NavBar' right={right} onBack={back}>
        交易详情
      </NavBar>
      <div className='detail-Page-card'>
        <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
          <Space style={{ marginTop: '2rem' }} align="center">
            <img style={{ width: '2rem' }} src={require('./../img/detail1.png')} />
            <span style={{ fontSize: '1.2rem', color: '#808080' }}>结息：3.99扣税：0</span>
          </Space>

        </div>
        <div style={{ textAlign: 'center', width: '100%', }}>
          <Space align="center">
            <span style={{ fontSize: '2.6rem', color: '#000', }}>+￥3.99 </span>
            <QuestionCircleOutline style={{ fontSize: '1.8rem', color: '#ccc', marginRight: '-1rem' }} />
          </Space>
        </div>
        <p style={{ textAlign: 'center', fontSize: '1rem', color:'#808080',marginTop:'-0.01rem'}}>余额¥6.395.09</p>
        <div style={{ width: '84.5vw', margin: '1.5rem auto',marginTop:'2rem' }}>
          <span style={{ fontSize: "1rem", color:'#808080'}}>交易卡号</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>一卡通 6225********4224</span>
        </div>
        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>交易时间</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>2023-03-21 03:44:07</span>
        </div>
        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>银行交易类型</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>账户结息</span>
        </div>
      </div>
      <div className='detail-Page-card2' style={{ paddingTop:'0.3rem'}}>
        <div style={{ width: '84.5vw', margin: '1.5rem auto',marginTop:'1rem' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>分类</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>
            <Space align='center'>
              <img src={require('./../img/$.png')} style={{ width: '1.2rem' }} />
              <span>投资收益</span>
              <RightOutline style={{ color: '#808080' }} />
            </Space>
          </span>
        </div>
        
        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>所属账本</span>
          <span style={{ fontSize: "1rem", float: 'right' ,color: '#808080' }}>请选择 <RightOutline /> </span>
        </div>
        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>不计入本月收支</span>
          <span style={{ fontSize: "1rem", float: 'right', color: '#808080' }}>
            <Switch defaultChecked style={{ '--height': '1.5rem','--width':'2.8rem', '--checked-color':'#E74A59' }}/>
          </span>
        </div>
        <div style={{ width: '84.5vw', margin: '0 auto',marginTop:'1.7rem' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>备注</span>
          <img style={{width:'100%',paddingTop:'0.5rem'}} src={require('./../img/bz.png')}/>
          
        </div>
      </div>
    </div>

  )
}

export default Detail

