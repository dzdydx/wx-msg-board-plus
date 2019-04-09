//index.js
const app = getApp()

const db = wx.cloud.database()

Page({
  data: {

  },

  loginAuth: function(e) {
    let that = this;
    // 查看是否授权
    if (app.globalData.userInfo.isLogged) {
      wx.redirectTo({
        url: '/pages/comment/comment',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      });
    } else {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                that.setData({
                  logged: true
                });
                console.log(res.userInfo);
                app.globalData.userInfo.isLogged = true;
                app.globalData.userInfo.avatar = res.userInfo.avatarUrl;
                app.globalData.userInfo.userName = res.userInfo.nickName;
                wx.redirectTo({
                  url: '/pages/comment/comment',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                });
              }
            })
          }
        }
      })
    }
  },

  onLoad: function(options) {
    console.log(options);
    if (options.articalId) {
      var articalId = decodeURIComponent(options.articalId);
    } else {
      var articalId = app.globalData.articalInfo.articalId;
    }
    console.log("articalID:" + articalId);
    wx.showToast({ // 显示Toast
      title: '载入评论中',
      icon: 'loading',
      duration: 5000
    });
    let that = this;
    // 获取文章信息

    db.collection('articals').where({
        _id: articalId
      })
      .get({
        success(res) {
          let rst = res.data[0]
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
          that.setData(app.globalData.articalInfo);
          wx.hideToast();
        }
      })

    // 获取评论信息
    db.collection('comments').where({
        articalId: articalId
      })
      .get({
        success(res) {
          let rst = res
          that.setData({
            comments: rst.data,
            commentsCount: rst.data.length
          })
          console.log(rst.data)
          wx.hideToast()
        }
      })
  },

  onShow: function(options) {
    
  },

  onPullDownRefresh: function() {
    wx.showToast({ // 显示Toast
      title: '载入评论中',
      icon: 'loading',
      duration: 5000
    })
    db.collection('comments').where({
        articalId: articalId
      })
      .get({
        success(res) {
          let rst = res
          that.setData({
            comments: rst.data,
            commentsCount: rst.data.length
          })
          console.log(rst.data)
          wx.hideToast()
        }
      })
  },
})