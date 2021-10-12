import React, { Component } from 'react'
import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'
import ProductHome from './ProductHome'
import { Switch,Route,Redirect } from 'react-router-dom'
import './product.less'
/**
 * 商品路由
 */
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
                <Route path="/product/detail" component={ProductDetail}></Route>
                <Route path="/product" component={ProductHome} exact></Route>{/**路径完全匹配 */}
                <Redirect to="/product"></Redirect>
            </Switch>    
        )
    }
}
