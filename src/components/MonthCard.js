/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Button, Tag } from 'antd-mobile'
import './css.css'
import _ from 'lodash'
import { RightOutline, InformationCircleOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";
import AnimatedNumber from 'react-animated-number'
import moment from 'moment'
import { formatRMB } from "../utils"

const typeIcon = {
  "退款": "退款",
  "出行": "出行",
  "酒店": "酒店",
  "餐饮":'餐饮',
  "生活日用": "生活日用",
  "休闲娱乐": "休闲娱乐",
  "医疗保健": "医疗保健",
  "充值缴费": "充值缴费",
  "现金": "现金",
  "转账给他人": '转账给他人',
  "转账给自己": '转账给他人',
  "红包": "红包",
  "房租房贷": "房租房贷",
  "文体教育": "文体教育",
  "手续费": '手续费',
  "公益": "公益",
  "保险": "保险",
  "还款": "还款",
  "外汇": '外汇',
  "其他支出": "其他支出",
}

const MonthCard = (props) => {
  const { year, month, income, expend, list, setYear, setMonth, cardName, dataItems } = props
  const navigate = useNavigate()

  // console.log(cardName, list, '---list')
 
  let dayList = list?.reduce((prve, cur) => {
    prve[cur?.ymd] = [...prve[cur?.ymd] || [], cur]
    return prve
  }, {})
  // if (cardName?.indexOf('0877') > -1) {
  //   dayList = list.filter(item => !item?.card || item?.card?.indexOf('0877')>-1)?.reduce((prve, cur) => {
  //     prve[cur?.ymd] = [...prve[cur?.ymd] || [], cur]
  //     return prve
  //   }, {})
  // }

  const CardDayItem = () => {
    return Object.keys(dayList).map(date => {
      const _date = date.split('/')
      const dm = _date[1] + '.' + _date[2]
      return (
        <>
          <Tag color='#F9F9F9'
            style={{ color: '#000', padding: ' 0.2rem 0.5rem', margin: '0.4rem 0 0.3rem 0.5rem' }}>
            {dm}
          </Tag>
          {
            dayList[date]?.map(item => {
              let money = ''
              if (item?.amount > 0) {
                if (item['币种符号']=='欧') {
                  money = `+€ ${item?.amount}`
                } else {
                  money = `+${formatRMB(item?.amount, item['币种符号'])}`
                }
              } else {
                if (item['币种符号'] == '欧') {
                  money = `-€ ${item?.amount * -1}`
                } else {
                  money = `-${formatRMB(item?.amount * -1, item['币种符号'])}`
                }
              }
              // const money = item?.amount > 0 ? `+${formatRMB(item?.amount, item['币种符号'])}` : `-${formatRMB(item?.amount * -1, item['币种符号'])}`
              return (
                <div
                  // style={{ background: item['__EMPTY'] == '重点条目' ? 'red' : '' }}
                  onClick={() => {
                  // history.push('/some-other-page')
                  // window.history.push(`/detail?id=${item.date}`)
                  navigate(`/detail?id=${item.date}&cardName=${cardName}`)
                }}>
                  <div
                    // id={`MonthCard-img-div${ymds[0]}-${ymds[1]}`}
                    style={{ width: '82vw', display: 'flex', justifyContent: 'space-between', margin: '0.5rem auto' }}>
                    <Space align='center'>
                      <img src={require(`./../img/typeIcon/${typeIcon[item?.icon] || '现金'}.png`)}
                        style={{ width: '1.8rem', position: "relative", top: '2px', left: '-5px' }}
                      />
                      <span style={{ fontSize: '1rem', fontWeight: '400', marginLeft: '-10px' }}>
                        {item?.abstract}
                      </span>
                    </Space>
                    <Space style={{ fontSize: '1rem', fontWeight: '500', color: item['不计入']?'#919191':'',marginTop:'7px'}}>
                      {item['不计入'] && <Tag style={{ borderRadius: '10px' }} color='#F79231' fill='outline' >不计入</Tag>}
                      {money}
                    </Space>
                  </div>

                  <div className='MonthCard-item-balance'>
                    <span >
                      {cardName == '全部账户' && ((item?.card || item['时间前卡号']) ? item?.card || item['时间前卡号'] : '储蓄卡0877')}
                      &nbsp;{moment(item?.date, 'HH:mm:ss').format('HH:mm').slice(0, 5)}
                    </span>
                    {
                      item?.balance && <span className="MonthCard-item-balance-b">
                        余额:&nbsp;
                        {/* {formatRMB(item?.balance, item['币种符号'])} */}
                        {/* {item['币种符号'] == '欧' && item?.balance>0?'+ ':'- '} */}
                        {item['币种符号'] == '欧' ? ' € ' + item?.balance : formatRMB(item?.balance, item['币种符号'])}
                      </span>
                    }
                    
                  </div>
                </div>
              )
            })
          }
        </>
      )
    })
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = (e) => {
    const curDom = document.getElementById(`MonthCard-img-text${year}-${month}`)?.getBoundingClientRect()

    if (curDom?.top <= 111 && curDom?.top >= 0) {
      setYear(year)
      setMonth(month)
    } 
    if (curDom?.top <= 0 && curDom.bottom <= window.innerHeight) {
      setYear(year)
      setMonth(month)
    } 

  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const curMonth = year === "2023" && month === '04'
  const curMonthStyle = { height: '17vh',paddingBottom:'1rem' }

  return React.useMemo(()=>(
    <div className='MonthCard'  >
      <div className='MonthCard-img' style={curMonth ? curMonthStyle : {}}>
        <img src={require(`./../img/m${month.replace(/\b(0+)/gi, "")}.png`)} style={curMonth ? curMonthStyle : {}} />
        <div className='MonthCard-img-box' style={curMonth ? curMonthStyle : {}}>
          <Space>
            <span className='MonthCard-img-text' id={`MonthCard-img-text${year}-${month}`}>
              <span className='MonthCard-img-box-month'>{month.replace(/\b(0+)/gi, "")}</span>
              <span className='MonthCard-img-box-unit'>月</span>
              {year !== '2023' && <span>/{year}</span>}
            </span>
            <Button className='MonthCard-img-btn' size='mini' shape='rounded' color='primary'>
              <img style={{ width: '1rem', height: '1rem', filter: 'none', position: 'relative', top: '3px', left: '-2px' }} src={require('./../img/fx.png')} />分析
            </Button>
          </Space>
          <Space className='MonthCard-img-box-money'>
            <Space align="center">支出&nbsp;<span style={{ fontWeight: 500, fontSize: '1rem' }}>
              {/* {formatRMB(expend)} */}
              ￥
              {_.isNumber(expend) && (<AnimatedNumber component="text" value={_.isNumber(expend) ? expend : 0}
                style={{
                  transition: '0.8s ease-out',
                  transitionProperty: 'background-color, color, opacity'
                }}
                frameStyle={perc => (perc === 100 ? {} : { opacity: 1 })}
                stepPrecision={0}
                duration={400}
              // formatValue={(value) => value.toFixed(0)}
              // formatValue={n => _.isNumber(expend) ? expend :0}

              />)}
              {/* {formatRMB(expend)} */}
            </span>
            </Space>
            <Space align="center">收入&nbsp;<span style={{ fontWeight: 500, fontSize: '1rem' }}>
              {/* {formatRMB(income)} {curMonth && <InformationCircleOutline />} */}
              ￥
              {_.isNumber(income) && (<AnimatedNumber component="text" value={_.isNumber(income) ? income : 0}
                style={{
                  transition: '0.8s ease-out',
                  transitionProperty: 'background-color, color, opacity'
                }}
                frameStyle={perc => (perc === 100 ? {} : { opacity: 1 })}
                stepPrecision={0}
                duration={400}

              />)}
            </span>
            </Space>
          </Space>
         { curMonth &&<div style={{fontSize:'0.8rem',position:'absolute',bottom:'2.1rem',left:'1rem'}}>设置预算 <RightOutline /></div> }

        </div>
      </div>
      <div className='MonthCard-item' style={{ paddingBottom:'10px'}}>
        <CardDayItem />

      </div>
      <div>

      </div>

      {/* <p style={{ textAlign: 'center', color: '#ccc', lineHeight: '30px', fontSize: '14px' }}>本月无交易</p> */}
    </div>
  ), [year, month, cardName, dataItems])
}

export default MonthCard