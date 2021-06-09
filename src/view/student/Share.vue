/**分享*/
<template>
  <div></div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'Share',
  mounted () {
    wx.config({
      debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx1bfe33ca1ad3a57c',         // 必填，公众号的唯一标识，填自己的！
      timestamp: '1621435978', // 必填，生成签名的时间戳，刚才接口拿到的数据
      nonceStr: 'cc760b14fb82d0e7d753',   // 必填，生成签名的随机串
      signature: '9d8c82d7f9bd23cf648b00d06657fd1140214e3c', // 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline',
        'updateAppMessageShareData'
      ]
    })

    wx.checkJsApi({
      jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        console.log(res)
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    });

    wx.ready(function () {
      console.log('add')
      //分享给朋友
      wx.updateAppMessageShareData({
        title: '文曲星幼儿园',
        desc: '请进行学员信息登记',
        link: 'http://stzbxinghe.com/wqx/#/StuAdd',
        imgUrl: 'http://stzbxinghe.com/wqx/static/img/wqx.jpg',
        success: function () {
          console.log("分享成功");
        },
        cancel: function () {
          console.log("取消分享");
        }
      });
    })
  }
}
</script>

<style>
</style> 