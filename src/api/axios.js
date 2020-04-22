import axios from 'axios'

export default function ajax (url = '', params = {}, type) {
  // 定义promis对象
  let promise
  return new Promise((resolve, reject) => {
    // 判断请求的方式
    if (type === 'GET') {
      // 拼接请求字符串
      let paramStr = ''
      Object.keys(params).forEach((key) => {
        paramStr += key + '=' + params[key] + '&'
      })

      // 过滤最后的&
      if (paramStr !== '') {
        paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'))
      }

      // 完整的路径
      url += '?' + paramStr

      // 发送get请求
      promise = axios.get(url)
    } else if (type === 'POST') {
      promise = axios.post(url, params)
    }

    // 返回请求结果
    promise.then((respose) => {
      resolve(respose.data)
    }).catch(error => {
      reject(error)
    })
  })
}
