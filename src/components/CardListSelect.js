/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sparse-arrays */
import React, { useState } from 'react'
import { NavBar, Space, Button, Popup, Radio } from 'antd-mobile'


const CardList = ({ onChange, cardName, cardVisible, setCardVisible }) => {

  const styleDiv = { width: '100vw', padding: '0 5vw', lineHeight: '7vh' }


  return (
    <Popup
      visible={cardVisible}
      showCloseButton
      onClose={() => { setCardVisible(false) }}
      onMaskClick={() => { setCardVisible(false) }}
      bodyStyle={{
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        height: '50vh'
      }}
    >
      <Radio.Group value={cardName} onChange={onChange} >
        <p style={{ textAlign: 'center', fontSize: '1.1rem', marginTop: '0.5rem' }}>全部账户</p>
        <div className='cardList' style={styleDiv}>
          <span style={{ width: '85vw', display: 'inline-block' }}>
            <img src={require('./../img/card.png')} style={{ width: '1.5rem', marginTop: '-7px', verticalAlign: 'middle' }} />
            <span style={{ fontSize: '1.1rem' }} > &nbsp;&nbsp;全部账户</span>
          </span>
          <Radio value="全部账户" />
        </div>
        <div className='cardList' style={styleDiv}>
          <span style={{ width: '85vw', display: 'inline-block' }}>
            <img src={require('./../img/card.png')} style={{ width: '1.5rem', marginTop: '-7px', verticalAlign: 'middle' }} />
            <span style={{ fontSize: '1.1rem' }} > &nbsp;&nbsp;一网通所有关联卡片</span>
          </span>

          <Radio value="一网通" />
        </div>
        <div className='cardList' style={styleDiv}>
          <span style={{ width: '85vw', display: 'inline-block' }}>
            <img src={require('./../img/logo.png')} style={{ width: '1.5rem', marginTop: '-7px', verticalAlign: 'middle' }} />
            <span style={{ fontSize: '1.1rem' }} > &nbsp;&nbsp;招商银行一卡通(0877)</span>
          </span>
          <Radio value="一卡通(0877)" />
        </div>
        <div className='cardList' style={styleDiv}>
          <span style={{ width: '85vw', display: 'inline-block' }}>
            <img src={require('./../img/logo.png')} style={{ width: '1.5rem', marginTop: '-7px', verticalAlign: 'middle' }} />
            <span style={{ fontSize: '1.1rem' }} > &nbsp;&nbsp;招商银行一卡通(8562)</span>
          </span>
          <Radio value="一卡通(8562)" />
        </div>
        <div className='cardList' style={styleDiv}>
          <span style={{ width: '85vw', display: 'inline-block' }}>
            <img src={require('./../img/logo.png')} style={{ width: '1.5rem', marginTop: '-7px', verticalAlign: 'middle' }} />
            <span style={{ fontSize: '1.1rem' }} > &nbsp;&nbsp;招商银行信用卡个人消费账户</span>
          </span>
          <Radio value="消费账户" />
        </div>
        <div className='cardList' style={styleDiv}>
          <span style={{ width: '85vw', display: 'inline-block' }}>
            <img src={require('./../img/logo.png')} style={{ width: '1.5rem', marginTop: '-7px', verticalAlign: 'middle' }} />
            <span style={{ fontSize: '1.1rem' }} > &nbsp;&nbsp;招商银行信用卡个人商务账广</span>
          </span>
          <Radio value="商务账广" />
        </div>
      </Radio.Group>
    </Popup>
  )
}

export default CardList