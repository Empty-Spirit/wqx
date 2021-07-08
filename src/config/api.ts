import { post, get } from './request'

let api = {
  user: {
    login: post('login'),
  },
  student: {
    stuList: post('stuList'),
    stuDel: post('delStudent'),
    stuAdd: post('studentAdd'),
  },
  order: {
    pay: post('pay'),
  }
}

export default api
