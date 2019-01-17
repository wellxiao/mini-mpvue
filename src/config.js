/**
 *  @description 项目配置
 */

/*eslint-disable */
const ENV = process.env.NODE_ENV

let baseURL
switch (ENV) {
    case 'production':
        baseURL = 'https://api.mobilemart.cn'
        break
    case 'pre':
        baseURL = 'https://test-api.mobilemart.cn'
        wx.setNavigationBarTitle({
            title: '魔急便 预发环境',
        })
        break
    default:
        baseURL = 'https://test-api.mobilemart.cn'
        // wx.setNavigationBarTitle({
        //     title: '魔急便 开发环境',
        // })
}

module.exports = {
    baseURL,
    // 1为小程序
    appId: 1,
}