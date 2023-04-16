

function formatRMB(num, type) {
  
  const M = {
    '美': 'en-US',
    '英': 'en-GB',
    '欧':'de-DE',
    'HKD': 'zh-HK',
  }
  const C = {
    '美': 'USD',
    '英': 'GBP',
    '欧': 'EUR',
    'HKD': 'HKD',
  }

  let opt = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
  if (type == '美' || type == '英') {
    opt = {}
  }
  if (type == '欧') {
    opt = { currencyDisplay: 'symbol' }
    console.log(opt,'---opt')

  }

  
  const formatted = new Intl.NumberFormat(M[type] || 'zh-CN', {
    style: 'currency',
    currency: C[type] || 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol'
    // ...opt
  }).format(num);

  let str = formatted

  if (type === 'HKD') {
    str=str.replace('HK$', 'HKD')
  }
  // if (type === '欧') {
  //   console.log(formatted,'---formattedformatted')
  //   str = formatted.replace(/([0-9.,]+) (€)/g, '$2$1')
  //   console.log(formatted.replace(/([0-9.,]+) (€)/g, '$2$1'), '---str')

  // }
  return str;
}

const typeIcon = {
  "退款": "退款",
  "出行": "出行",
  "酒店": "酒店",
  "餐饮": '餐饮',
  "生活日用": "生活日用",
  "休闲娱乐": "休闲娱乐",
  "医疗保健": "医疗保健",
  "充值缴费": "充值缴费",
  "现金": "现金",
  "转账给他人": '转账给他人',
  "转账给自己": '转账给他人',
  "红包": "红包",
  "房租房贷": "房租房贷",
  "文体教育": "文体教育",
  "手续费": '手续费',
  "公益": "公益",
  "保险": "保险",
  '报销': '报销',
  "还款": "还款",
  "购物":'购物',
  "退 退款":'退 退款',
  "薪酬": "薪酬",
  "外汇": '外汇',
  "投资收益":'投资收益',
  "其他支出": "其他支出",
}


export { formatRMB, typeIcon }