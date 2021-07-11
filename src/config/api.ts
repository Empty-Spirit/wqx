import { post, get } from './request'

let api = {
  user: {
    login: post('login'), // 登录验证
    userAdd: post('userAdd'), //授权登录接口
    userList: post('userList'), //角色列表
    repeatPwd: post('repeatPwd'), //修改密码
  },
  student: {
    stuList: post('stuList'), //学员列表
    stuDel: post('delStudent'), // 删除学员
    stuAdd: post('studentAdd'), // 新增编辑学员
  },
  order: {
    pay: post('pay'), //缴费
  },
  teacher: {
    tecList: post('tecList'), //教师列表
  }
}

export default api
