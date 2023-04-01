/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Button, Tag } from 'antd-mobile'
import './css.css'
import _ from 'lodash'
import { HistogramOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";


const MonthCard = (props) => {
  const { year, month, income, expend, list, setYear, setMonth } = props
  const navigate = useNavigate()

  const _toFixed = (n) => {
    const num = Number(n);//将字符串转换为Number类型
    const result = num.toFixed(2);//将Number类型转换为保留两位数的字符串数据
    return result
  }

  const dayList = list?.reduce((prve, cur) => {
    prve[cur?.date] = [...prve[cur?.date] || [], cur]
    return prve
  }, {})

  const CardDayItem = () => {
    return Object.keys(dayList).map(date => {
      const _date = date.split('-')
      return (
        <>
          <Tag color='#F9F9F9'
            style={{ color: '#000', padding: ' 0.2rem 0.5rem', margin: '0.5rem 0 0.3rem 0.5rem' }}>
            {_date[1] + '.' + _date[2]}
          </Tag>
          {
            dayList[date]?.map(item => {
              return (
                <div onClick={() => { navigate('/detail') }}>
                  <div style={{ width: '82vw', display: 'flex', justifyContent: 'space-between', margin: '0.5rem auto' }}>
                    <Space align='center'>
                      <img src={require('./../img/$.png')} style={{ width: '1.2rem' }} />
                      <span style={{ fontSize: '1rem', fontWeight: '500' }}>{item?.name}</span>
                    </Space>
                    <Space style={{ fontSize: '1rem', fontWeight: '500' }}> +￥{item?.amount} </Space>
                  </div>

                  <div className='MonthCard-item-balance'>
                    <span > 信用卡 6789 03:35 </span>
                    <span className="MonthCard-item-balance-b">余额 {item?.balance}</span>
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
  const handleScroll = React.useCallback(_.debounce((e) => {
    const curDom = document.getElementById(`MonthCard-img-text${year}-${month}`)?.getBoundingClientRect()
    if (curDom?.top <= 111 && curDom?.top >= -149) {
      setYear(year)
      setMonth(month)
    }

    if (curDom?.top >= -70 && curDom?.top <= 90) {
      setYear(year)
      setMonth(month)
    }
  }, 10), []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className='MonthCard'>
      <div className='MonthCard-img'>
        <img src={require('./../img/m1.jpg')} />
        <div className='MonthCard-img-box'>
          <Space>
            <span id={`MonthCard-img-text${year}-${month}`} className='MonthCard-img-text'>
              <span className='MonthCard-img-box-month'>{month.replace(/\b(0+)/gi, "")}</span>
              <span className='MonthCard-img-box-unit'>月</span>
              {year !== '2023' && <span>/{year}</span>}
            </span>
            <Button className='MonthCard-img-btn' size='mini' shape='rounded' color='primary'>
              <HistogramOutline /> 分析
            </Button>
          </Space>
          <Space className='MonthCard-img-box-money'>
            <Space align="center">支出<span style={{ fontWeight: 500, fontSize: '1rem' }}>￥{_toFixed(expend)}</span></Space>
            <Space align="center">收入<span style={{ fontWeight: 500, fontSize: '1rem' }}>￥{_toFixed(income)}</span></Space>

          </Space>

        </div>
      </div>
      <div className='MonthCard-item'>
        <CardDayItem />
        {/* <Tag color='#F9F9F9' style={{ color: '#000', padding: ' 0.2rem 0.5rem', margin: '0.5rem 0 0.3rem 0.5rem' }}>3.21</Tag>
        <div onClick={() => { navigate('/detail') }}>

          <div style={{ width: '82vw', display: 'flex', justifyContent: 'space-between', margin: '0.5rem auto' }}>
            <Space align='center'>
              <img src={require('./../img/$.png')} style={{ width: '1.2rem' }} />
              <span style={{ fontSize: '1rem', fontWeight: '500' }}>结息：3.99扣税：0</span>
            </Space>
            <Space style={{ fontSize: '1rem', fontWeight: '500' }}> +￥3.99 </Space>
          </div>

          <div className='MonthCard-item-balance'>
            <span > 信用卡 6789 03:35 </span>
            <span className="MonthCard-item-balance-b">余额 789.09</span>
          </div>
        </div>

        <div style={{ width: '82vw', display: 'flex', justifyContent: 'space-between', margin: '0.5rem auto' }}>
          <Space align='center'>
            <img src={require('./../img/$.png')} style={{ width: '1.2rem' }} />
            <span style={{ fontSize: '1rem', fontWeight: '500' }}>结息：3.99扣税：0</span>
          </Space>
          <Space style={{ fontSize: '1rem', fontWeight: '500' }}> +￥3.99 </Space>

        </div>
        <div className='MonthCard-item-balance'>
          <span > 信用卡 6789 03:35 </span>
          <span className="MonthCard-item-balance-b">余额 789.09</span>
        </div> */}
      </div>
      <div>

      </div>

      {/* <p style={{ textAlign: 'center', color: '#ccc', lineHeight: '30px', fontSize: '14px' }}>本月无交易</p> */}
    </div>
  )
}

export default MonthCard