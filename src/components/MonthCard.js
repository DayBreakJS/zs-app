/* eslint-disable jsx-a11y/alt-text */

import React from 'react'
import { Space, Button } from 'antd-mobile'
import './css.css'
import _ from 'lodash'
import { HistogramOutline } from 'antd-mobile-icons'
const MonthCard = (props) => {
  const { year, month, income, expend, setDate , setMonth } = props
  
  const _toFixed = (n) => {
    const num = Number(n);//将字符串转换为Number类型
    const result = num.toFixed(2);//将Number类型转换为保留两位数的字符串数据
    return result
  }
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = React.useCallback(_.debounce((e) => {
    const curDom = document.getElementById(`MonthCard-img-text${year}-${month}`).getBoundingClientRect()
    if (curDom.top <= 111 && curDom.top >= -149) {
      setDate(year)
      setMonth(month)
    }

    if (curDom.top >= -70 && curDom.top <= 90) {
      setDate(year)
      setMonth(month)
    }
  }, 100), []);

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
              {year !=='2023'&&<span>/{ year}</span>}
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
      <p style={{ textAlign: 'center', color: '#ccc', lineHeight: '30px', fontSize: '14px' }}>本月无交易</p>
    </div>
  )
}

export default MonthCard