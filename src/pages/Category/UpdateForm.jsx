import React, { Component } from 'react'
import {Form,Input,} from "antd"
import PropTypes from "prop-types"
const {Item} = Form;
/**
 * 修改分类名称表单
 */

export default class UpdateForm extends Component {
    static propTypes = {
        categoryName:PropTypes.string.isRequired,
    }
    componentDidUpdate(){
        //之前使用setForm传递form然后使用initValue去改变值为特性，与antd4版本中修复
        //正确应该在update时使用setFieldsValue去改变
        const {categoryName} =this.props;
        this.formRef.setFieldsValue({
            categoryName
        });
    }
    render() {
        const {categoryName} =this.props;

        return (
            <Form
                layout="vertical"
                ref={c=>this.formRef=c}
            >
                <Item
                    label="分类名称："
                    name="categoryName"
                    initialValue={categoryName}
                >
                    <Input placeholder="请输入分类名称"/>
                </Item>
            </Form>
        )
    }
}
