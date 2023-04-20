/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sparse-arrays */
import React from 'react'
import { Badge, TabBar } from 'antd-mobile'
import { useNavigate } from "react-router-dom";
import { HomeSwiper, MessageSwiper, HomeTopSwiper } from '../components/HomeSwiper'
// import createHistory from 'history/createBrowserHistory'
// const history = createHistory();
const Home = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (window?.StatusBar) {
      setTimeout(() => {
        window?.StatusBar.backgroundColorByHexString("#84B8EE");
      }, 10)

    }
  }, [])


  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <img src={require('./../img/1.png')} className="TabBar-icon" style={{ width: '6vw' }} />,
      badge: Badge.dot,
    },
    {
      key: 'todo',
      title: '社区',
      icon: <img src={require('./../img/2.png')} className="TabBar-icon" />,
      badge: '5',
    },
    {
      key: 'message',
      title: '财富',
      icon: <img src={require('./../img/3.png')} className="TabBar-icon" />,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '生活',
      icon: <img src={require('./../img/4.png')} className="TabBar-icon" />,
    },
    ,
    {
      key: 'wode',
      title: '我的 ',
      icon: <img src={require('./../img/5.png')} className="TabBar-icon" />,
    }
  ]
  return (
    <>
      <div className='app-content' >
        <div className='background-top' >
          <div className='anchor-point' onClick={() => {
            navigate('/login')
          }}>
            {/* anchor point */}
          </div>
        </div>
        <HomeTopSwiper/>
        <MessageSwiper/>
        <HomeSwiper />
        <div className='back b2'> </div>
        <div className='back b3'> </div>
        <div className='back b4'> </div>
        <div className='back b5'> </div>
        <div className='home-footer'>上滑去社区看看</div>

      </div>
      <TabBar className='TabBar' >
        {tabs.map((item, i) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </ >
  )
}

export default Home
