import React, { Component } from 'react'
import { Card,List, } from 'antd'
import {ArrowLeftOutlined} from "@ant-design/icons"
const Item = {List};

/**
 * Product详情子路由组件
 */
export default class ProductDetail extends Component {
    render() {
        const title = (
            <span><ArrowLeftOutlined style={{marginRight:10,color:"#1890ff"}} /> 商品详情</span>
        )
        const extra = (
            <></>
        );
        return (
            <Card title={title} extra={extra} className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称：</span>
                        <span>联想Thinkpad 翼480</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述：</span>
                        <span>年度重量级新品，X390，T490全新登场 更加轻薄机身设计</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格：</span>
                        <span>6600元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span>电脑--&gt;笔记本</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        <span>
                            <img src="http://localhost:5000/upload/image-1554636776678" alt="" className="product-img" />
                            <img src="http://localhost:5000/upload/image-1557738385383" alt="" className="product-img" />
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span>电脑--&gt;笔记本</span>
                    </Item>
                </List>

            </Card>
        )
    }
}
