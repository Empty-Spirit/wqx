const gender = [
  {
    value:1,
    name:'男',
  },{
    value:2,
    name:'女',
  }
];

// 班级分类
const classes = [
  {
    value:1,
    name:'大班'
  },{
    value:2,
    name:'中班'
  },{
    value:3,
    name:'小班'
  }
]

// 学员状态
const stu_status = [
  {
    value:1,
    name:'在校'
  },{
    value:2,
    name:'毕业'
  }
]

// 是否缴费
const pay = [
  {
    value:1,
    name:'已缴'
  },{
    value:2,
    name:'未缴'
  }
]

// 是否缴费
const status_message = [
  {
    value:1,
    name:'是'
  },{
    value:2,
    name:'否'
  }
]


// 是否缴费
const empower = [
  {
    value:1,
    name:'普通用户'
  },{
    value:7,
    name:'教师'
  },{
    value:8,
    name:'管理员'
  }
]

// 是否缴费
const stuMessage = [
  {
    value:'stu_name',
    name:'姓名'
  },{
    value:'birth',
    name:'生日'
  },{
    value:'age',
    name:'年龄'
  },{
    value:'class',
    name:'班级'
  },{
    value:'phone',
    name:'手机号'
  },{
    value:'sex',
    name:'性别'
  },{
    value:'status',
    name:'学生状态'
  },{
    value:'parent',
    name:'家长姓名'
  },{
    value:'address',
    name:'地址'
  },{
    value:'start_time',
    name:'入学时间'
  },{
    value:'stay',
    name:'住宿'
  },{
    value:'dance',
    name:'舞蹈'
  },{
    value:'eloquence',
    name:'口才'
  },{
    value:'tuition',
    name:'学费'
  },{
    value:'book',
    name:'书费'
  }
]
// 获取meta中数据的value或者name
const changeValue = (val, type) => {
  let value = null
  val.map(item => {
    if(item.value === Number(type)){
      value = item.name
    } else if (item.name === type){
      value = item.value
    }
  })
  return value
};

// 学生信息
const changeStuValue = (val, type) => {
  let value = null
  val.map(item => {
    if(item.value === type){
      value = item.name
    } else if (item.name === type){
      value = item.value
    }
  })
  return value
};
// 获取地址名称或者code
const changeAddress = (val, type) => {
  let value = null
  Object.entries(val).map(item => {
    if(item[0] === type){
      value = item[1]
    } else if (item[1] === type){
      value = item[0]
    }
  })
  return value
};


const meta = {
  gender,
  classes,
  stu_status,
  pay,
  empower,
  status_message,
  stuMessage,
  changeValue,
  changeAddress,
  changeStuValue
}
export default meta