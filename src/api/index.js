import ajax from './axios'

// 基础路径
const BASE_URL = 'http://localhost:3000'

// 设备初始化页面
export const deviceInit = () => ajax(BASE_URL + '/deviceInit', {}, 'GET')

// 登录
export const logIn = (userName, userPassword) => ajax(BASE_URL + '/logIn', { userName, userPassword }, 'POST')

// 删除数据
export const deleteInfo = (type, deviceName) => ajax(BASE_URL + '/deleteInfo', { type, deviceName }, 'POST')

// 添加数据
export const addInfo = (index, subIndex) => ajax(BASE_URL + '/addInfo', { index, subIndex }, 'POST')

// 修改数据
export const modifyInfo = (index, subIndex) => ajax(BASE_URL + '/modifyInfo', { index, subIndex }, 'POST')
