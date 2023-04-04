/* eslint-disable import/no-anonymous-default-export */


export default (data) => {
  // 用于存储转换后的数据
  let result = [];

  // 遍历原始数据中的每一项
  // const sum = data.filter(item => item.sum)
  console.log(data, '----')
  data.forEach(item => {
    // 获取当前项的年份和月份
    let year = item?.date?.slice(0, 4) || '';
    let month = item?.date?.slice(5, 7) || '';

    let income = item?.income || 0
    let expend = item?.expend || 0
    // 检查结果数组中是否已经存在该年份和月份的数据
    let exist = result.find(item => item.year === year && item.month === month);


    // 如果不存在，则创建新的数据对象，并添加到结果数组中
    if (!exist) {
      let obj = {
        year: year,
        month: month,
        income,
        expend,
        list: []
      };
      result.push(obj);
      exist = obj;
    }

    if (item?.date) {
      // 将当前项添加到该月份的交易记录列表中
      exist.list.push({
        ...item,
        date: item.date,
        time: item.time,
        type: item.type,
        name: item.name,
        amount: item.amount,
        balance: item.balance,
      });
    } else {
      // exist.list.push(item)
 
    }

  });
  console.log(result)
  return result.sort((a, b) => a.month - b.month).sort((a, b) => a.year - b.year)
}

// const wb = XLSX.read(data, { type: 'binary', cellDates: true })

// console.log(jsonData.map(item => {
//   return ({
//     ...item,
//     '日期': moment(item['日期']).format("YYYY/MM/DD HH:mm:ss"),
//     '时间': moment(item['时间']).format("HH:mm:ss'"),
//     '月汇总': item?.__EMPTY && _.includes(item?.__EMPTY, '月汇总') ? item?.__EMPTY : ''
//   })
// }))