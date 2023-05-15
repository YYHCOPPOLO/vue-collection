const tableItem = {
  date: '2019-05-20', // 日期
  name: '被删', // 姓名
  phone: '13888888888', // 电话
  address: '深圳市南山区滨海大道 888 号', // 地址
}

const tableData = Array(20)
  .fill(tableItem)
  .map((x, i) => {
    return { id: i + 1, ...x }
  })

export default tableData
