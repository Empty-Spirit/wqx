// type判断是首页部分数据展示还是list页全部数据展示
// data 接收所有数据并返回用来展示的数据
// num首页部分数据展示数量。不传默认两条
const showList = (type, data, num) => {
  let showList = []
  let _num = num || 2
  if (type) {
    showList = data
  } else {
    showList = data.slice(0, _num)
  }
  return showList
}

const areaList = (data,type) =>{
  let newData = []
    let province=Object.entries(data.province_list)
    let city=Object.entries(data.city_list)
    let area=Object.entries(data.county_list)
    for(let i=0;i<province.length;i++){
      let obj = {
        code : province[i][0],
        name: province[i][1],
        children:[]
      }
      newData.push(obj)
    }
    newData.map(item => {
      city.map(citys => {
        let obj = {
          code:citys[0],
          name:citys[1],
          children:[]
        }
        area.map(areas => {
          let objArea ={
            code:areas[0],
            name:areas[1]
          }
          if(obj.code.slice(0,4) === objArea.code.slice(0,4)){
            obj.children.push(objArea)
          }
        })
        if(item.code.slice(0,3) === obj.code.slice(0,3)){
          item.children.push(obj)
        }
      })
    })
return newData
}

const changeArea = (data,id,num) => {
  const newData = []
    Object.entries(data).map(item => {
      let obj = {
        code:item[0],
        name:item[1]
      }
      if(id==='' || id.slice(0,num) === obj.code.slice(0,num)){
        newData.push(obj)
      }
    })
  
  return newData
}
export default {
  showList,
  areaList,
  changeArea
}
