import { baseURL } from '@/config'
import { wxShowLoading } from '@/services/wxService'
/**
 * @function Http
 */
export const request = ({
    url,
    data,
    method = 'GET',
    header = {},
    responseType,
    dataType = 'json',
    complete,
    loading = false,
}) => {
    const token = wx.getStorageSync('token')
    if (loading) wxShowLoading()
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseURL}${url}`,
            data,
            header:{...header,token}, // 合并传递进来的配置
            method,
            responseType,
            dataType,
            success(res) {
                const { statusCode, errMsg } = res
                switch (statusCode) {
                    case 200: {
                        /* eslint-disable camelcase */
                        const { error_code, err_msg } = res.data
                        // error_code为0，走resolve
                        const errorCode = Number(error_code)
                        if (errorCode === 0) {
                            resolve({
                                result: res.data.data,
                                message: err_msg,
                                statusCode: errorCode,
                            })
                            return
                        }
                        reject({ result: res.data.data, message: err_msg, statusCode: errorCode })
                        break
                    }

                    case 403:
                        reject({ message: '403', statusCode })
                        break

                    case 404:
                        reject({ message: '404', statusCode })
                        break

                    default:
                        reject({ message: errMsg, statusCode })
                }
            },
            fail() {
                reject({ message: '请求失败', statusCode: 600 })
            },
            complete() {
                if (loading) wx.hideLoading()
                /* eslint-disable no-unused-expressions */
                typeof complete === 'function' && complete()
            },
        })
    })
}
