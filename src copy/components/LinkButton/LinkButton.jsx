import React from 'react'
import { Button } from "antd"
import "./index.less"
/**
 * 外形想连接的按钮
 * @returns 
 */
export default function LinkButton(props) {
    return (
        <Button {...props} className="link-button"></Button>
    )
}
