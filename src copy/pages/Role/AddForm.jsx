import React, { Component } from 'react'
import {Form,Input,} from "antd"
const {Item} = Form;
/**
 * 添加角色的Form组件
 */
export default class AddForm extends Component {

    componentDidUpdate(){
        this.form.setFieldsValue({name:""})
    }
    render() {  
        const layout={
            labelCol:{span:4},//左侧label宽度
            wrapperCol:{span:16}//指定右侧包裹的宽度
        }
        return (
            <Form
                ref={c => this.form = c}
            >
                <Item
                    label="角色名称："
                    name="name"
                    initialValue=""
                    rules={[{
                        required:true,message:"角色名称必须输入"
                    }]}
                    {...layout}
                >
                    <Input placeholder="请输入角色名称"></Input>
                </Item>
            </Form>
        )
    }
}
