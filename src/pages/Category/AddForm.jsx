import React, { Component } from 'react'
import {Form,Select,Input,} from "antd"
const { Option } = Select;
const {Item} = Form;
/**
 * 添加分类的Form组件
 */
export default class AddForm extends Component {
    render() {
        return (
            <Form
                layout="vertical"
            >
                <Item
                    label="所属分类："
                    name="parentId"
                    initialValue="0"
                >
                    <Select>
                        <Option value="0">一级分类</Option>
                    </Select>
                </Item>
                <Item
                    label="分类名称："
                    name="categoryName"
                    initialValue=""
                >
                    <Input placeholder="请输入分类名称"></Input>
                </Item>
            </Form>
        )
    }
}
