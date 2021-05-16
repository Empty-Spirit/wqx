import { r } from './http'

const api = {
  user: {
    login: r('POST login'), //登录接口
  },
  student:{
    stuList: r('POST stuList'), //全部学员
    stuAdd: r('POST stuAdd') //新增学员
  },
  order: {
    pay: r('POST pay') // 缴费
  }
}
export default api
