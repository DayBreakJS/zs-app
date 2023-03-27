/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Button, Space, Swiper, Toast } from 'antd-mobile'
import { MailFill, MoreOutline } from 'antd-mobile-icons'

const HomeSwiper = () => {
  return (
    <div style={{ width: '94vw', margin: ' 0 auto' }}>
      <Swiper autoplay loop indicator={() => null}>
        {
          Array.from({ length: 5 }, (v, k) => k + 1).map(i => {
            return (
              <Swiper.Item key={i}>
                <img src={require(`../img/l${i}.png`)} style={{ width: '94vw', height: '11vh' }} />
              </Swiper.Item>
            )
          })
        }
      </Swiper>
    </div>
  )
}

const MessageSwiper = () => {
  return (
    <div style={{ width: '94vw', margin: ' 0 auto' }} className="MessageSwiper">
      <Swiper direction='vertical' autoplay loop indicator={() => null}>
        {
          Array.from({ length: 5 }, (v, k) => k + 1).map(i => {
            return (
              <Swiper.Item key={i}>
                <Space align='center'>
                  <Button size='mini' style={{ background:'#F9F9F9'}}><MailFill /> 通知</Button>
                  <p className='message'>{i}小招有财: 请留意!节前投资买TA，假期<MoreOutline /></p>
                  </Space>
              </Swiper.Item>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export { MessageSwiper, HomeSwiper}