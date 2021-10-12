import React, { Component } from 'react'
import "./Login.less"//需下载less和less-loader 注意less-loader版本为5.0
import logo from "../../assets/images/logo.png"
import {Form,Input,Button} from "antd"
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import {login} from "../../redux/actions"
/**
 * 登录路由组件
 */
/**
 * input验证在其父级Form.Item添加name和rules属性
 */
class Login extends Component {
    onFinish =async (values)=>{
        // console.log("finish",values)
        const {username,password} = values;
        //调用分发异步action=>发送异步请求
        this.props.login(username,password);

    }
    validatePwd = (_,value)=>{
        const reg = /^[a-zA-Z0-9_]+$/
        if(!value){
            return Promise.reject(new Error("请输入密码"))
        }else if(value.length <4||value.length>12){
            return Promise.reject(new Error("密码长度位4到12位"))
        }else if(!reg.test(value)){
            return Promise.reject(new Error("用户名必须是英文，数字，下划线组成"))
        }else{
            return Promise.resolve();
        }
    }
    render() {
        // console.log(this.props)
        //判断用户是否登录，如果已经登陆跳转管理界面
        const {user} = this.props;
        if(user&&user._id){
            return <Redirect to="/home"/>
        }
        const {errorMsg} = this.props.user
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"></img>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                <div className={errorMsg?"error-msg show":"error-msg"}>{errorMsg}</div>

                    <h2>用户登录</h2>
                    <Form onFinish={this.onFinish} className="login-form" >
                        <Form.Item
                        name="username"
                        rules={[{ required: true, whitespace:true,message: '请输入用户名' },{min:4,max:12,message:"用户名长度为4到12位"},{pattern:/^[a-zA-Z0-9_]+$/,message:"用户名必须是英文，数字，下划线组成"}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                        name="password"
                        rules={[{validator:this.validatePwd}]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Login)