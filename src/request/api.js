import { r } from './http'

const api = {
  user: {
    login: r('POST login'), //登录接口
    userAdd: r('POST userAdd'), //授权登录接口
    userList: r('POST userList'), //角色列表
    repeatPwd: r('POST repeatPwd'), //修改密码
  },
  student:{
    stuList: r('POST stuList'), //全部学员
    stuAdd: r('POST stuAdd') //新增学员
  },
  teacher:{
    tecList: r('POST tecList'), //教师列表
  },
  order: {
    pay: r('POST pay') // 缴费
  }
}
export default api
