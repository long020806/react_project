import { reqLogin } from "../api";
import StorageUtils from "../utils/StorageUtils";
import { RECTIVE_USER, RESET_USER, SET_TITLE, SHOW_ERROR_MSG } from "./action-type";

/**
 * 包含n个action creator
 * 同步action {type:"",data: }
 * 异步action dispatch => dispatch
 */
export const setHeadTitle = (title) => ({type:SET_TITLE,data:title});

export const receiveUser = (user)=>({type:RECTIVE_USER,user})

export const showErrorMsg = (msg)=>({type:SHOW_ERROR_MSG,msg})

export const logout = ()=>{
    //删除localstorage的user
    StorageUtils.removeUser();
    //返回action对象
    return {
        type:RESET_USER
    }
}

export const login = (username,password)=>{
    return async dispatch =>{
        // 1.执行异步ajax
        const res = await reqLogin(username,password);
        if(res.status===0){
            //2.成功分发成功action
            const user = res.data;
            StorageUtils.saveUser(user);
            dispatch(receiveUser(user));
        }else{
            //3.失败分发失败action
            const msg = res.msg;
            dispatch(showErrorMsg(msg));
        }

    }
}
