//index.js
const app = getApp()

const db = wx.cloud.database()

let pageData = app.globalData.articalInfo
pageData.logged = false

Page({
  data: pageData,

  loginAuth: function(e) {
    wx.showToast({ // 显示Toast
      title: '授权登录中',
      icon: 'loading',
      duration: 10000
    })
    wx.cloud.callFunction({
      name: "login",
      data: {
        userInfo: e
      },
      success: res => {
        this.setData({
          logged: true
        })
        wx.hideToast()
        console.log(res)
        app.globalData.userInfo._openId = res.result.event.userInfo.openId
      },
      fail: err => {
        console.log(err)
      }
    })
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              app.globalData.userInfo.avatar = res.userInfo.avatarUrl
              app.globalData.userInfo.userName = res.userInfo.nickName
            }
          })
        }
      }
    })
  },

  goWriteComment: function(e) {
    wx.navigateTo({
      url: '/pages/comment/comment',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function() {
    wx.showToast({ // 显示Toast
      title: '载入评论中',
      icon: 'loading',
      duration: 5000
    })
    let that = this
    db.collection('comments').where({
        articalId: app.globalData.articalInfo.articalId
      })
      .get({
        success(res) {
          // res.data 是包含以上定义的两条记录的数组
          that.setData({
            comments: res.data,
            commentsCount: res.data.length
          })
          console.log(res.data)
          wx.hideToast()
        }
      })
  },

  onShow: function() {
    if (app.globalData.newSubmission) {
      wx.showToast({ // 显示Toast
        title: '载入评论中',
        icon: 'loading',
        duration: 5000
      })
      let that = this
      db.collection('comments').where({
        articalId: app.globalData.articalInfo.articalId
      })
      .get({
        success(res) {
          // res.data 是包含以上定义的两条记录的数组
          that.setData({
            comments: res.data,
            commentsCount: res.data.length
          })
          console.log(res.data)
          wx.hideToast()
        }
      })
    }
  },
})