import React, { Component } from 'react'
import { Card ,Button,Table,message,Modal } from 'antd'
import {PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';
import LinkButton from "../../components/LinkButton/LinkButton"
import { reqCategories,reqAddCategory,reqUpdateCategory } from '../../api';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
/**
 * 商品分类路由
 */
export default class Category extends Component {
    state={
        categories:[],//一级分类列表
        subCategories:[],//二级分类列表
        loading:false,//是否正在获取列表中
        parentId:"0",//当前显示的父分类Id
        parentName:"",//当前显示父分类名称
        showStatus:0,
    }
    /**
     * 初始化所有列的数组
     */
    getColumns = ()=>{
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',//指定显示数据对应的属性名
            },
            {//返回需要显示的界面标签
                title: '操作',
                width:300,
                render: (category)=>(
                    <span>
                      <LinkButton onClick={()=>this.showUpdateModal(category)}>修改分类</LinkButton>
                      {this.state.parentId==="0"?<LinkButton onClick={()=>this.showSubCategories(category)}>查看子分类</LinkButton>:null}
                  </span>
              )
            },
        ];
    }
    showSubCategories=(category)=>{
        //更新状态，异步，需使用回调函数
        this.setState({parentId:category["_id"],parentName:category["name"]},()=>{
            this.getCatories();
        });
    }
    showCategories = ()=>{
        this.setState({parentId:"0",parentName:"",subCategories:[]})
    }
    /**
     * 异步获取一级/二级分类列表显示
     * parentId:无参则为状态中的parentId有参则是指定parnetId
     */
    getCatories = async (parentId)=>{
        //再发送请求前显示loading
        this.setState({loading:true});
        //发异步ajax请求，获取数据
        parentId = parentId || this.state.parentId;
        const result = await reqCategories(parentId);
        //请求响应时，隐藏loading
        this.setState({loading:false})
        if(result.status===0){
            //取出分类列表（可能是一级可能是二级
            if(parentId==="0"){
                const {data:categories} = result;
                this.setState({categories});
            }else{
                const {data:subCategories} = result;
                this.setState({subCategories})
            }
        }else{
            message.error("获取分类列表失败");
        }
    }
    /**
     * 相应取消：隐藏对话框
     */
    handleCancel = ()=>{
        //隐藏对话框
        this.setState({showStatus:0});
    }
    /**
     * 添加分类
     */
    addCategory = async ()=>{
        //通过验证
        try{
            const validate = await this.addForm.form.validateFields();
            //隐藏对话框
            this.setState({showStatus:0})
            //准备数据
            const {parentId,categoryName} = validate;
            //发送请求
            const result = await reqAddCategory(parentId,categoryName);
            if(result.status===0){
                message.success("添加分类成功")
                if(parentId===this.state.parentId)
                    this.getCatories();
                else if(parentId===0)//在二级分类列表重新获取一级分类，但不需要显示一级分类
                    this.getCatories("0");
    
            }else{
                console.log(result)
                let msg = (result&&result.msg)||"添加分类失败";
                message.error(msg)
            }
        }catch(err){
            console.log(err);
            return ;
        }



    }
    /**
     * 更新分类
     */
    updateCategory = async ()=>{
        //验证通过
        try{
            const validate = await this.updateForm.formRef.validateFields();
            //隐藏对话框
            this.setState({showStatus:0});
            //准备数据
            const categoryId = this.category["_id"];
            const {categoryName} = validate;
            //发请求   
            const result = await reqUpdateCategory({categoryId,categoryName});
            if(result.status===0){
                message.success('修改分类成功')
                //重新显示列表
                    this.getCatories();
            }else{
                let msg = (result&&result.msg)||"修改分类失败";
                message.error(msg)
            }

        }catch(err){
            console.log(err);
            return ;
        }

        

        
    }
    /**
     * 展示添加分类对话框
     */
    showAddModal = ()=>{
        this.setState({showStatus:1})
    }
    /**
     * 展示更新分类对话框
     */
    showUpdateModal = (category)=>{
        //保存分类对象
        this.category = category;
        //更新状态
        this.setState({showStatus:2});
    }
    componentDidMount(){
        this.getColumns();
        this.getCatories();
    }
    render() {
        //读取状态数据
        const {categories,loading,subCategories,parentId,parentName,showStatus} = this.state;  
        
        const {columns}  = this;

        const category = this.category||{name:""};
        //card的左侧
        const title = parentId==="0"?"一级分类列表":(<span><LinkButton onClick={this.showCategories}>一级分类列表</LinkButton><ArrowRightOutlined style={{marginRight:10}}/><span>{parentName}</span></span>);
        //card的右侧
        const extra = (
            <Button type="primary" icon={<PlusOutlined />} onClick={this.showAddModal}>添加</Button>
        )
        return (
            <Card title={title}  extra={extra}>
                <Table dataSource={parentId==="0"?categories:subCategories} columns={columns} bordered={true} rowKey="_id" pagination={{defaultPageSize:5,showQuickJumper:true}} loading={loading}></Table>
                <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm categories={categories} parentId={parentId} ref={(c)=>this.addForm = c}></AddForm>
                </Modal>
                <Modal title="修改分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <UpdateForm categoryName={category.name} ref={(c)=>(this.updateForm = c)}></UpdateForm>
                </Modal>
           </Card>
            )
    }
}
