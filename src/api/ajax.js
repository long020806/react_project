import axios from "axios";
import { message } from "antd";
// const BASE = "http://localhost:5000"
export default function ajax(url,data={},type="GET"){

    return new Promise((resolve,reject)=>{
        let promise;
        if(type==="GET"){
            promise =  axios.get(url,{//配置对象
                params:data
            });
        }else{
            promise =  axios.post(url,data)
        }    
        //成功调用resolve，失败提示失败信息而不是reject（不交给后方处理，请求处处理错误）
        promise.then(res=>resolve(res.data)).catch(err=>message.error("请求出错了"+err.message))
    })
    
}