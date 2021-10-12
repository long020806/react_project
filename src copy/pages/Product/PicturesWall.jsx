import React, { Component } from 'react'
import { message, Upload } from 'antd'
import ImgCrop from 'antd-img-crop';
import { reqDeleteImg } from '../../api';
import PropTypes from "prop-types"
import { BASE_IMG_URL } from '../../utils/constant';
export default class PicturesWall extends Component {
    static propTypes = {
        imgs:PropTypes.array,
    }
    constructor(props){
        super(props);
        let fileList = [];
        //如果传入了imgs属性
        const {imgs} = this.props;
        if(imgs&&imgs.length>0){
           fileList =  imgs.map((item,index)=>({
               uid:-index,
               name:item,
               status:"done",
               url:BASE_IMG_URL + item,
           }))
        }
        //初始化状态
        this.state = {fileList}
    }
    onChange = async ({file,fileList}) => {
        //上传成功，将当前的file信息修正（name，url）
        if(file.status==="done"){
            const result = file.response;
            if(result.status===0){
                message.success("上传图片成功");
                const {name,url} = result.data;
                file = fileList[fileList.length-1];
                file.name = name;
                file.url = url; 
            }else{
                message.error("上传图片失败");
            }

        }else if(file.status==="removed"){//删除图片
            const result = await reqDeleteImg(file.name);
            if(result.status===0){
                message.success("删除图片成功！");
            }else{
                message.error("删除图片失败！")
            }
        }

        // 在（上传/删除）过程中更新状态
        this.setState({fileList});
    };
    onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    /**
     * 
     * 获取所有已上传的图片文件名
     */
    getImgs = ()=>{
        return this.state.fileList.map(item=>item.name)
    }
    render() {
        const { onPreview, onChange } = this;
        const { fileList } = this.state;
        return (
            <ImgCrop rotate>
                <Upload
                    action="/api1/manage/img/upload"
                    accept="image/*"
                    listType="picture-card"
                    name="image"
                    fileList={fileList}//所有已上传的图片列表
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </ImgCrop>


        )
    }
}
