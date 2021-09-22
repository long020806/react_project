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
        setForm:PropTypes.func.isRequired,
    }
    componentDidMount(){
        const {setForm} = this.props;
        setForm(this.form);
    }
    render() {
        const {categoryName} =this.props;
        console.log(categoryName)
        return (
            <Form
                layout="vertical"
                ref={(c)=>{this.form=c}}
            >
                <Item
                    label="分类名称："
                    name="categoryName"
                    initialValue={categoryName}
                >
                    <Input placeholder="请输入分类名称"></Input>
                </Item>
            </Form>
        )
    }
}
