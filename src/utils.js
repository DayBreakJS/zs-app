

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
  if (type === '欧') {
    console.log(formatted,'---formattedformatted')
    str = formatted.replace(/([0-9.,]+) (€)/g, '$2$1')
    console.log(formatted.replace(/([0-9.,]+) (€)/g, '$2$1'), '---str')

  }
  return str;
}

export { formatRMB }