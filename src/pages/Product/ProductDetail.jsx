import React, { Component } from 'react'
import { Card,List, } from 'antd'
import {ArrowLeftOutlined} from "@ant-design/icons"
import LinkButton from '../../components/LinkButton/LinkButton';
import { reqCategory } from '../../api';
import MemoryUtils from '../../utils/MemoryUtils';
const {Item} = List;

/**
 * Product详情子路由组件
 */
export default class ProductDetail extends Component {
    state = {
        cName1:"",//一级分类名称
        cName2:"",//二级分类名称
    }
    async componentDidMount(){
        const {pCategoryId,categoryId} = MemoryUtils.product;
        if(pCategoryId==="0"){//一级分类下的商品
          const res = await reqCategory(categoryId)  
          const cName1 = res.data.name;
          this.setState({cName1});
        }else{//二级分类下的商品
            // //在一级分类请求完毕后再次请求
            // const res1 = await reqCategory(pCategoryId)  //请求一级分类名称
            // const res2 = await reqCategory(categoryId)  // 请求二级分类名称
            //一次请求多个
            const res = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)]);
            const cName1 = res[0].data.name;
            const cName2 = res[1].data.name;
            this.setState({cName1,cName2});
        }
    }
    componentWillUnmount(){
        MemoryUtils.product = {}
    }
    render() {
        const {product} = MemoryUtils;
        const {cName1,cName2} = this.state;
        const title = (
            <span>
                <LinkButton >
                    <ArrowLeftOutlined onClick={()=>{this.props.history.goBack()}} style={{marginRight:10,color:"#1890ff",fontSize:20}} /> 
                </LinkButton>
                <span>商品详情</span> 
            </span>
        )
        const {imgs,detail,name,desc,price} = product;
        return (
            <Card title={title}  className="product-detail">
                <List>
                    <Item className="product-item">
                        <span className="left">商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item className="product-item">
                        <span className="left">商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item className="product-item">
                        <span className="left">商品价格：</span>
                        <span>{price}元</span>
                    </Item>
                    <Item className="product-item">
                        <span className="left">所属分类：</span>
                        <span>{cName1}{cName2===""?"":` ---> ${cName2}`}</span>
                    </Item>
                    <Item className="product-item">
                        <span className="left">商品图片：</span>
                        <span>
                            {
                                imgs.map(item=>(
                                    <img src={"http://localhost:5000/upload/"+item} key={item} alt="" className="product-img" />
                                ))
                            }
                            
                        </span>
                    </Item>
                    
                    <Item className="product-item">
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </Item>
                </List>

            </Card>
        )
    }
}
