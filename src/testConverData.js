
// eslint-disable-next-line import/no-anonymous-default-export
export default (data) => {
  return data.map(item => {
    if (item['显示摘要']) {
      return ({
        ...item,
        type: item['收入'] === undefined ? '支出' : '收入',
        balance: item['余额'],
        icon: item['分类标识'],
        amount: item['收入'] === undefined ? 0 - Number(item['支出']) : 0 + Number(item['收入']),
        date: item['日期'],
        ymd: item['日期'].split(' ')[0],
        time: item['时间'],
        abstract: item['显示摘要'],
        title: item['点进后图标台头'],
        channel: item['交易渠道'],
        card: item['卡-卡号'],
        dealType: item['银行交易类型'],
      })
    } else if (item['收入'] !== undefined && item['支出'] !== undefined) {
      const str = item['__EMPTY'].split('年')
      const year = str[0]
      const month = str[1].split('月')[0]
      return { income: item['收入'], expend: item['支出'], hz: year+month}
    }
   
  })

}


// reader.onload = (e) => {
//   const data = e.target.result
//   const wb = XLSX.read(data, { type: 'binary', cellDates: true })

//   const wsname = wb.SheetNames[0]
//   const ws = wb.Sheets[wsname]
//   const jsonData = XLSX.utils.sheet_to_json(ws)
//   // console.log(jsonData, '---jsonData')
//   console.log(jsonData.map(item => {
//     return ({
//       ...item,
//       '日期': moment(item['日期']).format("YYYY/MM/DD HH:mm:ss"),
//       '时间': moment(item['时间']).format("HH:mm:ss"),
//     })
//   }))
//   importData(jsonData)
//   source.value = '' //清空上传文件组件的文件，可以再次上传同样的文件
// }