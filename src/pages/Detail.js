/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Switch, NavBar, Badge, Loading } from 'antd-mobile'
import { RightOutline, MoreOutline, QuestionCircleOutline } from 'antd-mobile-icons'
import { useNavigate, useLocation } from "react-router-dom";
import './detail.css'
// import data from '../billdata.json'
import _ from 'lodash'
import moment from 'moment'

import data0877 from '../data/0877.json'
import data8562 from '../data/8562.json'
import data2023 from '../data/2023.json'
import data2023_8562 from '../data/2023-8562.json'
import data20208562 from '../data/20208562.json'



import { formatRMB, typeIcon } from "../utils"

const icons = {
  '张强': 'tx',
  '葛晓君': 'tx',
  '爱立信 (中国) 通信有限公司': 'tx',
  '爱立信（中国）通信有限公司': 'tx',
  '王翰泽': 'tx',
  '许宝丹': 'tx',
  '史新华': 'tx',
  '李辉美': 'tx',
  '邢来君':'tx',
  '邓鲁民':'tx',
  '孙茜': 'tx',
  '结息': 'wx',
  '汇款接单（零售汇款接单）': 'wx',
  '业务处理通讯费（境外途径汇款）': 'wx',
  '财付通-微信转账': 'wx',
  '银联ATM取款中国银行':'wx'
}


