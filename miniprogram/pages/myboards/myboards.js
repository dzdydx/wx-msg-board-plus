// pages/myboards/myboards.js

const app = getApp();

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var openId = app.globalData.userInfo._openId;
    console.log("openID: " + openId);
    wx.showToast({ // 显示Toast
      title: '载入中',
      icon: 'loading',
      duration: 5000
    });
    let that = this;
    // 获取文章信息
    db.collection("articals").where({
      _openid: openId
    })
      .get({
        success(res) {
          let rst = res;
          console.log(res);
          if (rst.data.length !== 0) {
            that.setData({
              haveBoards: true,
              boards: rst.data
            });
          } else {
            that.setData({
              haveBoards: false
            });
          }
          wx.hideToast();
        }
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({ // 显示Toast
      title: '载入中',
      icon: 'loading',
      duration: 5000
    });
    let that = this;
    // 获取文章信息
    db.collection('articals').where({
      _openId: openId,
    })
      .get({
        success(res) {
          let rst = res;
          console.log(res);
          if (rst.data !== []) {
            that.setData({
              haveBoards: true,
              boards: rst.data
            });
          } else {
            that.setData({
              haveBoards: false
            });
          }
          wx.hideToast();
        }
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  goCreate: function() {
    wx.redirectTo({
      url: "/pages/create/create",
    })
  },

  goToBoard: function (e) {
    app.globalData.articalInfo.articalId = e.target.dataset.id
    wx.navigateTo({
      url: "/pages/manageBoards/manageBoards?articalId=" + e.target.dataset.id,
    });
  },
})