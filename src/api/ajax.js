import axios from "axios";
// const BASE = "http://localhost:5000"
export default function ajax(url,data={},type="GET"){
    if(type==="GET"){
        return axios.get(url,{//配置对象
            params:data
        });
    }else{
        return axios.post(url,data)
    }
}