const gender = [
  {
    value: 1,
    name: '男',
  },
  {
    value: 2,
    name: '女',
  },
]

// 班级分类
const classes = [
  {
    value: 1,
    name: '大班',
  },
  {
    value: 2,
    name: '中班',
  },
  {
    value: 3,
    name: '小班',
  },
]

// 学员状态
const stu_status = [
  {
    value: 1,
    name: '在校',
  },
  {
    value: 2,
    name: '毕业',
  },
]

// 是否缴费
const pay = [
  {
    value: 1,
    name: '已缴',
  },
  {
    value: 0,
    name: '未缴',
  },
]

// 是否报名
const status_message = [
  {
    value: 0,
    name: '否',
  },
  {
    value: 1,
    name: '是',
  },
]

// 用户分类
const empower = [
  {
    value: 1,
    name: '普通用户',
  },
  {
    value: 7,
    name: '教师',
  },
  {
    value: 8,
    name: '管理员',
  },
]

// 是否报名
const signUp = [
  {
    value: 0,
    name: '未报名 '
  },
  {
    value: 1,
    name: '已报名'
  },
  {
    value: 2,
    name: '未报名'
  }
]

// 学员详情
const stuMessage = [
  {
    value: 'stu_name',
    name: '姓名',
  },
  {
    value: 'birth',
    name: '生日',
  },
  {
    value: 'age',
    name: '年龄',
  },
  {
    value: 'class',
    name: '班级',
  },
  {
    value: 'phone',
    name: '手机号',
  },
  {
    value: 'sex',
    name: '性别',
  },
  {
    value: 'status',
    name: '学生状态',
  },
  {
    value: 'parent',
    name: '家长姓名',
  },
  {
    value: 'address',
    name: '地址',
  },
  {
    value: 'start_time',
    name: '入学时间',
  },
  {
    value: 'isStay',
    name: '住宿',
  },
  {
    value: 'isDance',
    name: '舞蹈',
  },
  {
    value: 'isEloquence',
    name: '口才',
  },
  {
    value: 'isTuition',
    name: '学费',
  },
  // {
  //   value: 'isBook',
  //   name: '书费',
  // },
  {
    value: 'car',
    name: '坐车',
  }
]
// 获取meta中数据的value或者name
const changeValue = (val: any, type: string) => {
  let value = ''
  val.map((item: any) => {
    if (item.value === Number(type)) {
      value = item.name
    } else if (item.name === type) {
      value = item.value
    }
  })
  return value
}

// 学生信息
const changeStuValue = (val: any, type: string) => {
  let value = ''
  val.map((item: any) => {
    if (item.value === type) {
      value = item.name
    } else if (item.name === type) {
      value = item.value
    }
  })
  return value
}
// 获取地址名称或者code
const changeAddress = (val: any, type: string) => {
  let value;
  Object.entries(val).map((item) => {
    if (item[0] === type) {
      value = item[1]
    } else if (item[1] === type) {
      value = item[0]
    }
  })
  return value
}

const meta = {
  gender,
  classes,
  stu_status,
  pay,
  empower,
  status_message,
  stuMessage,
  signUp,
  changeValue,
  changeAddress,
  changeStuValue,
}
export default meta
