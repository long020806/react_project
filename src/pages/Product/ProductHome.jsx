import React, { Component } from 'react'
import { Card,Select,Input,Button,Table, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../components/LinkButton/LinkButton'
import { reqProducts,reqSearchProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constant'
const {Option} = Select

export default class ProductHome extends Component {
    state = {
        products:[{//商品信息
            "name":"123",
            "desc":"123",
            "price":"123",
            "_id":"1",
            "status":"0"
        }],
        total:0,//数据总数
        loading:false,
        searchName:"",//搜索关键字
        searchType:"productName",//搜索 字段
    }
    initColumns = ()=>{
        this.columns =[{
            title:"商品名称",
            dataIndex:"name",
        },{
            title:"商品描述",
            dataIndex:"desc"
        },{
            title:"价格",
            dataIndex:"price",
            render:(price)=>("￥"+price)//指定了dataIndex参数就为指定的属性
        },{
            title:"状态",
            dataIndex:"status",
            width:90,
            render:(status)=>(
                <span><Button type="primary">{status==="1"?"下架":"上架"}</Button>{status==="1"?"在售":"已下架"}</span>
            )
        },{
            title:"操作",
            width:90,
            render:(product)=>(
                <span><LinkButton>详情</LinkButton><LinkButton>修改</LinkButton></span>
            )
        }]
    }
    getProducts = async (pageNum,search=false)=>{
        this.setState({loading:true});
        const {searchType,searchName} = this.state;
        let result;
        if(search){
            result = await reqSearchProducts({pageNum,PAGE_SIZE,searchName,searchType});
        }else{
            result = await reqProducts(pageNum,PAGE_SIZE);
        }
        this.setState({loading:false});
        if(result.status===0){
            message.success("获取商品列表成功")
            const {total,list} = result.data;
            this.setState({products:list,total})
        }else{
            message.error("获取商品列表失败");
        }
        

    }
    componentDidMount(){
        this.initColumns();
        this.getProducts();
        // this.setState({})
    }
    render() {
        const {products,total,loading,searchName,searchType} = this.state;
        const {columns} = this;
        const title = (
            <span>
                <Select value={searchType} style={{width:150}} onChange={e=>this.setState({searchType:e.target.value})}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="请输入关键词" style={{width:150,margin:"0 15px"}}  defaultValue={searchName} onChange={value=>this.setState({searchName:value})}></Input>
                <Button type="primary" onClick={()=>this.getProducts(1,true)}>搜索</Button>
            </span>
        );
        const extra = (
            <Button type="primary" icon={<PlusOutlined/>}>添加商品</Button>  
        );
        return (
            <Card title={title} extra={extra} >
                <Table dataSource={products} columns={columns} border={true} rowKey="_id" pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true,total:total,onChange:this.getProducts}} loading={loading}></Table>
            </Card>
        )
    }
}
