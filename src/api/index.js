/**
 * 根据接口文档定义接口请求，包含应用中接口请求函数的模块
 */
import ajax from "./ajax"

const prefix = "/api1";
//登录
export const reqLogin  = (username,password) =>ajax("/api1/login",{username,password},"POST");
//添加用户
export const reqAddUser = (user)=>ajax("/api1/manage/user/add",user,"POST")
//查询天气
export const reqWeather = (city)=>{return new Promise((resolve,reject)=>{
    resolve({dayPictureUrl:"http://api.map.baidu.com/images/weather/day/qing.png",weather:"晴"})
})}
//获取一级/二级列表
export const reqCategories = (parentId)=>ajax(prefix+"/manage/category/list",{parentId});
//添加分类
export const reqAddCategory = (parentId,categoryName)=>ajax(prefix+"/manage/category/add",{parentId,categoryName},"POST");
//更新分类
export const reqUpdateCategory = ({categoryId,categoryName})=>ajax(prefix+"/manage/category/update",{categoryId,categoryName},"POST");