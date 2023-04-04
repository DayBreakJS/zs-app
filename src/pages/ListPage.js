/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sparse-arrays */
import React, { useState } from 'react'
import { NavBar, Space, Button, Popup, Tabs, PickerView, PullToRefresh, TabBar, InfiniteScroll } from 'antd-mobile'
import { SearchOutline, MoreOutline, AddOutline } from 'antd-mobile-icons'
import { useNavigate, useLocation } from "react-router-dom";
import MonthCard from '../components/MonthCard';
// import converData  from '../converData';
import { mockRequest } from '../mock-request'
import { sleep } from 'antd-mobile/es/utils/sleep'

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
  ]

]

const ListPage = () => {
  // const history = useHistory()
  const navigate = useNavigate()
  const [year, setYear] = React.useState('2023')
  const [month, setMonth] = React.useState('03')
  const [visible, setVisible] = useState(false)

  const [dataList, setDataList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [dataColumns, setDataColumns] = React.useState(_dataColumns)

  async function loadMore() {
    const append = await mockRequest()
    setDataList(append)
    setHasMore(append.length > 0 )
  }


  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline className='SearchOutline' />
        <MoreOutline />
      </Space>
    </div>
  )



  const back = () => {
    navigate('/home')
  }

  const statusRecord = {
    pulling: '下拉刷新',
    canRelease: <img style={{ width: '1.2rem' }} src={require('./../img/loding.gif')} />,
    refreshing: <img style={{ width: '1.2rem' }} src={require('./../img/loding.gif')} />,
  }

  const pvChange = (val, extend) => {
    setYear(val[0])
    setMonth(val[1])

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
      ]
      setDataColumns(_dataColumns)
    }

  }

  const onFilter = async () => {
    const append = await mockRequest(year, month)
    setDataList(append)
    setVisible(false)
    setHasMore(true)
  }

  // console.log(dataList,'---dataList')
  return (
    <div className='listPage'>
      <div className='listPage-top'>
        <NavBar className='listPage-NavBar' right={right} onBack={back}>
          收支
        </NavBar>
        <div className='filter'>
          <div className="filter-top-left">
            <div className='filter-top filter-date' onClick={() => setVisible(true)} >
              {year}.{month == '3' ? '03' : month}
              <div className="uptriangle"></div>
            </div>
            <div className=' filter-top filter-user'>
              全部账户
              <div className="uptriangle"></div>
            </div>
          </div>
          <div className='filter-top-right'>
            筛选
            <div className="uptriangle"></div>
          </div>
        </div>
      </div>

      <div className='listPage-content' >
        <div style={{ paddingBottom: '6.5vh'}}>
        <PullToRefresh
          completeDelay={100}
          headHeight={30}
          renderText={(status) => { return <div>{statusRecord[status]}</div> }}
          onRefresh={async () => { await sleep(100) }}
        >
          { dataList.map(item => <MonthCard {...item} setYear={setYear} setMonth={setMonth} /> ) }
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              renderText={(status) => { return <div>{statusRecord[status]}</div> }}
            />

        </PullToRefresh>
        </div>
      </div>
      <Popup
        visible={visible}
        showCloseButton
        onClose={() => { setVisible(false) }}
        onMaskClick={() => { setVisible(false) }}
        bodyStyle={{
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          height: '32vh'
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
            <Button block shape='rounded' color='danger' onClick={onFilter}>
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
