// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: "dev-5f36b2",
  traceUser: true
});

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection(event.collection).where(event.options).remove();
    return { removed: event.options };
  } catch (e) {
    console.error(e)
  }
}