// 学院列表筛选
export const stuMessage = [
  {
    type: 'select',
    label: '年级',
    name: 'class',
    value: 100,
    data: [
      {
        value: 100,
        label: '全部'
      }, {
        value: 1,
        label: '大班'
      }, {
        value: 2,
        label: '中班'
      }, {
        value: 3,
        label: '小班'
      }
    ]
  }, {
    type: 'select',
    label: '学费',
    name: 'tuition',
    value: 100,
    data: [
      {
        value: 100,
        label: '全部'
      }, {
        value: 1,
        label: '已缴'
      }, {
        value: 0,
        label: '未缴'
      }
    ]
  }, {
    type: 'select',
    name: 'book',
    label: '书费',
    value: 100,
    data: [
      {
        value: 100,
        label: '全部'
      }, {
        value: 1,
        label: '已缴'
      }, {
        value: 0,
        label: '未缴'
      }
    ]
  }, {
    type: 'select',
    label: '状态',
    name: 'status',
    value: 100,
    data: [
      {
        value: 100,
        label: '全部'
      }, {
        value: 1,
        label: '在校'
      }, {
        value: 0,
        label: '毕业'
      }
    ]
  }, {
    type: 'input',
    label: '姓名',
    name: 'stu_name',
    value: ''
  }, {
    type: 'input',
    name: 'age',
    label: '年龄',
    value: ''
  }
]