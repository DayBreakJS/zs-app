import { sleep } from 'antd-mobile/es/utils/sleep'
import converData from './converData';
// import data from './billdata.json'

import d2023_8562 from './data/2023-8562.json'


import testConverData from './testConverData';
import testData from './testData.json'

console.log(
  converData(testConverData(testData))
)

let count = 0
let start = 0
let end = 0
export async function mockRequest(items,year, month ) {
  // console.log(items,'----sss')
  if (items) {
  const _data = items
  const list = converData(_data).reverse().filter(i => Boolean(i.month))

  const huizong = _data.filter(item => item?.hz).reduce((prev, cur) => {
    prev[cur['hz']] = cur
    return prev
  }, {})
  
  list.forEach(item => {
    if (item?.month && item?.year) {
      item.income = huizong[item.year + item.month.replace(/\b(0+)/gi, "")]?.income || 0;
      item.expend = huizong[item.year + item.month.replace(/\b(0+)/gi, "")]?.expend || 0
    }
  })

  // console.log(list)
  if (year && month) {
    const newList = list.filter(item => item.year === year && item.month === month)
    const lisIndex = list.findIndex(item => item.year === year && item.month === month)
    // console.log(lisIndex, year , month,list)
    count=2
    end = lisIndex + 1
    return list.slice(lisIndex)
  } 
  // else {

  //   await sleep(500)
  //   count++
  //   if (count === 0) return []
  //   if (count === 1) {
  //     start = 0
  //     end = 3
  //   }
  //   if (count > 1) {
  //     start = end
  //     end = start + 3
  //   }
  //   // console.log(start, end, count,'---start, end')

  //   const newData = list.slice(start, end)
  //   return newData
  // }
  localStorage.setItem('filterDate', null)

  return list

  }
}
