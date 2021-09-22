import React, { Component } from 'react'
import './index.less'
import logo from "../../assets/images/logo.png"
import {Link,withRouter} from "react-router-dom"
import {Menu} from "antd";
import menuList from '../../config/menuConfig';
const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
class LeftNav extends Component {
    state = {collapsed:true,first:true}
    getMenuNodes_map = (menuList)=>{
        const {pathname} = this.props.location;
        return menuList.map(item=>{
                    if(item.children&&item.children.length!==0){
                        const cItem  = item.children.find(cItem=>cItem.key===pathname)
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
                })
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
    UNSAFE_componentWillMount(){
        this.menuNodes = this.getMenuNodes_map(menuList);

    }
    // componentDidMount(){
    //     // if(this.state.first){
    //     //     console.log(1)
    //     //     this.setState({first:false})
    //     this.setState({});

    //     // }
    // }
    render() {
        //得到当前请求的路由路径
        const {pathname} = this.props.location;
        const {isCollapsed} = this.props;
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