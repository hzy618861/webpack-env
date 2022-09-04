const fs = require('fs')
const path = require('path')
function parseEnv(fileContent){
    let obj = {}
    const m = fileContent.split('\n')
    m.forEach(item=>{
         const arr = item.split('=')
         if(arr[0].trim()){
            obj[arr[0].trim()] = arr[1].trim()
         }
    })
    //将 a = 1解析为 {a:1}
    return obj
}
class MyPlugin {
    constructor(options){
        //接受参数
       this.options = options
    }
    apply(compiler,obj) {
        console.log('webpack-env-plugin 启动....')
        console.log(obj)
        const envKey = this.options.env || 'NODE_ENV'  //默认解析process.env.NODE_ENV判断当前环境
        const envPath = this.options.envPath || ''
        const env = process.env[envKey] || '' 
        const fileContent = fs.readFileSync(path.resolve(process.cwd(),envPath,`./${env}.env`),'utf-8')  //没有配置环境默认读取.env文件作为变量参数
        //emit钩子的执行时机是：输出打包好的资源文件 asset 到 output 目录之前执行。
        compiler.hooks.emit.tap('MyPlugin', (compilation) => {
            // 读取名称为 fileName 的输出资源
            const assets = compilation.assets
            for(let key in assets){
                 const fileType = this.options.test || /\.(ts(x)?|js(x)?)$/
                 if(fileType.test(key)){
                    const obj = parseEnv(fileContent)
                    const length = Object.keys(obj).length 
                    console.log('length:',length)
                    if(length>0){
                        Object.keys(obj).forEach(k=>{
                            const reg = new RegExp('process.env.'+k,'g') // {TEST_B = 'hzy-b'}   匹配process.env.TEST_B 替换为对应值
                            const contents = assets[key].source().replace(reg,obj[k])
                            assets[key] = {
                                source: () => contents, // 新的内容
                                size: () => contents.length // 内容的大小，webpack必须的方法
                            }
                        })
                    }
                 }
            }
          });
    }
}

module.exports = MyPlugin