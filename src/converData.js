/* eslint-disable import/no-anonymous-default-export */


export default (data) => {
  // 用于存储转换后的数据
  let result = [];

  // 遍历原始数据中的每一项
  data.forEach(item => {
    // 获取当前项的年份和月份
    let year = item.date.slice(0, 4);
    let month = item.date.slice(5, 7);

    // 检查结果数组中是否已经存在该年份和月份的数据
    let exist = result.find(item => item.year === year && item.month === month);

    // 如果不存在，则创建新的数据对象，并添加到结果数组中
    if (!exist) {
      let obj = {
        year: year,
        month: month,
        income: 0,
        expend: 0,
        list: []
      };
      result.push(obj);
      exist = obj;
    }

    // 根据当前项的类型（收入或支出），更新该月份的总收入或总支出
    if (item.type === '收入') {
      exist.income += item.amount;
    } else {
      exist.expend += item.amount;
    }

    // 将当前项添加到该月份的交易记录列表中
    exist.list.push({
      date: item.date,
      time: item.time,
      type: item.type,
      name: item.name,
      amount: item.amount,
      balance: item.balance,
      cardNo: item.cardNo,
      category: item.category
    });
  });
  return result
}