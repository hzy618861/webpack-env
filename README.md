## 前端项目注入环境变量

### 效果
- 根据项目中配置的.env文件，向项目中注入对应环境变量
  

```
├── local.env
└── test.env
```

env文件内容形式如下
```
BASE_URL = 'http://local.com'
KEY = 'test'
```

配置完插件在项目中可以通过process.env.BASE_URL访问对应值

### 使用方式

1. `npm i @released/webpack-env-plugin`

2. webpack配置文件中引入插件并注册
```js
const envPlugin = require('@released/webpack-env-plugin');
...
plugins:[
  new envPlugin({
        test: /\.(ts(x)?|js(x)?)$/, //默认值，配置对哪些文件进行生效
        envPath: './env/',  //指定env文件所在位置
        env: 'NODE_ENV',     //默认解析process.env.NODE_ENV判断当前环境 ，根据不同环境加载不同环境变量,当需要通过其他值判断当前环境，可以在此修改
  }) 
]

```

### 注意
- process.env.NODE_ENV 值决定去加载哪个env文件
- 如：process.env.NODE_ENV = 'local' 就会去加载指定目录下的local.env