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
  changeValue,
  changeAddress
}
export default meta