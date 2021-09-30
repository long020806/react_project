import React, { Component } from 'react'
import { Card,Button,Modal,Table, message } from 'antd'
import { formatDate } from '../../utils/dateUtils'
import LinkButton from '../../components/LinkButton/LinkButton'
import { PAGE_SIZE } from '../../utils/constant'
import { reqUsers,reqDeleteUser, reqAddOrUpdateUser } from '../../api'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UserForm from './UserForm'
const {confirm} =Modal;
export default class User extends Component {
    state={
        users:[],//所有用户列表
        roles:[],//所有角色列表
        isShow:false,
    }
    initColumns = ()=>{
        this.columns = [
        {
            title:"用户名",
            dataIndex:"username"
        },
        {
            title:"邮箱",
            dataIndex:"email"
        },
        {
            title:"电话",
            dataIndex:"phone"
        },
        {
            title:"注册时间",
            dataIndex:"create_time",
            render:formatDate
        },
        {
            title:"所属角色",
            dataIndex:"role_id",
            render:(role_id)=>this.roleNames[role_id]
        },
        {
            title:"操作",
            width:160,
            render:(user)=>{
                return (
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
                    </span>
                )
            }
        }
    ]
    }
    showAdd = ()=>{
        this.user =null;
        this.setState({isShow:true})
    }
    showUpdate = (user)=>{
        this.user = user;
        this.setState({isShow:true})
    }
    deleteUser = (user)=>{
        confirm({
            title:`确定删除${user.name}吗？`,
            icon:<ExclamationCircleOutlined/>,
            content:"",
            onOk:async ()=>{
                const res = await reqDeleteUser(user._id);
                if(res.status===0){
                    message.success("删除用户成功");
                    this.getUsers();
                }else{
                    message.error("删除用户失败")
                }
            }
        })
    }
    /**
     * 
     * 根据role数组生成包含所有角色名的对象（属性用角色id）  
     */
    initRoleNames =(roles)=>{
        const roleNames = roles.reduce((pre,role)=>{
            pre[role._id] = role.name;
            return pre;
        },{})
        this.roleNames = roleNames;
    }
    addOrUpdateUser = async ()=>{
        //1.收集数据
        try{
            this.setState({isShow:false});
            const validate = await this.userform.form.validateFields()
            this.userform.form.resetFields()
            const user = validate;
            //如果是更新需要指定_id属性
            if(this.user&&this.user._id){
                user._id = this.user._id;
            }
            //发请求
            console.log(user);
            const res = await reqAddOrUpdateUser(user)
            if(res.status===0){
                message.success(`${this.user?"修改":"添加"}用户成功`)
                this.getUsers();
            }else{
                message.error(`${this.user?"修改":"添加"}用户失败`)
            }
        }catch(err){
            message.error("请正确填写表单")
        }
    }
    getUsers = async ()=>{
        const res = await reqUsers();
        if(res.status===0){
            message.success("获取用户列表成功");
            const {users,roles} = res.data;
            this.initRoleNames(roles);
            this.setState({users,roles})
        }else{
            message.error("获取用户列表失败")
        }
    }
    componentDidMount(){
        this.initColumns();
        this.getUsers();
    }
    render() {
        const title = (
            <Button type="primary" onClick={this.showAdd}>创建用户</Button>
        )
        const {users,isShow,roles} = this.state;
        const { columns,user} = this;
        return (
            <Card title={title}>
                <Table bordered rowKey="_id" dataSource={users} columns={columns} pagination={{pageSize:PAGE_SIZE}}></Table>
            
                <Modal title={user?"修改用户":"创建用户"} visible={isShow} onOk={this.addOrUpdateUser} onCancel={()=>{this.setState({isShow:false});this.userform.form.resetFields()}}>
                    <UserForm user={user} roles={roles} ref={c=>this.userform = c}></UserForm>
                </Modal>
            </Card>
        )   

    }
}
