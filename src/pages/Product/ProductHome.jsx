import React, { Component } from 'react'
import { Card,Select,Input,Button,Table, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../components/LinkButton/LinkButton'
import { reqProducts,reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constant'
import MemoryUtils from '../../utils/MemoryUtils'
const {Option} = Select

export default class ProductHome extends Component {
    state = {
        products:[],//商品信息
        total:0,//数据总数
        loading:false,
        searchName:"",//搜索关键字
        searchType:"productName",//搜索 字段
    }
    updateStatus = async (productId,status)=>{
        const res = await reqUpdateStatus(productId,status);
        if(res.status===0){
            message.success("更新商品状态成功");
            this.getProducts(this.pageNum);
        }
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
            //dataIndex:"status",
            width:90,
            render:(product)=>{
                const {status,_id} = product;
                 const newStatus = status===1?2:1;
                return (
                <span>
                    <Button type="primary" 
                    onClick={()=>this.updateStatus(_id,newStatus)}>{status===1?"下架":"上架"}
                    </Button>
                    {status===1?"在售":"已下架"}
                </span>
            )}
        },{
            title:"操作",
            width:90,
            render:(product)=>(
                <span>
                    <LinkButton onClick={()=>this.showDeatail(product)}>详情</LinkButton>
                    <LinkButton onClick={()=>this.showUpdate(product)}>修改</LinkButton>
                </span>
            )
        }]
    }
    showDeatail = (product)=>{
        //缓存product => Detail使用
        MemoryUtils.product = product;
        this.props.history.push("/product/detail");
    }
    showUpdate = (product)=>{
        //缓存product => Editor使用
        MemoryUtils.product = product;
        this.props.history.push("/product/detail");
    }
    getProducts = async (pageNum)=>{
        this.pageNum = pageNum;//保存pageNum 方便后面使用
        this.setState({loading:true});
        const {searchType,searchName} = this.state;
        let result;

        if(searchName){
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType});
            console.log(result)
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
        this.getProducts(1);
    }
    render() {
        const {products,total,loading,searchName,searchType} = this.state;
        const {columns} = this;
        const title = (
            <span>
                <Select value={searchType} style={{width:150}} onChange={value=>this.setState({searchType:value})}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="请输入关键词" style={{width:150,margin:"0 15px"}}  defaultValue={searchName} onChange={e=>this.setState({searchName:e.target.value})}></Input>
                <Button type="primary" onClick={()=>this.getProducts(1)}>搜索</Button>
            </span>
        );
        const extra = (
            <Button onClick={()=>{this.props.history.push("/product/addupdate")}} type="primary" icon={<PlusOutlined/>}>添加商品</Button>  
        );
        return (
            <Card title={title} extra={extra} >
                <Table dataSource={products} columns={columns} border={true} rowKey="_id" pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true,total:total,onChange:this.getProducts,current:this.pageNum}} loading={loading}></Table>
            </Card>
        )
    }
}
