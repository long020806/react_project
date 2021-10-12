/**
 * 根据action和state生成新的state
 */
import { combineReducers } from "redux"
import StorageUtils from "../utils/StorageUtils"
import { RECTIVE_USER, RESET_USER, SET_TITLE, SHOW_ERROR_MSG } from "./action-type"
/**
 * 管理头部title
 */
const initTitle = ""
const headTitle = (state=initTitle,action)=>{
    const {type,data} = action
    switch (type) {
        case SET_TITLE:
            return data;
        default:
            return state;
    }
}
/**
 * 管理用户
 */
const initUser = StorageUtils.getUser();
const user = (state = initUser,action)=>{
    const {type,user,msg} = action
    switch (type) {
        case RECTIVE_USER:
            return user;
        case SHOW_ERROR_MSG:
            return {...state,errorMsg:msg};
        case RESET_USER:
            return {}
        default:
            return state;
    }
}
/**
 * 向外暴露的时合并的reducer
 * 总的state结构
 * {
 *  headTitle:"首页",
 *  user:{}
 * }
 */
export default combineReducers({
    headTitle,
    user
})  