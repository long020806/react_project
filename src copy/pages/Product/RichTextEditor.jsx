import React, { Component } from 'react'
import {EditorState,convertToRaw, ContentState} from "draft-js"
import {Editor} from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import PropTypes from "prop-types"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
export default class RichTextEditor extends Component {
    static propTypes = {
        detail:PropTypes.string,
    }
    constructor(props){
        super(props)
        const html = this.props.detail;
        if(html){
            const contentBlock = htmlToDraft(html);
            if(contentBlock){
                const contentState =ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState =EditorState.createWithContent(contentState);
                this.state = {editorState}
            }
        }else{
            this.state = {
                editorState:EditorState.createEmpty(),
            }
        }
        
        
    }
    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        });
    }
    getEditorContent = ()=>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    uploadImageCallback = (file)=>{
        return new Promise((reslove,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("POST","/api1/manage/img/upload");
            const data = new FormData();
            console.log(file);
            data.append("image",file);
            xhr.send();
            xhr.addEventListener("laod",()=>{
                const res = JSON.parse(xhr.responseText);
                reslove({data:{link:res.data.url}});
            })
            xhr.addEventListener("err",()=>{
                console.log("err")
                const err = JSON.parse(xhr.responseText);
                reject(err)
            })
        })
    }
    render() {
        const {editorState} = this.state;
        const {uploadImageCallback} = this;
        return (
            <Editor 
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorStyle={{border:"1px solid black",minHeight:200}}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image:{uploadCallback:uploadImageCallback,alt:{present:true,mandatory:true}}
                }}
                ></Editor>
                )
            }
            /* <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */
}
