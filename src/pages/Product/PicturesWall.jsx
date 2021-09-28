import React, { Component } from 'react'
import { Upload, Modal } from 'antd'
import ImgCrop from 'antd-img-crop';
export default class PicturesWall extends Component {
    state = {
        fileList: [{
            uid: '-1',//file 唯一标识符
            name: 'image.png',//file名字
            status: 'done',//图片状态done已上传的文件 uploading上传中，removed：已删除
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',//图片地址
        }]
    }
    onChange = ({ fileList: newFileList }) => {
        this.setState(newFileList);
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
