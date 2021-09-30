import React, { Component } from 'react'
import { Card,Button,Table, message ,Modal} from 'antd'
import { PAGE_SIZE } from '../../utils/constant'
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api'
import AddForm from './AddForm'
import AuthForm from './AuthForm'
import MemoryUtils from '../../utils/MemoryUtils'
import StorageUtils from "../../utils/StorageUtils"
import { formatDate } from '../../utils/dateUtils'
export default class Role extends Component {
    state={
        roles:[],//所有角色列表
        role:{},//选中的角色
        isShowAdd:false,//是否展示创建角色窗口
        isShowAuth:false,//是否展示设置角色权限窗口
    }
    constructor(props){
        super(props)
        this.authForm = React.createRef();
    }
    initColumns = ()=>{
        this.columns = [
        {
            title:"角色名称",
            dataIndex:"name"
        },
        {
            title:"创建时间",
            dataIndex:"create_time",
            render:formatDate
        },
        {
            title:"授权时间",
            dataIndex:"auth_time",
            render:formatDate
        },
        {
            title:"授权人",
            dataIndex:"auth_name"
        },
    ]
    }
    getRoles=async () =>{
        const res = await reqRoles();
        if(res.status===0){
            message.success("获取角色列表成功")
            const roles = res.data;
            this.setState({roles});
        }else{
            message.error("获取角色列表失败")
        }
    }
    onRow = (role)=>{
        return {
            onClick:(e)=>{
                this.setState({role});
            }
        }
    }
    addRole = async ()=>{
        //收集数据
        //进行表单验证
        try{
            const validate = await this.addForm.form.validateFields();
            this.setState({isShowAdd:false});
            const {name} = validate;
            console.log(name)
            //发送数据
            const res = await reqAddRole(name);
            if(res.status===0){
                message.success("创建角色成功");
                const role = res.data;
                //更新roles
                this.setState(state=>({roles:[...state.roles,role]}))
            }else{
                message.error("创建角色失败")
            }
            
        }catch(e){
            message.error(e.errorFields[0].errors[0])
        }
    }
    updateRole = async ()=>{
        this.setState({isShowAuth:false})
        const {role} = this.state;
        //得到最新的menus
        const menus = this.authForm.current.getMenus(); 
        role.menus = menus;
        role.auth_time = Date.now();
        role.auth_name = MemoryUtils.user.username;
        const res = await reqUpdateRole(role)
        if(res.status===0){
            //如果当前用户的角色为修改的角色强制退出
            if(role._id===MemoryUtils.user.role_id){
                message.success("当前用户角色权限已更新，请重新登录")
                MemoryUtils.user= {};
                StorageUtils.removeUser();
                this.props.history.replace("/login")
            }else{
                message.success("设置角色权限成功")
                this.setState({roles:[...this.state.roles]})
            }
        }else{
            message.error("设置角色权限失败")
        }
    }
    componentDidMount(){
        this.initColumns();
        this.getRoles();
    }
    render() {
        const {columns,addRole} = this;
        const {roles,role,isShowAdd,isShowAuth} = this.state;
        const title = (
            <span>
                <Button type="primary" onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button>&nbsp;
                <Button type="primary" onClick={()=>this.setState({isShowAuth:true})} disabled={!role["_id"]}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={roles}
                    columns={columns}
                    pagination={{defaultPageSize:PAGE_SIZE,}}
                    rowSelection={{type:"radio",selectedRowKeys:[role["_id"]],onSelect:(role)=>{
                        // /选中某个radio时回调
                        this.setState({role})
                    }}}
                    onRow={this.onRow}
                ></Table>
                <Modal title="添加角色" visible={isShowAdd} onOk={addRole} onCancel={()=>{this.setState({isShowAdd:0})}}>
                    <AddForm ref={(c)=>this.addForm = c}></AddForm>
                </Modal>
                <Modal title="设置角色权限" visible={isShowAuth} onOk={this.updateRole} onCancel={()=>{this.setState({isShowAuth:false})}}>
                    <AuthForm role={role} ref={this.authForm}></AuthForm>
                </Modal>
            </Card>
        )
    }
}
