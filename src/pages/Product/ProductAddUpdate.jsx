import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message
} from "antd";
import LinkButton from '../../components/LinkButton/LinkButton';
import {ArrowLeftOutlined} from "@ant-design/icons"
import { reqAddOrUpdateProduct, reqCategories } from '../../api';
import PicturesWall from './PicturesWall';
import RichTextEditor from './RichTextEditor';
const {Item} = Form;
const {TextArea} = Input;
/**
 * Product更新和添加子路由
 */
export default class ProductAddUpdate extends Component {
    state={
        options:[],
    }
    constructor(props){
        super(props);
        this.pw = React.createRef();
        this.editor = React.createRef();
    }
    /**
     * 异步获取一级/二级列表分类列表，并显示
     */
    getCategories = async (parentId)=>{
        const res = await reqCategories(parentId);
        if(res.status===0){
            const categories = res.data;
            //如果是一级列表
            if(parentId==="0"){
                this.initOptions(categories);
            }else{
                return categories;//返回二级分类列表===>当前async函数返回的是promise对象成功jie'guo为categories
            }
        }else{
            message.error("获取分类列表失败");
        }
    }
    initOptions = async (categories)=>{
        const options = categories.map(item=>({
            value:item["_id"],
            label:item["name"],
            isLeaf:false//不是叶子
        }))
        //如果是一个二级分类商品的更新
        const {isUpdate,product}=this;
        const {pCategoryId} = product;
        if(isUpdate&&pCategoryId!=="0"){
            //获取对应的二级分类列表
            const subCategories = await this.getCategories(pCategoryId);
            //生成二级下拉列表options
            const childrenOptions = subCategories.map(item=>(
                {
                    label:item["name"],
                    value:item["_id"],
                    isLeaf:true,
                }
            ))
            //找到当前商品对应的一级option对象
            const targetOption = options.find(item=>item.value===pCategoryId);
            //关联到对应的一级option
            targetOption.children = childrenOptions;
        }
        this.setState({options})
    }
    onFinish = async (values)=>{
        //收集数据，封装product对象
        const {name,desc,price,categoryIds} = values;
        let pCategoryId,categoryId;
        if( categoryIds.length===1){
            pCategoryId="0";
            categoryId=categoryIds[0];
        }else{
            pCategoryId=categoryIds[0];
            categoryId=categoryIds[1];
        }
        const imgs = this.pw.current.getImgs();
        const detail = this.editor.current.getEditorContent();
        const product = {name,desc,price,pCategoryId,categoryId,imgs,detail};
        //如果更新添加 _id 
        if(this.isUpdate){
            product._id = this.product._id;
        }
        //调用接口添加/更新
        const res  = await reqAddOrUpdateProduct(product);

        //根据结果显示
        console.log(res)
        if(res.status===0){
            message.success(`${this.isUpdate?"更新":"添加"}商品成功`);
            this.props.history.goBack();
        }else{
            message.error(`${this.isUpdate?"更新":"添加"}商品失败`);
        }
    }
    validatePrice=(_,value)=>{
        console.log(value); 
        if(value>0){
            return Promise.resolve()
        }else{
            return Promise.reject(new Error("价格必须大于0"));
        }
    }
    loadData=async (selectedOptions )=>{
        const {options}= this.state;
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        //获取二级分类
        const subCategories = await this.getCategories(targetOption.value);
        targetOption.loading = false;
        //二级分类有值
        if(subCategories&&subCategories.length>0){
            //生成二级分类的options
            const childrenOptions = subCategories.map(item=>({
                value:item["_id"],
                label:item["name"],
                isLeaf:true,
            }))
            //将二级分类关联到options
            targetOption.children=childrenOptions;
        }else{//当前选中分类没有二级分类
            targetOption.isLeaf=true;
        }
        this.setState({options:[...options]})
    }
    componentDidMount(){
        this.getCategories("0");
    }
    UNSAFE_componentWillMount(){
        //取出携带的state
        const product = this.props.location.state;//添加没有值，否则有
        //保存是否为更新的标识符
        this.isUpdate = !!product;
        this.product = product || {};//保存商品，如果没有则为{}，防止报错
    }
    render() {
        const {onFinish,loadData,validatePrice,isUpdate,product}=this;
        const {name,desc,price,pCategoryId,categoryId,imgs,detail} = product;
        const {options}= this.state;
        //用于接收级联分级Id的数组
        const categoryIds = [];
        if(isUpdate){
            //商品是一个一级分类的列表
            // if(pCategoryId==="0"){
            //     categoryIds.push(categoryId);    
            // }else{
            //     categoryIds.push(pCategoryId);
            //     categoryIds.push(categoryId);
            // }
            pCategoryId!=="0"&&categoryIds.push(pCategoryId);
            categoryIds.push(categoryId);
        }
        //指定Item布局的配置对象
        const layout={
            labelCol:{span:2},//左侧label宽度
            wrapperCol:{span:8}//指定右侧包裹的宽度
        }
        const title=(
            <span>
                <LinkButton >
                    <ArrowLeftOutlined onClick={()=>{this.props.history.goBack()}} style={{marginRight:10,color:"#1890ff",fontSize:20}} /> 
                </LinkButton>
                <span>{isUpdate?"修改商品":"添加商品"}</span>
            </span>
        )
        return (
            <Card title={title}>
                <Form {...layout} onFinish={onFinish}>
                    <Item name="name" label="商品名称：" initialValue={name} rules={[{ required: true,message:"必须输入商品名称" }]}>
                        <Input placeholder="请输入商品名称"></Input>
                    </Item>
                    <Item name="desc" label="商品描述：" initialValue={desc} rules={[{ required: true ,message:"必须输入商品描述" }]}>
                        <TextArea placeholder="请输入商品描述" autoSize={{minRows:2,maxRows:6}}></TextArea>
                    </Item>
                    <Item name="price" label="商品价格：" initialValue={price} rules={[{validator:validatePrice},{required:true,message:"必须输入商品价格"}]}>
                        <Input type="number" placeholder="请输入商品价格" addonAfter="元"></Input>
                    </Item>
                    <Item label="商品分类" name="categoryIds" initialValue={categoryIds} rules={[{required:true,message:"必须选择商品分类"}]}>
                        <Cascader
                            placeholder="请指定商品分类"
                            options={options}/**需要显示的列表数组 */
                            loadData={loadData}/**当选择某个列表项，加载下一个列表的监听回调 */
                        ></Cascader>
                    </Item>
                    <Item label="商品图片" name="imgs">
                        <PicturesWall ref={this.pw} imgs={imgs}></PicturesWall>    
                    </Item>
                    <Item label="商品详情" labelCol={{span:2}} wrapperCol={{span:20}}>
                        <RichTextEditor ref={this.editor} detail={detail}></RichTextEditor>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" >提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
