/**
 * 根据接口文档定义接口请求，包含应用中接口请求函数的模块
 */
import ajax from "./ajax"

const prefix = "/api1";
//登录
export const reqLogin  = (username,password) =>ajax("/api1/login",{username,password},"POST");
//添加用户
export const reqAddOrUpdateUser = (user)=>ajax("/api1/manage/user/"+(user._id?"update":"add"),user,"POST")
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
//获取一个分类
export const reqCategory = (categoryId) => ajax(prefix+"/manage/category/info",{categoryId})
//更新商品状态
export const reqUpdateStatus = (productId,status)=>ajax(prefix+"manage/product/updateStatus",{productId,status},"POST")
//获取商品分页列表
export const reqProducts = (pageNum,pageSize)=>ajax(prefix+"/manage/product/list",{pageNum,pageSize});

// //根据商品名字获取搜索商品分页列表
// export const reqProductsByName = (pageNum,pageSize,productName)=>ajax(prefix+"/manage/product/search",{pageNum,pageSize,productName})
// //根据商品描述获取搜索商品分页列表
// export const reqProductsByDesc = (pageNum,pageSize,productDesc)=>ajax(prefix+"/manage/product/search",{pageNum,pageSize,productDesc})
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType})=>ajax(prefix+"/manage/product/search",{
    pageNum,
    pageSize,
    [searchType]:searchName
})
//删除指定名称的图片
export const reqDeleteImg = (name)=>ajax(prefix+"/manage/img/delete",{name},"POST")
//添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(prefix+`/manage/product/${product._id?"update":"add"}`,product,"POST")
//修改商品
// export const reqUpdateProduct = (product) => ajax(prefix+"/manage/product/update","POST")
//得到角色列表
export const reqRoles = ()=>ajax(prefix+"/manage/role/list");
//添加角色列表
export const reqAddRole = (roleName)=>ajax(prefix+"/manage/role/add",{roleName},"POST");
//更新角色列表
export const reqUpdateRole = (role)=>ajax(prefix+"/manage/role/update",role,"POST");
//获取用户列表
export const reqUsers = ()=> ajax(prefix+"/manage/user/list");
//删除用户
export const reqDeleteUser = (userId)=> ajax(prefix+"/manage/user/delete",{userId},"POST")