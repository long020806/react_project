import React, { Component } from 'react'
import './index.less'
import logo from "../../assets/images/logo.png"
import {Link,withRouter} from "react-router-dom"
import {Menu} from "antd";
import menuList from '../../config/menuConfig';
import MemoryUtils from "../../utils/MemoryUtils"
const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
class LeftNav extends Component {
    state = {collapsed:true,first:true}
    getMenuNodes_map = (menuList)=>{
        const {pathname} = this.props.location;
        return menuList.map(item=>{
            //如果当前角色有item权限
            if(this.hasAuth(item)){
                if(item.children&&item.children.length!==0){
                    const cItem  = item.children.find(cItem=>pathname.indexOf(cItem.key)===0)
                    if(cItem) this.openKey = item.key;
                    return (
                        <SubMenu key={item.key} title={item.title} icon={React.createElement(item.icon)}>
                            {this.getMenuNodes_map(item.children)}
                        </SubMenu>
                    )
                }else{
                    return (<Menu.Item key={item.key} icon={React.createElement(item.icon)}>
                            <Link to={item.key}>{item.title}</Link>
                        </Menu.Item>)
                }
            }
        })
    }
    /**
     * @returns 当前用户是否对item有权限 
     */
    hasAuth = (item)=>{
        const {key,isPublic} = item;
        const menus = MemoryUtils.user.role.menus;
        const username = MemoryUtils.user.username;

        /**
         * 如果当前角色是admin
         * 如果当前item是公开的
         * 当前用户有item的权限：key有没有在menus中
         * 如果当前用户有此item的子item
         */
        if(username ==="admin"||isPublic||menus.indexOf(key)!==-1){
            return true;
        }else if(item.children){
            return !!item.children.find(item=>menus.indexOf(item.key)!==-1)
        }
        return false;
    }
    getMenuNodes_reduce = (menuList)=>{
        return menuList.reduce((pre,item)=>{
            if(item.children&&item.children.length){
                pre.push(
                    (
                        <SubMenu key={item.key} title={item.title} icon={React.createElement(item.icon)}>
                            {this.getMenuNodes_reduce(item.children)}
                        </SubMenu>
                    )
                )
            }else{
                pre.push(
                    (<Menu.Item key={item.key} icon={React.createElement(item.icon)}>
                                <Link to={item.key}>{item.title}</Link>
                            </Menu.Item>)
                )
            }
            return pre;
        },[])
    
    }
    // static getDerivedStateFromProps(nextPropx,prevState){
    //     return null;
    // }
    componentDidMount(){
        // if(this.state.first){
        //     console.log(1)
        //     this.setState({first:false})
        this.menuNodes = this.getMenuNodes_map(menuList);
        this.setState({});

        // }
    }
    render() {
        //得到当前请求的路由路径
        let {pathname} = this.props.location;
        const {isCollapsed} = this.props;
        if(pathname.indexOf("/product")===0){
            pathname = "/product"
        }
        const openKey = isCollapsed?{}:this.openKey;
        
        return (
            <div>
            <div  className="left-nav">
                    <Link to="/" onClick={this.props.toggleCollapsed} className="left-nav-header"> 
                        <img src={logo} alt="logo" />
                        <h1 style={{display:isCollapsed?"none":""}}>谷粒后台</h1>
                    </Link>

                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[openKey]}
                    >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
 
        )
    }
}
export default withRouter(LeftNav);