import { sleep } from 'antd-mobile/es/utils/sleep'
import converData from './converData';
import data from './billdata.json'

let count = 0
let start = 0
let end = 0
export async function mockRequest(year, month) {
  const list = converData(data).reverse()
  if (year && month) {
    const newList = list.filter(item => item.year === year && item.month === month)
    const lisIndex = list.findIndex(item => item.year === year && item.month === month)
    // console.log(lisIndex, year , month,list)
    count=2
    end = lisIndex + 1
    return newList
  } else {

    await sleep(500)
    count++
    if (count === 0) return []
    if (count === 1) {
      start = 0
      end = 3
    }
    if (count > 1) {
      start = end
      end = start + 3
    }
    // console.log(start, end, count,'---start, end')

    const newData = list.slice(start, end)
    return newData
  }

}