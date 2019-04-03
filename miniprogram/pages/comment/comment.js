// pages/comment/comment.js

const app = getApp()
const db = wx.cloud.database()
const articals = db.collection('articals')
const comments = db.collection('comments')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: app.globalData.articalInfo.accountName,
    count: 0,
    loading: false
  },

  countInput: function(e) {
    let c = e.detail.value
    this.setData({
      count: c.length
    })
  },

  bindFormSubmit: function(e) {
    this.setData({
      loading: true
    })

    let that = this
    const _ = db.command
    let newComment = {
      avatar: app.globalData.userInfo.avatar,
      content: e.detail.value.textarea,
      likes: 0,
      time: new Date().toLocaleString(),
      userID: app.globalData.userInfo._openId,
      userName: app.globalData.userInfo.userName,
      articalId: app.globalData.articalInfo.articalId
    }

    comments.add({
        // data 字段表示需新增的 JSON 数据
        data: newComment
      })
      .then(res => {
        console.log(res)
        that.setData({
          loading: false
        })
        app.globalData.newSubmission = true
        wx.navigateBack({
          delta: 1
        })
      })
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

  }
})