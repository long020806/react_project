const {override,fixBabelImports} = require("cutomize-cra");
module.exports = override(
    //针对antd按需打包，针对import打包
    //使用babel-plugin-import
    fixBabelImports("import",{
        libary:"antd",
        libaryDirectory:"es",
        style:"css"
    })
)