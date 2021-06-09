import wx from 'weixin-js-sdk'
import api from './../../request/api'
let shareData = {}

let obj ={
  url:encodeURIComponent(location.href.split('#')[0])
}

api.student.share(obj).then(res => {
  shareData = res
  getData(shareData)
})
function getData(shareData){
  wx.config({
    debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: shareData.appId,         // 必填，公众号的唯一标识，填自己的！
    timestamp: shareData.timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
    nonceStr: shareData.noncestr,   // 必填，生成签名的随机串
    signature: shareData.signature, // 必填，签名，见附录1
    jsApiList: [
      'onMenuShareTimeline',
      'updateAppMessageShareData',
      'onMenuShareAppMessage'
    ],
    success:function(){
      console.log('成功')
    },
    fail:function(res){
      console.log('失败')
    }
  })
  
  wx.checkJsApi({
    jsApiList: ['updateAppMessageShareData','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
      console.log(res)
    // 以键值对的形式返回，可用的api值true，不可用为false
    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
  });
  
  
  wx.ready(function () {
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: '文曲星幼儿园',
      desc: '请进行学员信息登记', 
      link: 'http://stzbxinghe.com/wqx/#/StuAdd',
      imgUrl: 'http://stzbxinghe.com/wqx/image/wqx.jpg',
      success: function (res) {
        console.log(res);
      },
      cancel: function () {
        console.log("取消分享");
      },
      fail:function(res){
        console.log(res)
      }
    });
  })
}