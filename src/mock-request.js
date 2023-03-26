import { sleep } from 'antd-mobile/es/utils/sleep'
import converData from './converData';
import data from './billdata.json'

let count = 0
let start = 0
let end = 0
export async function mockRequest() {
  
  await sleep(2000)
  count++
  if(count===0) return []
  const list = converData(data).reverse()

  if (count === 1) {
    start = 0
    end = 3
  }
  if (count > 1) {
    start = end 
    end = start + 3
  }
  // console.log(start, end, count,'---start, end')

 const newData= list.slice(start, end)
  return newData
}