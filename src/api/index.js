/**
 * 根据接口文档定义接口请求，包含应用中接口请求函数的模块
 */
import ajax from "./ajax"
//登录
export const reqLogin  = (username,password) =>ajax("/api1/login",{username,password},"POST");
//添加用户
export const reqAddUser = (user)=>ajax("/api1/manage/user/add",user,"POST")
