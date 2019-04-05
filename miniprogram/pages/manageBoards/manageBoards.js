// pages/manageBoards/manageBoards.js

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
    console.log(options);
    var articalId = decodeURIComponent(options.articalId);
    wx.showToast({ // 显示Toast
      title: '载入评论中',
      icon: 'loading',
      duration: 5000
    });
    let that = this;
    // 获取文章信息
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getData',
      // 传给云函数的参数
      data: {
        collection: "articals",
        option: {
          _id: articalId
        }
      },
    })
      .then(res => {
        console.log(res);
        let rst = res.result.data[0]
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
      })
      .catch(console.error)

    // 获取评论信息
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getData',
      // 传给云函数的参数
      data: {
        collection: "comments",
        option: {
          articalId: articalId
        }
      },
    })
      .then(res => {
        let rst = res.result
        that.setData({
          comments: rst.data,
          commentsCount: rst.data.length
        })
        console.log(rst.data)
        wx.hideToast()
      })
      .catch(console.error)
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
      title: '载入评论中',
      icon: 'loading',
      duration: 5000
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getData',
      // 传给云函数的参数
      data: {
        collection: "comments",
        option: {
          articalId: articalId
        }
      },
    })
      .then(res => {
        let rst = res.result
        that.setData({
          comments: rst.data,
          commentsCount: rst.data.length
        })
        console.log(rst.data)
        wx.hideToast()
      })
      .catch(console.error)
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

  deleteBoard: function (e) {
    const that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'deleteData',
      // 传给云函数的参数
      data: {
        collection: "articals",
        options: {
          _id: e.target.dataset.id
        }
      },
    })
      .then(res => {
        console.log(res);
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        });
        wx.navigateBack({
          delta: 1
        })
      })
      .catch(console.error)
  },

  deleteMessage: function (e) {
    const that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'deleteData',
      // 传给云函数的参数
      data: {
        collection: "comments",
        options: {
          _id: e.target.dataset.msgid
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
            option: {
              articalId: app.globalData.articalInfo.articalId
            }
          },
        })
          .then(res => {
            let rst = res.result
            that.setData({
              comments: rst.data,
              commentsCount: rst.data.length
            })
            console.log(rst.data)
            wx.hideToast()
          })
          .catch(console.error)
      })
      .catch(console.error)
  },

  goFrontPage: function (e) {
    wx.redirectTo({
      url: '/pages/index/index?articalId=' + e.target.dataset.id,
    })
  }
})