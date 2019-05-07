// pages/mycomments/mycomments.js

const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    haveComments: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showToast({ // 显示Toast
      title: '载入中',
      icon: 'loading',
      duration: 5000
    });
    let that = this;
    // 获取评论信息

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getData',
      // 传给云函数的参数
      data: {
        collection: "comments",
        options: {
          userID: app.globalData.userInfo._openId
        },
      },
    })
      .then(res => {
        console.log(res);
        if (res.result.data.length > 0) {
          that.setData({
            haveComments: true,
            comments: res.result.data
          });
        } else {
          that.setData({
            haveComments: false
          });
        }
        wx.hideToast();
      })
      .catch(console.error)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  goCreate: function() {
    wx.redirectTo({
      url: "/pages/create/create",
    })
  },

  deleteComment: function (e) {
    const that = this;

    wx.showModal({
      title: '删除留言？',
      content: '留言删除后将无法恢复。',
      confirmText: '删除',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            // 云函数名称
            name: 'deleteData',
            // 传给云函数的参数
            data: {
              collection: "comments",
              options: {
                _id: e.target.dataset.cmtid
              }
            },
          })
            .then(res => {
              console.log(res);
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              wx.cloud.callFunction({
                // 云函数名称
                name: 'getData',
                // 传给云函数的参数
                data: {
                  collection: "comments",
                  options: {
                    userID: app.globalData.userInfo._openId
                  },
                },
              })
                .then(res => {
                  console.log(res);
                  if (res.result.data.length > 0) {
                    that.setData({
                      haveComments: true,
                      comments: res.result.data
                    });
                  } else {
                    that.setData({
                      haveComments: false
                    });
                  }
                  wx.hideToast();
                })
                .catch(console.error)
            })
            .catch(console.error)
        } else if (res.cancel) {
          console.log('Deletion canceled.')
        }
      }
    })
  }
})