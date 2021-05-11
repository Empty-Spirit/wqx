<template>
  <div class="main">
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      style="height:1080px"
      @click="getClickInfo"
      :scroll-wheel-zoom='true'
    >
    </baidu-map>
  </div>
</template>
<script>
export default {
  name: 'Main',
  data () {
    return {
      zoom: 13,//地图相关设置
      center: { lng: 0, lat: 0 },
      longitude: 0,
      latitude: 0
    }
  },
  mounted () {

  },
  methods: {
    handler ({ BMap, map }) {
      let that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function (r) {
        that.center.lng = r.point.lng
        that.center.lat = r.point.lat
      })
      console.log(this.center)
      var point = new BMap.Point(this.center.lat, this.center.lng)
      map.centerAndZoom(point, 13)
      var marker = new BMap.Marker(that.center) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
      map.addOverlay(circle)
    },
    getClickInfo (e) {
      console.log(e.point.lng)
      console.log(e.point.lat)
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    }
  },
}
</script>
<style lang='scss' scoped>
.main {
}
</style>
