/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sparse-arrays */
import React, { useState } from 'react'
import { NavBar, Space, Button, Popup, Tabs, PickerView, PullToRefresh, TabBar, InfiniteScroll, Badge } from 'antd-mobile'
import { SearchOutline, MoreOutline, AddOutline, DownFill } from 'antd-mobile-icons'
import { useNavigate, useLocation } from "react-router-dom";
import MonthCard from '../components/MonthCard';
// import converData  from '../converData';
import { mockRequest } from '../mock-request'
import { sleep } from 'antd-mobile/es/utils/sleep'
import CardListSelect from '../components/CardListSelect'
import { formatRMB } from "../utils"
import data0877 from '../data/0877.json'
import data8562 from '../data/8562'
import data2023 from '../data/2023.json'
import data2023_8562 from '../data/2023-8562.json'


const _dataColumns = [
  [
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
  ],
  [
    { label: '1', value: '01' },
    { label: '2', value: '02' },
    { label: '3', value: '03' },
    { label: '4', value: '04' },

  ]

]

const ListPage = () => {
  const navigate = useNavigate()
  const filterDate = localStorage.getItem('filterDate');
  const _cardName = sessionStorage.getItem('cardName');
  const datess = filterDate?.split(',')


  const [year, setYear] = React.useState(datess[0] === 'null' ? '2023' : datess[0])
  const [month, setMonth] = React.useState((datess[1] === 'null' || !datess[1]) ? '04' : datess[1])
  const [visible, setVisible] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const [cardName, setCardName] = useState(_cardName === 'null' ? '全部账户' : _cardName)
  
  let _data = data2023
  if (cardName == '全部账户') {
    _data = data2023
  } else if (cardName == '一卡通(0877)') {
    _data = data0877
  } else if (cardName == '一卡通(8562)') {
    if (year == '2023') {
      _data = data2023_8562
    } else {
      _data = data8562
    }
  } 

  const [dataItems, setDataItems] = React.useState(_data)


  const [dataList, setDataList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [dataColumns, setDataColumns] = React.useState(_dataColumns)
  const [floatData, setFloatData] = React.useState(null)
  const [showFloat, setShowFloat] = React.useState(false)
  const [{ py, pm }, setPym] = React.useState({py:'',pm:''})


  React.useEffect(() => {
    loadMore()
    if (window?.StatusBar) {
      setTimeout(() => {
        window?.StatusBar.backgroundColorByHexString("#F7F7F7");
        window?.StatusBar.styleDefault()
      }, 10)
    }
  }, [])


  async function loadMore() {
    const filterDate = localStorage.getItem('filterDate');
    if (filterDate && filterDate !== "null") {
      const datess = filterDate.split(',')
      setYear(datess[0])
      setMonth(datess[1])
      const append = await mockRequest(dataItems,year, month )
      setDataList(append)
    } else {
      const append = await mockRequest(dataItems )
      setDataList(append)
      setHasMore(append.length > 0)
    }
  }

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '10px' }}>
        <SearchOutline className='SearchOutline' />
          <MoreOutline style={{ fontSize: 32 }} />
      </Space>
    </div>
  )

  const back = () => {
    navigate('/home')
    localStorage.setItem('filterDate', null)
    window?.StatusBar?.styleLightContent();
    window.scrollTo(0, 10)
  }

  const statusRecord = {
    pulling: '下拉刷新',
    canRelease: <img style={{ width: '1.2rem' }} src={require('./../img/loding.gif')} />,
    refreshing: <img style={{ width: '1.2rem' }} src={require('./../img/loding.gif')} />,
  }

  const pvChange = (val, extend) => {
    setYear(val[0])
    setMonth(val[1])
    // setPym({ py: val[0], pm: val[1] })
    if (val && val[0] != '2023') {
      _dataColumns[1] = Array.from({ length: 12 }, (v, k) => k + 1).map(i => (
        { label: `${i}`, value: `${i < 10 ? '0' + i : i}` }
      ))
      setDataColumns(_dataColumns)
    } else {
      _dataColumns[1] = [
        { label: '1', value: '01' },
        { label: '2', value: '02' },
        { label: '3', value: '03' },
        { label: '4', value: '04' },
      ]
      setDataColumns(_dataColumns)
    }
  }


  const DATALIST = {
    '全部账户': data2023,
    '一卡通(0877)': data0877,
    '一卡通(8562)': data8562,
  }
  const onChange =  (value) => {
    setCardVisible(false)
    setTimeout(async  ()=>{
      const append = await mockRequest(DATALIST[value] || data2023_8562, year, month)
     
      setDataList(append)
      setCardName(value)
      sessionStorage.setItem('cardName', value)
    },300)

  }


  const onFilter = async () => {
    window.scrollTo(0, 10)
    setVisible(false)
    setShowFloat(false)
    // setPym({py,pm})
    setTimeout(async () => {
      const append = await mockRequest(DATALIST[cardName] || data2023_8562, year, month)
      setDataList(append)
      setHasMore(true)
      setYear(year)
      setMonth(month)
      localStorage.setItem('filterDate', [year, month])
    }, 300)

  }

  React.useEffect(() => {
    const float = dataList.filter(item => item?.year == year && item?.month == month)[0]
    setFloatData(float)
  }, [year, month, dataList])

  const handleScroll = () => {
    const contentDom = document.getElementById(`listPage-content`)?.getBoundingClientRect()
    const scrollHeight = contentDom.top;
    if (scrollHeight<10) {
      setShowFloat(true)
    } else {
      setShowFloat(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  // console.log(showFloat,'---showFloat')
  // console.log(dataList, '---dataList')
  return (
    <div className='listPage'>
      <div className='listPage-top'>
        <NavBar className='listPage-NavBar' right={right} onBack={back}>
          收支
        </NavBar>
        <div className='filter'>
          <div className="filter-top-left">
            <div className='filter-top filter-date' onClick={() => {
              if (cardName != '全部账户') {
                setVisible(true)
              }
            }} >
              {year}.{month == '3' ? '03' : month}&nbsp;
              <DownFill />
            </div>
            <div className='filter-top filter-user' onClick={() => { setCardVisible(true) }}>
              {cardName}&nbsp;
              <DownFill style={{ width: '0.1ream' }} />
            </div>
          </div>
          <div className='filter-top-right'>
            筛选&nbsp;
            <DownFill />
          </div>
        </div>
        {
           floatData && showFloat  ? <div style={{ height: '35px', paddingLeft: 15 }}>
            <span style={{ fontSize: '0.9rem', lineHeight: '30px', color: '#959595' }}>
              支出 {formatRMB(floatData?.expend)} &nbsp;&nbsp;收入 {formatRMB(floatData?.income)}
            </span>
            <Button className='MonthCard-img-btn' size='mini' shape='rounded' color='primary'>
              <img style={{ width: '1rem', height: '1rem', filter: 'none', position: 'relative', top: '3px', left: '-2px' }} src={require('./../img/fx.png')} />分析
            </Button>
          </div> : null
        }

      </div>

      <div className='listPage-content' id="listPage-content" style={{ marginTop:'11.2vh'}} >
        <div style={{ paddingBottom: '6.5vh' }}>
          <PullToRefresh
            completeDelay={100}
            headHeight={30}
            renderText={(status) => { return <div>{statusRecord[status]}</div> }}
            onRefresh={async () => { await sleep(10) }}
          >
            {dataList.map(item => <MonthCard {...item} setYear={setYear} setMonth={setMonth} cardName={cardName} dataItems={dataItems} />)}
            {/* <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              renderText={(status) => { return <div>{statusRecord[status]}</div> }}
            /> */}
          </PullToRefresh>
        </div>
      </div>
      {/* 卡号 */}
      <CardListSelect cardName={cardName} onChange={onChange} cardVisible={cardVisible} setCardVisible={setCardVisible} />
      <Popup
        visible={visible}
        showCloseButton
        onClose={() => { setVisible(false) }}
        onMaskClick={() => { setVisible(false) }}
        bodyStyle={{
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          height: '35vh'
        }}
      >
        <Tabs stretch={false}>
          <Tabs.Tab title='月份选择' key='fruits'>
            <PickerView
              mouseWheel={true}
              value={[year, month]}
              onChange={pvChange}
              columns={dataColumns}
              style={{ '--height': '130px', '--item-height': '2.8rem' }}
            />
            <Button block shape='rounded' color='danger' style={{ marginTop: '5vh' }} onClick={onFilter}>
              确认
            </Button>
          </Tabs.Tab>
          <Tabs.Tab title='自定义' key='vegetables'>
          </Tabs.Tab>
        </Tabs>
      </Popup>

      <TabBar className='listPage-TabBar'>
        <TabBar.Item key={'123'}
          icon={<img className='listPage-TabBar-detail-icon' src={require('./../img/p1b.png')} />}
          title={'明细'} />
        <TabBar.Item key={'123'}
          icon={<img style={{ width: '1.8rem' }} src={require('./../img/mon.png')} />}
          title={'账本'} />
      </TabBar>
      <div className='add-icon'>
        <AddOutline />
      </div>
    </div >
  )
}

export default ListPage
