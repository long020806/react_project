import React, { Component } from 'react'
import { Card,Button,Modal,Input,Table, message } from 'antd'
import { formatDate } from '../../utils/dateUtils'
import LinkButton from '../../components/LinkButton/LinkButton'
import { PAGE_SIZE } from '../../utils/constant'
import { reqUSers } from '../../api'
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
            render:()=>{
                return (
                    <span>
                        <LinkButton>修改</LinkButton>&nbsp;&nbsp;
                        <LinkButton>删除</LinkButton>
                    </span>
                )
            }
        }
    ]
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
    getUsers = async ()=>{
        const res = await reqUSers();
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
            <Button type="primary">创建用户</Button>
        )
        const {users,isShow} = this.state;
        const { columns} = this;
        return (
            <Card title={title}>
                <Table bordered rowKey="_id" dataSource={users} columns={columns} pagination={{pageSize:PAGE_SIZE}}></Table>
                <Modal title={"创建用户"} visible={isShow} onOk={this.addOrUpdateUser} onCancel={()=>{this.setState({isShow:false})}}></Modal>
            </Card>
        )   

    }
}
