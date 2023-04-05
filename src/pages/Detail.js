/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Switch, NavBar } from 'antd-mobile'
import { RightOutline, MoreOutline, QuestionCircleOutline } from 'antd-mobile-icons'
import { useNavigate, useLocation } from "react-router-dom";
import './detail.css'
import data from '../billdata.json'
import _ from 'lodash'
import moment from 'moment'

import { formatRMB } from "../utils"

const icons = {
  '张强': 'tx',
  '葛晓君': 'tx',
  '王翰泽': 'tx',
  '许宝丹': 'tx',
  '结息': 'wx',
  '财付通-微信转账': 'wx'
}

const typeIcon = {
  "出行": "出行",
  "酒店": "酒店",
  "生活日用": "生活日用",
  "休闲娱乐": "休闲娱乐",
  "医疗保健": "医疗保健",
  "充值缴费": "充值缴费",
  "现金": "现金",
  "转账给他人": '转账给他人',
  "红包": "红包",
  "房租房贷": "房租房贷",
  "文体教育": "文体教育",
  "手续费": '手续费',
  "公益": "公益",
  "保险": "保险",
  "还款": "还款",
  "其他支出": "其他支出",
}

const Detail = (props) => {
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id')
  const curItem = _.find(data, { 'date': id, })

  const right = (
    <div style={{ fontSize: 24, background: '#F8F8F8' }}>
      <Space style={{ '--gap': '16px' }}>
        <img style={{ width: '1.5rem' }} src={require('./../img/ej.png')} />
        <MoreOutline />
      </Space>
    </div>
  )

  const back = () => {
    navigate(-1)
    // window.location.reload()
    window.scrollTo(0,10)

  }

  const money = curItem?.amount > 0 ? `+ ${formatRMB(curItem?.amount)}` : `- ${formatRMB(curItem?.amount * -1)}`
  const date = moment(curItem?.date).format("YYYY-MM-DD HH:mm:ss")
  return (
    <div className='detail-Page'>
      <NavBar className='detail-Page-NavBar' right={right} onBack={back}>
        交易详情
      </NavBar>
      <div className='detail-Page-card'>
        <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
          <Space style={{ marginTop: '1.5rem' }} align="center">
            <img style={{ width: '1.5rem' }} src={require(`./../img/ttIcon/${icons[curItem?.title] || 'dp'}.png`)} />
            <span style={{ fontSize: '1rem', color: '#808080' }}>{curItem?.title}</span>
          </Space>

        </div>
        <div style={{ textAlign: 'center', width: '100%', }}>
          <Space align="center">
            <span style={{ fontSize: '2.2rem', color: '#000', lineHeight: '4rem' }}>{money} </span>
            <QuestionCircleOutline style={{ fontSize: '1.4rem', color: '#ccc', marginRight: '-1rem' }} />
          </Space>
        </div>
        <p style={{ textAlign: 'center', fontSize: '1rem', color: '#808080', marginTop: '-0.01rem' }}>余额 {formatRMB(curItem?.balance)}</p>
        <div style={{ width: '84.5vw', margin: '1.5rem auto', marginTop: '2rem' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>交易卡号</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>一卡通 4682********0877</span>
        </div>
        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>交易时间</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>{date}</span>
        </div>
        {
          curItem?.channel && (
            <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
              <span style={{ fontSize: "1rem", color: '#808080' }}>交易渠道</span>
              <span style={{ fontSize: "1rem", float: 'right' }}>{curItem?.channel}</span>
            </div>
          )
        }
        {
          curItem['__EMPTY_2'] && (
            <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
              <span style={{ fontSize: "1rem", color: '#808080' }}>收款银行</span>
              <span style={{ fontSize: "1rem", float: 'right' }}>{curItem['__EMPTY_2']}</span>
            </div>
          )
        }
        {
          curItem['__EMPTY_3'] && (
            <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
              <span style={{ fontSize: "1rem", color: '#808080' }}>收款账号</span>
              <span style={{ fontSize: "1rem", float: 'right' }}>{curItem['__EMPTY_3']}</span>
            </div>
          )
        }

        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>银行交易类型</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>{curItem?.dealType}</span>
        </div>
      </div>
      <div className='detail-Page-card2' style={{ paddingTop: '0.3rem' }}>
        <div style={{ width: '84.5vw', margin: '1.5rem auto', marginTop: '1rem' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>分类</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>
            <Space align='center'>
              <img src={require(`./../img/typeIcon/${typeIcon[curItem?.icon] || '现金'}.png`)}
                style={{ width: '1.6rem', position: "relative", top: '2px' }} />
              <span>{curItem?.icon}</span>
              <RightOutline style={{ color: '#808080' }} />
            </Space>
          </span>
        </div>
        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>对象</span>
          <span style={{ fontSize: "1rem", float: 'right' }}>本人 <RightOutline /> </span>
        </div>

        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>所属账本</span>
          <span style={{ fontSize: "1rem", float: 'right', color: '#808080' }}>请选择 <RightOutline /> </span>
        </div>
        <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>不计入本月收支</span>
          <span style={{ fontSize: "1rem", float: 'right', color: '#808080' }}>
            <Switch
              // defaultChecked
              style={{ '--height': '1.5rem', '--width': '2.8rem', '--checked-color': '#E74A59' }} />
          </span>
        </div>
        <div style={{ width: '84.5vw', margin: '0 auto', marginTop: '1.7rem' }}>
          <span style={{ fontSize: "1rem", color: '#808080' }}>备注</span>
          <img style={{ width: '100%', paddingTop: '0.5rem' }} src={require('./../img/bz.png')} />

        </div>
      </div>
    </div>

  )
}

export default Detail

