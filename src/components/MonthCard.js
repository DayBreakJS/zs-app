/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Button, Tag } from 'antd-mobile'
import './css.css'
import _ from 'lodash'
import { HistogramOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";
import AnimatedNumber from 'react-animated-number'

import { formatRMB } from "../utils"

const typeIcon = {
  "退款": "退款",
  "出行": "出行",
  "酒店": "酒店",
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
  "其他支出": "其他支出",
}

const MonthCard = (props) => {
  const { year, month, income, expend, list, setYear, setMonth } = props
  const navigate = useNavigate()
  const _toFixed = (n) => {
    const num = Number(n);//将字符串转换为Number类型
    const result = num.toFixed(2);//将Number类型转换为保留两位数的字符串数据
    return result
  }

  const dayList = list?.reduce((prve, cur) => {
    prve[cur?.ymd] = [...prve[cur?.ymd] || [], cur]
    return prve
  }, {})

  const CardDayItem = () => {
    return Object.keys(dayList).map(date => {
      const _date = date.split('/')
      const dm = _date[1] + '.' + _date[2]
      return (
        <>
          <Tag color='#F9F9F9'
            style={{ color: '#000', padding: ' 0.2rem 0.5rem', margin: '0.5rem 0 0.3rem 0.5rem' }}>
            {dm}
          </Tag>
          {
            dayList[date]?.map(item => {
              // console.log(item)
              // const ymds = item?.ymd.split('/')
              const money = item?.amount > 0 ? `+${formatRMB(item?.amount)}` : `-${formatRMB(item?.amount * -1)}`
              return (
                <div onClick={() => {
                  // history.push('/some-other-page')
                  // window.history.push(`/detail?id=${item.date}`)
                  navigate(`/detail?id=${item.date}`)
                }}>
                  <div
                    // id={`MonthCard-img-div${ymds[0]}-${ymds[1]}`}
                    style={{ width: '82vw', display: 'flex', justifyContent: 'space-between', margin: '0.5rem auto' }}>
                    <Space align='center'>
                      <img src={require(`./../img/typeIcon/${typeIcon[item?.icon] || '现金'}.png`)}
                        style={{ width: '1.8rem', position: "relative", top: '2px', left: '-5px' }}
                      />
                      <span style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '-10px' }}>{item?.abstract}</span>
                    </Space>
                    <Space style={{ fontSize: '1rem', fontWeight: '500' }}>{money} </Space>
                  </div>

                  <div className='MonthCard-item-balance'>
                    <span > 储蓄卡 0877 {item?.time} </span>
                    <span className="MonthCard-item-balance-b">余额 {formatRMB(item?.balance)}</span>
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
    // const curDom9 = document.getElementById(`MonthCard-img-text${'2019'}-${'09'}`)?.getBoundingClientRect()

    if (curDom?.top <= 111 && curDom?.top >= 0) {
      setYear(year)
      setMonth(month)
    }
    if (curDom?.top <= 0 && curDom.bottom <= window.innerHeight) {
      // console.log(`MonthCard-img-text${year}-${month}`)
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

  return (
    <div className='MonthCard'  >
      <div className='MonthCard-img'>
        <img src={require('./../img/m1.jpg')} />
        <div className='MonthCard-img-box'>
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
              ￥
              {console.log(expend, '--====expend')}
              {_.isNumber(expend) && (<AnimatedNumber component="text" value={_.isNumber(expend) ? expend : 0}
                style={{
                  transition: '0.8s ease-out',
                  transitionProperty: 'background-color, color, opacity'
                }}
                frameStyle={perc => (perc === 100 ? {} : { opacity: 1 })}
                stepPrecision={0}
                duration={1000}
              // formatValue={(value) => value.toFixed(0)}
              // formatValue={n => _.isNumber(expend) ? expend :0}

              />)}
              {/* {formatRMB(expend)} */}
            </span>
            </Space>
            <Space align="center">收入&nbsp;<span style={{ fontWeight: 500, fontSize: '1rem' }}>
              ￥
              {_.isNumber(income) && (<AnimatedNumber component="text" value={_.isNumber(income) ? income : 0}
                style={{
                  transition: '0.8s ease-out',
                  transitionProperty: 'background-color, color, opacity'
                }}
                frameStyle={perc => (perc === 100 ? {} : { opacity: 1 })}
                stepPrecision={0}
                duration={1000}

              />)}
            </span></Space>

          </Space>

        </div>
      </div>
      <div className='MonthCard-item'>
        <CardDayItem />
      </div>
      <div>

      </div>

      {/* <p style={{ textAlign: 'center', color: '#ccc', lineHeight: '30px', fontSize: '14px' }}>本月无交易</p> */}
    </div>
  )
}

export default MonthCard