import React, { Component } from 'react'
import "./index.less"
import { formatDate } from '../../utils/dateUtils'
import MemoryUtils from '../../utils/MemoryUtils'
import { reqWeather } from '../../api'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
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
        setInterval(()=>{
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
                const cItem = item.children.find(citem=>citem.key===pathname);
                if(cItem) title = cItem.title;
            }
        })
        return title;
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
    render() {
        const {currentTime,dayPictureUrl,weather} = this.state;
        const {username} = MemoryUtils.user;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span> 
                    <a href="javascript:">推出</a>
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