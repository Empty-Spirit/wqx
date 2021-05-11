export default {
  // 学院列表筛选
  stuMessage:[
    {
      type: 'select',
      label: '年级',
      value: '0',
      data: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '大班'
        }, {
          value: '2',
          label: '中班'
        }, {
          value: '3',
          label: '小班'
        }
      ]
    }, {
      type: 'select',
      label: '学费',
      value: '0',
      data: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '已缴'
        }, {
          value: '2',
          label: '未缴'
        }
      ]
    }, {
      type: 'select',
      label: '书费',
      value: '0',
      data: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '已缴'
        }, {
          value: '2',
          label: '未缴'
        }
      ]
    }, {
      type: 'select',
      label: '状态',
      value: '1',
      data: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '在校'
        }, {
          value: '2',
          label: '毕业'
        }
      ]
    },{
      type:'input',
      label:'姓名',
      valie:''
    },{
      type:'input',
      label:'年龄',
      valie:''
    }
  ]
}