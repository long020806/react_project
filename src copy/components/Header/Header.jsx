import React, { Component } from 'react'
import "./index.less"
import { formatDate } from '../../utils/dateUtils'
import MemoryUtils from '../../utils/MemoryUtils'
import { reqWeather } from '../../api'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import LinkButton from '../LinkButton/LinkButton'
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import StorageUtils from "../../utils/StorageUtils"
const { confirm } = Modal;
/**
 * 头部组件
 */
class Header extends Component {
    state={
        currentTime:formatDate(Date.now()),
        dayPictureUrl:"",
        weather:""
    }
    getTime=()=>{
        this.intervalId = setInterval(()=>{
            const currentTime = formatDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    getWeather = async ()=>{
        const {dayPictureUrl,weather} = await reqWeather("北京");
        this.setState({dayPictureUrl,weather});
    }
    getTitle = ()=>{
        const {pathname} = this.props.location;
        let title ;
        menuList.forEach(item=>{
            if(item.key===pathname){
                title = item.title;
            }else if(item.children){
                const cItem = item.children.find(citem=>pathname.indexOf(citem.key)===0);
                if(cItem) title = cItem.title;
            }
        })
        return title;
    }
    destroyAll = ()=>{
        Modal.destroyAll();
    }
    logOut = ()=>{
        confirm({
            icon:<ExclamationCircleOutlined/>,
            content:"确定退出吗",
            onOk:()=>{
                StorageUtils.removeUser();
                MemoryUtils.user = {};
                this.props.history.replace("/login")
            },
            onCancel:()=>{
                console.log("cancel")
            }
        })
    }



    /**
     * 第一次在render（）之后执行一次
     * 一般执行异步操作，发ajax请求/启动定时器
     */
    componentDidMount(){
        //获取当前事件
        this.getTime();
        //获取当前天气
        this.getWeather();
    }
    /**
     * 当前组件卸载之前调用
     */
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() {
        const {currentTime,dayPictureUrl,weather} = this.state;
        const {username} = MemoryUtils.user;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span> 
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="sunny" />
                        <span>{weather}</span>
                    </div>
                   
                </div>
            </div>
        )
    }
}
export default withRouter(Header)