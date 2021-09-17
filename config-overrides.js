const {override,fixBabelImports} = require("cutomize-cra");
module.exports = override(
    fixBabelImports("import",{
        libary:"antd",
        libaryDirectory:"es",
        style:"css"
    })
)