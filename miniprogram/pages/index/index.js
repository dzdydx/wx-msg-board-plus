//index.js
const app = getApp()

const db = wx.cloud.database()

Page({
  data: {
    logged: false
  },

  loginAuth: function(e) {
    let that = this;
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
              that.setData({
                logged: true
              })
              wx.hideToast()
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

  onLoad: function(options) {
    console.log(options);
    var articalId = decodeURIComponent(options.articalId);
    wx.showToast({ // 显示Toast
      title: '载入评论中',
      icon: 'loading',
      duration: 5000
    });
    let that = this;
    // 获取文章信息
    db.collection('articals').where({
      _id: articalId
    }).get().then(res => {
      let rst = res.data[0]
      console.log(res.data)
      app.globalData.articalInfo = {
        articalId: articalId,
        account: rst.account,
        accountName: rst.accountName,
      //  articalLikes: rst.articalLikes, 下个版本添加此功能
        articalName: rst.articalName,
        author: rst.author,
        time: rst.time,
        anonymous: rst.anonymous
      };

      console.log({a: "articalInfo:", b: app.globalData});
      that.setData(app.globalData.articalInfo);
      wx.hideToast();
    })

    // 获取评论信息
    db.collection('comments').where({
        articalId: articalId
      })
      .get().then(res => {
        that.setData({
          comments: res.data,
          commentsCount: res.data.length
        })
        console.log(res.data)
        wx.hideToast()
      });
  },

  onShow: function() {
    let that = this;

    if (app.globalData.newSubmission) {
      wx.showToast({ // 显示Toast
        title: '载入评论中',
        icon: 'loading',
        duration: 5000
      })
      db.collection('comments').where({
          articalId: app.globalData.articalInfo.articalId
        })
        .get().then(res => {
          // res.data 是包含以上定义的两条记录的数组
          that.setData({
            comments: res.data,
            commentsCount: res.data.length
          })
          console.log(res.data)
          wx.hideToast()
        });
    }
  },
})