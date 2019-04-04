// pages/create/create.js

const app = getApp();

const db = wx.cloud.database();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    date: "2019-01-01",
    time: "00:00"
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

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },

  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    });
  },

  bindFormSubmit: function(e) {
    this.setData({
      loading: true
    });
    let that = this;

    // 留言区信息写入数据库
    let form = e.detail.value;
    db.collection("articals").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        account: form.account,
        accountName: form.accountName,
        articalName: form.articalName,
        author: form.author,
        time: form.date + " " + form.time,
        anonymous: form.anonymous
      }
    })
    .then(res => {
      // 返回留言区的ID
      console.log(res)
      let articalId = res._id;

      that.setData({
        loading: false
      });

      // 跳转到指引页面
      wx.navigateTo({
        url: '/pages/generate/generate?articalId=' + articalId,
      });

    }, err => {
      console.log(err);
      wx.showModal({
        content: '生成留言板失败，请返回主页重试',
        confirmText: "行吧",
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/home/home',
            });
          }
        }
      });
    });
  }
})