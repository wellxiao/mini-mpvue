/**
 * @author wellxiao
 * @date 2019-01-17 20:09:01
 * @description 提供wx基础服务
 */

/**
 * @description 校验用户当前session_key是否有效
 */
export const wxCheckSession = () =>
    new Promise((resolve, reject) => {
        wx.checkSession({
            success() {
                resolve()
            },
            fail() {
                reject()
            },
        })
    })

/**
 * @function
 * @param {*} options
 * @description 获取微信code，换取openId
 */
export const wxLogin = (options = {}) => {
    const { timeout = 16000 } = options
    return new Promise((resolve, reject) => {
        wx.login({
            timeout,
            success(res) {
                resolve(res)
            },
            fail(res) {
                reject(res)
            },
        })
    })
}

/**
 * @function
 * @description 扫码
 */
export const wxScanCode = (options = {}) => {
    const { onlyFromCamera = true, scanType = ['qrCode'] } = options
    return new Promise((resolve, reject) => {
        wx.scanCode({
            onlyFromCamera,
            scanType,
            success: res => {
                resolve(res)
            },
            fail(res) {
                reject(res)
            },
        })
    })
}

/**
 * @function
 * @description loading
 */
export const wxShowLoading = (options = {}) => {
    const { title = '', mask = true } = options
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title,
            mask,
            success: res => {
                resolve(res)
            },
            fail(res) {
                reject(res)
            },
        })
    })
}

/**
 * @function
 * @description 拨打电话
 */
export const wxMakePhoneCall = (options = {}) => {
    const { phoneNumber } = options
    return new Promise((resolve, reject) => {
        wx.makePhoneCall({
            phoneNumber,
            success: res => {
                resolve(res)
            },
            fail(res) {
                reject(res)
            },
        })
    })
}
/* eslint-disable */
/**
 * 微信支付接口
 * @param {微信支付所需要的字段}}} param
 * @param {package字段单独使用被被eslint报错所以用Package} Package
 */
export const wxPay = ({ timeStamp, nonceStr, signType, paySign }, Package) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            timeStamp,
            nonceStr,
            package: Package,
            signType,
            paySign,
            success() {
                resolve()
            },
            fail(faliRes) {
                reject(faliRes)
            },
        })
    })
}
/* eslint-enable */

/**
 * @description 获取定位信息
 */
export const wxGetLocation = () =>
    new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                resolve(res)
            },
            fail(e) {
                reject(e)
            },
        })
    })

/**
 * @description 获取用户已授权过得信息
 */

export const wxGetSetting = () =>
    new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                resolve(res)
            },
            fail(e) {
                reject(e)
            },
        })
    })

/**
 * @param scope {*} 授权操作名字
 * @description 授权
 */
export const wxAuthorize = async scope => {
    const { authSetting } = await wxGetSetting()
    return new Promise((resolve, reject) => {
        const isAuth = authSetting[scope]
        if (isAuth) {
            return resolve({ erMsg: '无需重复授权' })
        }
        // 这边用全等是因为需区分undefined值
        if (isAuth === false) {
            return reject({ erMsg: '用户拒绝授权' })
        }
        // 去授权
        wx.authorize({
            scope,
            success(res) {
                resolve(res)
            },
            fail(e) {
                reject(e)
            },
        })
    })
}

/**
 *  下载文件
 * @param url {*} 文件地址
 */
export const wxDownloadFile = url => {
    const token = wx.getStorageSync('token')

    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url,
            header: {
                token,
            },
            success(res) {
                resolve(res)
            },
            fail(e) {
                reject(e)
            },
        })
    })
}

/**
 *  保存图片到系统相册
 * @param url {*} 文件地址
 */
export const wxSaveImageToPhotosAlbum = filePath =>
    new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
            filePath,
            success(res) {
                resolve(res)
            },
            fail(e) {
                reject(e)
            },
        })
    })

/**
 * @param undefined
 * @description 打开微信权限设置面板
 */
export const wxOpenSetting = () =>
    new Promise((resolve, reject) => {
        wx.openSetting({
            success(res) {
                resolve(res)
            },
            fail() {
                reject({ erMsg: '打开权限面板失败' })
            },
        })
    })

/**
 * @param undefined
 * @description 获取微信用户快递地址
 */

export const wxChooseAddress = () =>
    new Promise((resolve, reject) => {
        wx.chooseAddress({
            success(res) {
                resolve(res)
            },
            fail() {
                reject({ erMsg: '获取地址信息失败' })
            },
        })
    })

/**
 * 强制授权
 * @param scope {*} 授权操作名字
 * @param {String} title
 */

export const forceWxAuthorize = (scope, title) =>
    new Promise(async (resolve, reject) => {
        try {
            await wxAuthorize(scope)
            resolve()
        } catch (e) {
            wx.showModal({
                title: '提示',
                content: title,
                success(res) {
                    if (res.confirm) {
                        wxOpenSetting().then(
                            () => {
                                resolve()
                            },
                            () => {
                                reject({ errMsg: '未授权' })
                            },
                        )
                    } else if (res.cancel) {
                        reject({ errMsg: '未授权' })
                    }
                },
            })
        }
    })
