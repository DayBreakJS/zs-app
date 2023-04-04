
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