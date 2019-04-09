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

    // db.collection('comments').where({
    //   userID: app.globalData.userInfo._openId
    // })
    //   .get({
    //     success(res) {
    //       console.log(res);
    //       if (res.data.length > 0) {
    //         that.setData({
    //           haveComments: true,
    //           comments: res.data
    //         });
    //       } else {
    //         that.setData({
    //           haveComments: false
    //         });
    //       }
    //       wx.hideToast();
    //     }
    //   })
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
  }
})