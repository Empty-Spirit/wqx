/**地图 */
<template>
  <div>
    <div
      id="myChart"
      style="width:100%;height:680px;margin:0 auto;transform: rotate3d(1, 0, 0, 25deg);"
    ></div>
    <div
      class="overviewdata"
      ref="viewChina"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
// import zhAxios from 'src/utils/map-ajax';
// import zhAxios from 'src/utils/zh-axios';
import '../../../static/daping/js/china.js'
// import regionColor from '../../../../static/daping/js/region.js'
// import Bg from '../../../../static/daping/img/bg-03.png'
// import Bghw from '../../../../static/daping/img/bg-hw.png'
// import Bgptzl from '../../../../static/daping/img/bg-ptzl.png'
// import Pic from '../../../../static/daping/img/pic-04.png'
// import Pic2 from '../../../../static/daping/img/pic-13.png'
// import Pic3 from '../../../../static/daping/img/pic-14.png'
import Pic4 from '../../../static/daping/img/pic-17.png'
// import bgBar from '../../../../static/daping/img/bg-bar.png'
// import $ from 'jquery';
export default {
  name: 'ShowMap',
  data () {
    return {
      center: [106.39162394361153, 36.7414047579259],
      zoom: 1,
    }
  },
  mounted () {
    this.drawMap()
  },
  methods: {
    drawMap () {
      let that = this;
      let myChart = echarts.init(document.getElementById("myChart"));
      // let geoCoordMap = {
      //   '台湾省': [121.5135, 25.0308],
      //   '黑龙江省': [127.9688, 45.368],
      //   '内蒙古自治区': [110.3467, 41.4899],
      //   "吉林省": [125.8154, 44.2584],
      //   '北京市': [116.4551, 40.2539],
      //   "辽宁省": [123.1238, 42.1216],
      //   "河北省": [114.4995, 38.1006],
      //   "天津": [117.4219, 39.4189],
      //   "山西省": [112.3352, 37.9413],
      //   "陕西省": [109.1162, 34.2004],
      //   "甘肃省": [103.5901, 36.3043],
      //   "宁夏回族自治区": [106.3586, 38.1775],
      //   "青海省": [101.4038, 36.8207],
      //   "新疆维吾尔自治区": [87.9236, 43.5883],
      //   "西藏自治区": [91.11, 29.97],
      //   "四川省": [103.9526, 30.7617],
      //   "重庆市": [108.384366, 30.439702],
      //   "山东省": [117.1582, 36.8701],
      //   "河南省": [113.4668, 34.6234],
      //   "江苏省": [118.8062, 31.9208],
      //   "安徽省": [117.29, 32.0581],
      //   "湖北省": [114.3896, 30.6628],
      //   "浙江省": [119.5313, 29.8773],
      //   "福建省": [118.4543, 26.9222],
      //   "江西省": [116.0046, 28.6633],
      //   "湖南省": [113.0823, 28.2568],
      //   "贵州省": [106.6992, 26.7682],
      //   "云南省": [102.9199, 25.4663],
      //   "广东省": [113.12244, 23.009505],
      //   "广西壮族自治区": [108.479, 23.1152],
      //   "海南省": [110.3893, 19.8516],
      //   '上海市': [121.4648, 31.2891],
      // };
      // let OverviewArr = [];
      // data.forEach((item, index) => {
      //   let name = item.provinceName;
      //   let value = geoCoordMap[name].concat(item.data.length)
      //   OverviewArr.push({ name: name, value: value })
      // })
      let option = {
        backgroundColor: "transparent",
        geo: [
          {
            show: true,
            map: "china",
            roam: true,
            label: {
              normal: {
                show: false,
                color: "#fff"
              },
              emphasis: {
                show: false
              }
            },
            // top:'6%',
            // left:'13%',
            layoutCenter: ['50%', '46%'],
            layoutSize: '105%',
            roam: 'scale',
            zoom: 1,
            // z: 80,
            animation: false,
            itemStyle: {
              normal: {
                // areaColor:'#1667ab',
                borderWidth: 1, // 区域边框宽度
                borderColor: "#49a6e1", // 区域边框颜色
                shadowOffsetX: 0,
                shadowOffsetY: 15,
              },
              emphasis: {
                areaColor: '#1667ab',
              }
            },
            regions: that.regions
          },
          // {
          //   show: true,
          //   map: "china",
          //   roam: true,
          //   scaleLimit: {
          //     min: 0.5,
          //     max: 1.5
          //   },
          //   label: {
          //     normal: {
          //       show: false,
          //       color: "#fff"
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   // top:'6%',
          //   // left:'13%',
          //   layoutCenter: ['50%', '46%'],
          //   layoutSize: '105%',
          //   zoom: 1.1,
          //   z: 80,
          //   animation: false,

          //   itemStyle: {
          //     normal: {
          //       areaColor: '#1667ab',
          //       borderColor: '#49a6e1',
          //       // borderWidth: 1.5,
          //       // shadowOffsetY: 18,
          //       opacity: 1

          //     },
          //     // emphasis: {
          //     //   areaColor: 'rgba(59,247,255,0.9)',
          //     //   label: {
          //     //     color: "#fff"
          //     //   }

          //     // }

          //   },

          //   regions: that.regions
          // },
          // {
          //   show: true,
          //   map: "china",
          //   roam: true,
          //   saspectScale: 0.85,
          //   scaleLimit: {
          //     min: 0.5,
          //     max: 1.5
          //   },
          //   // top:'9%',
          //   // left:'13%',
          //   layoutCenter: ['50%', '47.8%'],
          //   layoutSize: '105%',
          //   label: {
          //     normal: {
          //       show: false,
          //       color: "#fff"
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       shadowColor: '#1667ab',
          //       shadowOffsetX: 0,
          //       shadowOffsetY: 15,
          //       opacity: 0.5,
          //     },
          //     emphasis: {
          //       areaColor: '#49a6e1',

          //     }
          //   },
          //   animation: false,
          //   zoom: 1.11,
          //   regions: that.regions
          // },
          // {
          //   show: true,
          //   map: "china",
          //   saspectScale: 0.85,
          //   // top:'12%',
          //   // left:'13%',
          //   layoutCenter: ['50%', '49%'],
          //   layoutSize: '105%',
          //   label: {
          //     normal: {
          //       show: false,
          //       color: "#fff"
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   roam: true,
          //   animation: false,
          //   zoom: 1.11,
          //   itemStyle: {
          //     normal: {
          //       borderWidth: 2, // 区域边框宽度
          //       borderColor: "#15b1ff", // 区域边框颜色
          //       opacity: 0.3,
          //     },

          //   },
          //   regions: that.regions
          // },
          // {
          //   show: true,
          //   map: "china",
          //   roam: true,
          //   saspectScale: 0.85,
          //   // top:'15%',
          //   // left:'13%',
          //   layoutCenter: ['50%', '50%'],
          //   layoutSize: '105%',
          //   label: {
          //     normal: {
          //       show: false,
          //       color: "#fff"
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   animation: false,
          //   zoom: 1.1,
          //   itemStyle: {
          //     normal: {
          //       borderWidth: 2, // 区域边框宽度
          //       borderColor: "#15b1ff", // 区域边框颜色
          //       opacity: 0.5,
          //     },

          //   },
          //   regions: that.regions
          // },
          // {
          //   show: true,
          //   map: "china",
          //   label: {
          //     normal: {
          //       show: false,
          //       color: "#fff"
          //     },
          //     emphasis: {
          //       show: false
          //     }
          //   },
          //   z: 79,
          //   layoutCenter: ['50%', '46%'],
          //   layoutSize: '105%',
          //   roam: true,
          //   animation: false,
          //   zoom: 1.1,
          //   itemStyle: {
          //     normal: {
          //       borderWidth: 6, // 区域边框宽度
          //       borderColor: "rgba(59,247,255,0.9)", // 区域边框颜色
          //     },

          //   },
          //   regions: that.regions
          // }
        ],
        grid: {
          containLabel: true,
        },
        tooltip: {
          show: true,
          triggerOn: "none",
          backgroundColor: "transparent",
          borderWidth: 0,
          padding: 0,
          extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0)',
          position: (pos, params, dom, rect, size) => {
            let x = pos[0]
            let y = pos[1]
            dom.style.transform = 'translateZ(0)'
            return [rect.x + 15, rect.y - 5];
          },
          formatter: (params) => {
            let result = `<div style="width: 120px;height: 32px;background: url(${Pic4}) center no-repeat;background-size: 100%;text-align:center;line-height:32px;color:#ffffff;font-size:14px">场站数量：${params.value / 100}</div>`
            return result
          }
        },
        series: [
          // 常规地图
          {
            type: 'map',
            mapType: 'china',
            // aspectScale: 0.85,
            layoutCenter: ["50%", "46%"], //地图位置
            layoutSize: '105%',
            roam: true,
            zoom: 1, //当前视角的缩放比例
            // roam: true, //是否开启平游或缩放
            scaleLimit: { //滚轮缩放的极限控制
              min: 1,
              max: 2
            },
            itemStyle: {
              normal: {
                areaColor: '#1667ab',
                borderColor: '#1cccff',
                borderWidth: 1.5,
                // opacity: 0.5,


              },
              emphasis: {
                areaColor: '#02102b',
                label: {
                  color: "#fff"
                }

              }
            },


          },
        ]
      };
      console.log(option)
      // that.option = JSON.parse(JSON.stringify(option))
      myChart.setOption(option);
      myChart.on('georoam', function (params) {
        var option = myChart.getOption();//获得option对象
        // console.log(option)
        console.log(option)
        // if (params.zoom != null && params.zoom != undefined) {
        //   option.geo.map((item, index) => {
        //     // if (index > 0) {
        //     item.zoom = item.zoom + 0.1,
        //       item.center = option.geo[0].center
        //     // }
        //   })
        // }
        // console.log(option)
        // myChart.setOption(option)
        if (params.zoom != null && params.zoom != undefined) { //捕捉到缩放时
          // console.log(params)
          // console.log(option)
          // var _option = myChart.getOption()
          var _zoom = option.series[0].zoom
          console.log(that.zoom, _zoom)
          if (that.zoom > _zoom) {
            option.geo[0].center = that.center
            option.series[0].center = that.center
            //   if (!that.center) {
            //     that.center = option.geo[0].center
            //   } else {

          }
          that.zoom = _zoom
          //   option.geo[0].zoom = option.series[0].zoom;//下层geo的缩放等级跟着上层的geo一起改变
          //   option.geo[0].center = that.center;//下层的geo的中心位置随着上层geo一起改变
          // } else {
          //   option.geo[0].zoom = option.series[0].zoom;//下层geo的缩放等级跟着上层的geo一起改变
          //   option.geo[0].center = that.center;//下层的geo的中心位置随着上层geo一起改变
          // }
          // that.zoom = _zoom



          // option.geo[1].zoom = option.geo[0].zoom;//下层geo的缩放等级跟着上层的geo一起改变
          // option.geo[1].center = option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变

          // option.geo[2].zoom = option.geo[0].zoom;//下层geo的缩放等级跟着上层的geo一起改变
          // option.geo[2].center = option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变

          // option.geo[3].zoom = option.geo[0].zoom + 0.01;//下层geo的缩放等级跟着上层的geo一起改变
          // option.geo[3].center = option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变

          // option.geo[4].zoom = option.geo[0].zoom + 0.01;//下层geo的缩放等级跟着上层的geo一起改变
          // option.geo[4].center = option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变

          // option.geo[1].zoom = option.geo[0].zoom + 0.1;//下层geo的缩放等级跟着上层的geo一起改变
          // option.geo[1].center = option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变
        } else {//捕捉到拖曳时
          // option.geo[1].center = option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变
          // option.geo[0].zoom = option.series[0].zoom;//下层geo的缩放等级跟着上层的geo一起改变
          option.geo[0].center = this.center;//下层的geo的中心位置随着上层geo一起改变
        }

        // myChart.dispatchAction({
        //   type: 'restore'
        // })
        myChart.setOption(option);//设置option
      });

    }
  }
}
</script>

<style>
</style>