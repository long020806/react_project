import React, { Component } from 'react'
import {Redirect ,Switch,Route} from "react-router-dom"
import {Layout} from 'antd'
import LeftNav from '../../components/LeftNav/LeftNav'
import Header from '../../components/Header/Header'
import Home from '../Home';
import Product from '../Product';
import Category from '../Category';
import Role from '../Role';
import User from '../User';
import Bar from '../Charts/Bar';
import Line from '../Charts/Line';
import Pie from '../Charts/Pie';
import { connect } from 'react-redux'
import NotFound from '../NotFound/NotFound'
const {Footer,Sider,Content} = Layout;
/**
 * 后台管理路由组件
 */
class Admin extends Component {
    state = {isCollapsed:true}
    toggleCollapsed = ()=>{
        const {isCollapsed} = this.state;
        this.setState({isCollapsed:!isCollapsed});
    }
    render() {
        const {user} = this.props;
        const {isCollapsed} = this.state;
        if(!user||!user._id){
            return <Redirect to="/login"></Redirect>
        }
        return (
        <Layout style={{minHeight:"100%"}}>
            <Sider collapsed={isCollapsed} >
                <LeftNav isCollapsed = {isCollapsed} toggleCollapsed={this.toggleCollapsed}></LeftNav>
            </Sider>
            <Layout>
              <Header></Header>
              <Content style={{margin:20,backgroundColor:"#fff"}}>
                  <Switch>
                      <Redirect exact={true} from="/" to="/home"></Redirect>
                      <Route path="/home" component={Home}></Route>
                      <Route path="/category" component={Category}></Route>
                      <Route path="/product" component={Product}></Route>
                      <Route path="/role" component={Role}></Route>
                      <Route path="/user" component={User}></Route>
                      <Route path="/charts/bar" component={Bar}></Route>
                      <Route path="/charts/line" component={Line}></Route>
                      <Route path="/charts/pie" component={Pie}></Route>
                      <Route component={NotFound}></Route>
                  </Switch>
              </Content>
              <Footer style={{textAlign:'center',color:"#ccc"}}>推荐使用谷歌浏览器，可以获得更佳的页面体验</Footer>
            </Layout>
          </Layout>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {}
)(Admin)
