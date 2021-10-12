import React, { Component } from 'react'
import {Form,Input,Tree} from "antd"
import PropTypes from "prop-types"
import menuList from '../../config/menuConfig';
const {Item} = Form;
/**
 * 添加角色的Form组件
 */
export default class AuthForm extends Component {
    static propTypes={
        role:PropTypes.object,
    }
    state = {
        checkedKeys:[],
    }
    constructor(props){
        super(props);
        const {menus} = props.role;
        this.state={
            checkedKeys:menus
        }
    }
    // static getDerivedStateFromProps(nextProps,prevState){
    //     const {menus}= nextProps.role;
    //     let nowState=null;
    //     if(menus!==prevState.checkedKeys){
    //         nowState = {
    //             checkedKeys:menus,

    //         }
    //     }
    //     return nowState;
    // }
    UNSAFE_componentWillReceiveProps(props){
        const {menus} = props.role;
        console.log(menus)
        this.setState({
            checkedKeys:menus,
        })
    }
    componentDidUpdate(){
        this.form.setFieldsValue({name:""})
    }
    getMenus= ()=>this.state.checkedKeys;
    onCheck = (checkedKeys) => {
        console.log(checkedKeys)
        this.setState({checkedKeys})
      };
      onSelect = (selectedKeys) => {
      };
    render() {  
        const treeData = menuList;
        const {onCheck,onSelect}  = this;
        const {checkedKeys} = this.state;
        const {role} = this.props;
        return (
            <Form
                ref={c => this.form = c}
            >
                <Item label="角色名称：">
                    <Input value={role.name} disabled></Input>
                </Item>
                <Item>
                    <Tree
                        checkable
                        defaultExpandAll
                        treeData={treeData}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        onCheck={onCheck}
                    />
                </Item>
            </Form>
        )
    }
}
