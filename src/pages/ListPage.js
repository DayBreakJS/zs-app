/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sparse-arrays */
import React, { useState } from 'react'
import { NavBar, Space, Toast, Button, Popup, Tabs, PickerView, PullToRefresh, TabBar, InfiniteScroll } from 'antd-mobile'
import { SearchOutline, MoreOutline, AddOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";
import MonthCard from '../components/MonthCard';
// import converData  from '../converData';
import { mockRequest } from '../mock-request'
import { sleep } from 'antd-mobile/es/utils/sleep'
// const dataList = converData(data).reverse()
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
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ]
]

const ListPage = () => {
  const navigate = useNavigate()
  const [date, setDate] = React.useState('2023')
  const [month, setMonth] = React.useState('3')

  const [dataList, setDataList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [dataColumns, setDataColumns] = React.useState(_dataColumns)


  async function loadMore() {
    const append = await mockRequest()
    setDataList(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  // React.useEffect(() => {
  //   // loadMore()
  //   console.log('----')
  //    mockRequest(0)
  // },[])

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline className='SearchOutline' />
        <MoreOutline />
      </Space>
    </div>
  )

  const back = () => {
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })
    navigate('/')
  }
  const [visible, setVisible] = useState(false)

  const statusRecord = {
    pulling: '下拉刷新',
    canRelease: <img style={{ width: '1.2rem' }} src={require('./../img/loding.gif')} />,
    refreshing: <img style={{ width: '1.2rem' }} src={require('./../img/loding.gif')} />,
  }


  return (
    <div className='listPage'>
      <div className='listPage-top'>
        <NavBar className='listPage-NavBar' right={right} onBack={back}>
          收支
        </NavBar>
        <div className='filter'>
          <div className="filter-top-left">
            <div className='filter-top filter-date' onClick={() => setVisible(true)} >
              {date}.{month == '3' ? '03' : month}
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
          completeDelay={300}
          headHeight={30}

          renderText={(status) => {
            return <div>{statusRecord[status]}</div>
          }}
          onRefresh={async () => {
            await sleep(600)
          }}
        >
          {
            dataList.map(item => {
              return <MonthCard {...item} setDate={setDate} setMonth={setMonth} />
            })
          }
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              renderText={(status) => {
              return <div>{statusRecord[status]}</div>
            }}  />

        </PullToRefresh>
        </div>
      </div>
      {/* <Mask visible={visible} onMaskClick={() => setVisible(false)} /> */}
      <Popup
        visible={visible}
        showCloseButton
        onMaskClick={() => {
          setVisible(false)
        }}
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
              columns={dataColumns}
              value={[date, 3]}
              style={{ '--height': '130px', '--item-height': '2.8rem' }}
              onChange={(val, extend) => {
                setDate(val[0])

                if (val && val[0] != '2023') {
                  _dataColumns[1] = Array.from({ length: 12 }, (v, k) => k + 1).map(i => ({ label: i, value: i }))
                  setDataColumns(_dataColumns)

                } else {
                  _dataColumns[1] = [
                    { label: 1, value: 1 },
                    { label: 2, value: 2 },
                    { label: 3, value: 3 },
                  ]
                  setDataColumns(_dataColumns)
                }
                console.log('onChange', val, extend.items)
              }}
            />
            <Button block shape='rounded' color='danger'>
              确认
            </Button>
          </Tabs.Tab>
          <Tabs.Tab title='自定义' key='vegetables'>
            西红柿
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
