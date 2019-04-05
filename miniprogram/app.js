//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      data: {},
    })
    .then(res => {
      this.globalData.userInfo._openId = res.result.event.userInfo.openId
      console.log(this.globalData.userInfo._openId)
    })
    .catch(console.error)
  },

  globalData: {
    userInfo: {

    },
    articalInfo: {

    }
  }
})