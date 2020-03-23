import ajax from './axios'

// 基础路径
const BASE_URL = 'http://localhost:3000'

// 登录
export const logIn = (userName, userPassword) => ajax(BASE_URL + '/logIn', { userName, userPassword }, 'POST')
