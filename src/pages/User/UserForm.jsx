import React, { PureComponent } from 'react'
import {Form,Input, Select,} from "antd"
import PropTypes from "prop-types"
const {Item} = Form;
const {Option} = Select; 
/**
 * 添加用户修改用户界面
 */
export default class UserForm extends PureComponent {
    static propTypes={
        roles:PropTypes.array.isRequired,
        user:PropTypes.object,
    }
    componentDidUpdate(){
        const user = this.props.user||{};
        this.form.setFieldsValue({username:user.username,password:user.password,email:user.email,phone:user.phone,role_id:user.role_id})
    }
    render() {  
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        }
        const {roles} = this.props;
        const user = this.props.user||{};
        console.log(user)
        return (
            <Form
                ref={c => this.form = c}
                {...layout}
            >
                <Item label=" 用户名：" name="username" initialValue={user.username}
                    rules={[{
                        required:true,message:"用户名必须输入"
                    }]}
                >
                    <Input placeholder="请输入用户名"></Input>
                </Item>
                {user._id?null:(
                <Item label=" 密码：" name="password" initialValue={user.password}
                    rules={[{
                        required:true,message:"密码必须输入"
                    }]}
                >
                    <Input placeholder="请输入密码"></Input>
                </Item>
                )}
                <Item label=" 手机号：" name="phone" initialValue={user.phone}
                    rules={[{
                        required:true,message:"手机号必须输入"
                    }]}
                >
                    <Input placeholder="请输入手机号"></Input>
                </Item>
                <Item label=" 邮箱：" name="email" initialValue={user.email}
                    rules={[{
                        required:true,message:"邮箱必须输入"
                    }]}
                >
                    <Input placeholder="请输入邮箱"></Input>
                </Item>
                <Item label=" 用户角色：" name="role_id" initialValue={user.role_id}>        
                    <Select>
                        {
                            roles.map(item=>(
                                <Option key={item._id} value={item._id}>{item.name}</Option>
                            ))
                        }
                    </Select>
                </Item>
            </Form>
        )
    }
}
