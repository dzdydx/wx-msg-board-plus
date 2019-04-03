//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      userInfo: {

      },
      articalInfo: {
        "_userId": "",
        "articalName": "1 | 没能成为野兽，也没能成为好人",
        "articalId": "5ca47f99a87a1a18b6cd2a8b",
        "account": "talklightly",
        "accountName": "一笑缘",
        "publishTime": "2019-3-31 23:56",
        "author": "林琅",
        "articalLikes": 0,
      }
    }
  }
})
