## 1.文件结构
.
├── models 数据库文件
├── node_modules 依赖项
├── public 开放出来的公共文件 js/css/images文件 
├── views 前端页面 静态页面资源
├── app.js 启动入口文件 
├── package-lock.json npm产生的包说明文件（自动产生）
├── package.json 配置信息 
├── router.js 路由设计文件
└── README.md 项目说明文件
## 2.模板页

## 3.路由设计

| 路径 | 方法 | get参数 | post参数 | 是否需要登陆 | 备注 |

/register get 注册页面
/register post username.password  注册请求
/login get  登陆页面
/login post username.password 登陆请求
/logout get 退出请求

manager/home
manager/student
manager/teacher
manager/notice
manager/user
manager/repassword

student/home
student/score
student/repassword

teacher/home
teacher/score
student/repassword

## 使用
npm install 下载所有依赖项
localhost:3000/login 登录界面
