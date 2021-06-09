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
    stuAdd: r('POST stuAdd'), //新增学员
    studentAdd: r('POST studentAdd'), //新增学员
    searchStudent: r('POST searchStudent'), //查询学员id
    share: r('POST share'), //分享接口
  },
  teacher:{
    tecList: r('POST tecList'), //教师列表
  },
  order: {
    pay: r('POST pay') // 缴费
  }
}
export default api