const Detail = (props) => {
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id')
  const cardName = searchParams.get('cardName')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 350);
  }, [])


  let cardNum = ''
  let _data = data2023
  if (cardName == '全部账户') {
    _data = data2023
  } else if (cardName == '一卡通(0877)') {
    _data = data0877
  } else if (cardName == '一卡通(8562)') {
    if (id.indexOf('2023') > -1) {
      _data = data2023_8562
    } else {
      _data = data8562
    }
  } else {
    _data = data2023_8562
  }
  const datas = [...data2023, ...data2023_8562, ...data8562, ...data20208562, ...data0877,]
  const curItem = _.find(datas, { 'date': id, })
  
  if (curItem) {
  
    const date1 = moment(id, "YYYY/MM/DD");
    const date2 = moment("2019/07/19", "YYYY/MM/DD")
    // console.log(curItem,'---date1, date2')

  if (cardName == '全部账户') {
    cardNum = curItem['__EMPTY_1']
  } else if (cardName == '一卡通(0877)') {
    cardNum = '4682********0877'
  } else if (cardName == '一卡通(8562)') {
    
    if (date1.diff(date2) < 0) {
      cardNum = '4100********8562'
    } else {
      cardNum = '6214********8562'
    }
    
    if (curItem?.title?.indexOf('爱立信')>-1) {
      cardNum = '4100********8562'

    }

  } else {
    cardNum = curItem['__EMPTY_1'] || '全部账户'
  }
  }

  // console.log(cardName, '--cardName')
  // console.log(curItem, '--curItem')

  const Loading = () => {
    return (
      <div style={{ width: '100vw', textAlign: 'center' }}>
        <p><img style={{ width: '1.5rem', marginTop: '25vh' }} src={require('./../img/loding.gif')} /></p>
        <span style={{ textAlign: 'center' }}>加载中,请稍等</span>
      </div>
    )
  }

  const right = (
    <div style={{ fontSize: 24, background: '#F8F8F8' }}>
      <Space style={{ '--gap': '16px' }}>
        <img style={{ width: '1.5rem' }} src={require('./../img/ej.png')} />
        <Badge content='99' style={{ '--right': '5px', '--top': '4px', '--color': '#ED3A3B' }}>
          <MoreOutline style={{ fontSize: 32 }} />
        </Badge>
      </Space>
    </div>
  )

  const back = () => {
    navigate(-1)
    // window.location.reload()
    window.scrollTo(0, 10)

  }

  React.useEffect(() => {
    if (window?.StatusBar) {
      setTimeout(() => {
        window?.StatusBar.backgroundColorByHexString("#F8F8F8");
        window?.StatusBar.styleDefault()
      }, 10)

    }
  }, [])

  let money = ''
  if (curItem?.amount > 0) {
    if (curItem&&curItem['币种符号'] == '欧') {
      money = `+ € ${formatRMB(curItem?.amount).replace('¥', '') }`
    } else {
      money = `+ ${formatRMB(curItem?.amount, curItem['币种符号'])}`
    }
  } else {
    if (curItem &&curItem['币种符号'] == '欧') {
      money = `- € ${formatRMB(curItem?.amount * -1).replace('¥', '') }`
    } else {
      money = `- ${formatRMB(curItem?.amount * -1, curItem&&curItem['币种符号'])}`
    }
  }

  // const money = curItem?.amount > 0 ? `+ ${formatRMB(curItem?.amount, curItem['币种符号'])}` : `- ${formatRMB(curItem?.amount * -1, curItem['币种符号'])}`
  const date = moment(curItem?.date).format("YYYY-MM-DD HH:mm:ss")
  const align = curItem?.title?.length > 20 ? "start" : 'center'
  const titleWidth = curItem?.title?.length > 20 ? { display: 'inline-block', width: '75vw' } : {}
  const imgWidth = curItem?.title?.length > 20 ? { marginTop: '-5px' } : {}


  return (
    <div className='detail-Page'>
      <NavBar className='detail-Page-NavBar' right={right} onBack={back}>
        交易详情
      </NavBar>
      {
        (loading || !curItem )? <Loading /> : (
          <>
            <div className='detail-Page-card'>
              <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
                {<Space style={{ marginTop: '1.5rem' }} align={align}>
                  {curItem?.title && <img style={{ width: '1.5rem', ...imgWidth }} src={require(`./../img/ttIcon/${icons[curItem?.title] || 'dp'}.png`)} />}
                  <span style={{ fontSize: '1rem', color: '#808080', ...titleWidth }}>{curItem?.title}</span>
                </Space>}

              </div>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <Space align="center">
                  <span className='Detail-money' style={{ fontSize: '2rem', color: '#000', lineHeight: '4rem', }}>
                    {money.replace('¥', '¥ ')}
                  </span>
                  <QuestionCircleOutline style={{ fontSize: '1.1rem', color: '#ccc', marginRight: '-1rem' }} />
                </Space>
              </div>
              <p style={{ textAlign: 'center', fontSize: '1rem', color: '#808080', marginTop: '-0.01rem', }}>
                {curItem?.balance ? '余额 ' + formatRMB(curItem?.balance) : ''}
                {curItem?.date?.indexOf('12:54:53') != -1 ?'余额€0.00':null}
              </p>
              {/* <div style={{ width: '84.5vw', margin: '1.5rem auto', marginTop: '2rem' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>交易卡号</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>
                      {card[cardName] ? card[cardName] : curItem['__EMPTY_1']|| '4682********0877'}
                    </span>
                  </div> */}

              {
                cardNum && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto', marginTop: '2rem' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>交易卡号</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>
                      {cardNum || '4682********0877'}
                    </span>
                  </div>
                )
              }
              <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                <span style={{ fontSize: "1rem", color: '#808080' }}>交易时间</span>
                <span style={{ fontSize: "1rem", float: 'right' }}>{date}</span>
              </div>
              {
                (curItem['__EMPTY_2'] || curItem['收款银行'] != '无' && curItem['收款银行']) && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>收款银行</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>{curItem['__EMPTY_2'] || curItem['收款银行']}</span>
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
              {
                curItem['付款银行'] && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>付款银行</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>{curItem['付款银行']}</span>
                  </div>
                )
              }
              {
                (cardName == '一卡通(8562)' && curItem['卡号'] ) && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>收款账号</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>{ curItem['卡号']}</span>
                  </div>
                )
              }

              {
                ((cardName == '一卡通(8562)' || curItem?.title?.indexOf('爱立信')>-1)&&  curItem['付款账号'] ) && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>付款账号</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>{curItem['付款账号'] }</span>
                  </div>
                )
              }
              {
                curItem['转账附言'] && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>转账附言</span>
                    <span style={{ fontSize: "1rem", float: 'right', width: '68vw', textAlign: 'end' }}>{curItem['转账附言']}</span>
                  </div>
                )
              }
              {
               ( curItem?.channel || curItem['交易渠道']) && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>交易渠道</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>{curItem?.channel || curItem['交易渠道']}</span>
                  </div>
                )
              }
              {
                curItem['银行交易类型'] == '银联POS消费' && !curItem?.channel && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>交易渠道</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>无</span>
                  </div>
                )
              }

              {
                curItem['国家或地区'] && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>国家或地区</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>{curItem['国家或地区']}</span>
                  </div>
                )
              }
              {
                curItem['原交易金额（币种）'] && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>原交易金额（币种）</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>{curItem['原交易金额（币种）']}</span>
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
                    {cardName ? <img src={require('./../img/info.png')} style={{ width: '1.2rem',marginTop:'1px' }} /> : <RightOutline style={{ color: '#808080' }} /> }
                  </Space>
                </span>
              </div>
              {
                (!curItem['付款银行'] && !curItem['币种符号']) && (
                  <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                    <span style={{ fontSize: "1rem", color: '#808080' }}>对象</span>
                    <span style={{ fontSize: "1rem", float: 'right' }}>本人 <RightOutline /> </span>
                  </div>
                )
              }

              <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                <span style={{ fontSize: "1rem", color: '#808080' }}>所属账本</span>
                <span style={{ fontSize: "1rem", float: 'right', color: '#808080' }}>请选择 <RightOutline /> </span>
              </div>
              <div style={{ width: '84.5vw', margin: '1.5rem auto' }}>
                <span style={{ fontSize: "1rem", color: '#808080' }}>不计入本月收支</span>
                <span style={{ fontSize: "1rem", float: 'right', color: '#808080' }}>
                  <Switch
                    defaultChecked={curItem['不计入']}
                    style={{ '--height': '1.5rem', '--width': '2.8rem', '--checked-color': '#E74A59' }} />
                </span>
              </div>
              <div style={{ width: '84.5vw', margin: '0 auto', marginTop: '1.7rem' }}>
                <span style={{ fontSize: "1rem", color: '#808080' }}>备注</span>
                <img style={{ width: '100%', paddingTop: '1rem' }} src={require('./../img/bz.png')} />

              </div>
            </div>
          </>

        )
      }
    </div>

  )
}

export default Detail

