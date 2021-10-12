import React, { Component } from 'react'
import {Form,Select,Input,} from "antd"
import PropTypes from "prop-types"
const { Option } = Select;
const {Item} = Form;
/**
 * 添加分类的Form组件
 */
export default class AddForm extends Component {
    static propTypes={
        categories:PropTypes.array.isRequired,
        parentId:PropTypes.string.isRequired,
    }
    componentDidUpdate(){
        const {parentId} =  this.props;
        this.form.setFieldsValue({parentId,categoryName:""});
    }
    render() {
        const {categories} = this.props;
        return (
            <Form
                layout="vertical"
                ref={c => this.form = c}
            >
                <Item
                    label="所属分类："
                    name="parentId"
                    initialValue="0"
                >
                    <Select>
                        <Option value="0">一级分类</Option>
                        {
                            categories.map(category=>(<Option value={category["_id"]} key={category["_id"]}>{category.name}</Option>))
                        }
                    </Select>
                </Item>
                <Item
                    label="分类名称："
                    name="categoryName"
                    initialValue=""
                    rules={[{
                        required:true,message:"分类名称必须输入"
                    }]}
                >
                    <Input placeholder="请输入分类名称"></Input>
                </Item>
            </Form>
        )
    }
}
