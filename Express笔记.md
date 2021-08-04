##   Express

本身是极简的，仅仅提供了web开发的基础功能，但是它通过中间件的方式集成了许许多多的尾部插件来处理HTTP请求

body-parser:  解析HTTP请求体

compression：压缩HTTP响应

cookie-parser：解析cookie数据

cors：处理跨域资源请求

morgan：HTTP请求日志记录

Express不对Node.js已有的特性进行二次抽象，只是在它之上扩展了web应用所需的基本功能

内部使用的还是http模块

请求对象继承自http.IncomingMessage

响应对象继承自http.ServerResponse

## Express特性

简单易学

丰富的基础API支持，以及常用的HTTP辅助程序，例如重定向、缓存等

强大的路由功能

灵活的中间件

高性能

非常稳定（它的源代码几乎百分百的测试覆盖率）

视图系统支持14个以上的主流模板引擎

## Express发展历史

Express.js由TJ Holowaychuk创立，首次发行版本0.12.0，依据Express.js的GitHub仓库，是在2010年5月22日

在2014年6月，StrongLoop获得了项目的管理权，StrongLoop在2015年9月份被IBM并购。在2016年1月，IBM宣布将Express.js置于Node.js基金会孵化器的管理之下

目前最新稳定版为4.17.1

## Express应用场景

传统的Web网站

​	Ghost

接口服务

服务端渲染中间层

开发工具

​	JSON Server

​	webpack-dev-server

## Express相关链接

Express官网

Express GitHub仓库

Express 中文文档（非官方）

Awesome Express

## Hello Wrold

```
const express = require("express");
const app = express()
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.listen("8080", () => {
    console.log("server is started in http://localhost:8080");
})
```

## 路由基础

路由是指确定应用程序如何响应客户端对特定端点的请求，该特定端点是URI(或者路径)和特定的HTTP请求方法(GET, POST等)

每个路由可以具有一个或者多个处理程序函数，这些函数在配置该路由时执行。

路由的定义采用以下结构

```
app.METHOD(PATH, HANDLER)
```

app是Express实例

METHOD是小写的HTTP请求方法

PATH是服务器上的路径

HANDLER是当路由匹配是执行的功能

下面是一些简单示例

在根路径响应Hello Wrold!:

```
app.get("/", function(req, res){
	res.send("Hello World!");
})
```

在根路由响应POST请求

```
app.post("/", function(req, res){
	res.send("Get a POST request")
})
```

响应对 /user 路径的 PUT 请求

```
app.put("/user", function(req, res){
	res.send("Get a PUT request at /user")
})
```

响应对 /user 路由的DELETE请求

```
app.delete("/user", () => {
	res.send("delete user");
})
```

请求和响应

Express应用使用路由回调函数的参数request和response对象来处理请求和响应的数据

```
app.get("/", function(req, res){
	//...
})
```

Express不对Node.js已有的特性进行二次抽象，只是在它之上扩展了web应用所需的基本功能。

内部使用的还是http模块

请对象继承自

htpp.IncomingMessage

响应对象继承自

http.ServerResponse

Express扩展了HTTP模块中的请求和响应对象

## 请求对象

req对象代表HTTP请求，并具有请求查询字符串，参数，正文，HTTP表头等属性。在文本文档中，按照约定，该对象始终成为req（HTTP响应为res），但其实际名称由你正在使用的回调函数的参数确定

| 属性        |          |
| ----------- | -------- |
| req.url     | 请求地址 |
| req.method  | 请求方法 |
| req.headers | 请求头   |
| req.query   | 请求参数 |

## 响应对象

res队形表示Express应用在收到HTTP请求时发送的HTTP响应

在本文档中，按照约定，该对象始终成为res(并且HTTP请求为 req)，但是其实际的名称由你正在使用的回调函数的参数确定

属性

| 属性            |      |
| --------------- | ---- |
| res.app         |      |
| res.headersSent |      |
| res.locals      |      |

```
//node原生设置响应状态码
res.statusCode = 201
res.end() //结束响应

//node原生返回多段文本
res.write("a");
res.write("b");
res.write("c");
res.write("d");
res.end()

//node原生结束响应并发送数据
res.end("abc");

//Express发送数据
res.send("Hello World");

res.send({foo: "bar"});

res.status(201).send("ok")

res.cookie("foo", "bar");
res.send();

```

## 基础案例---路由设计

通过该案例创建一个简单的CRUD接口服务，从而掌握Express的基本用法

需求：实现对任务清单的CRUD接口服务

查询列表

GET  /todos

根据ID查询单个任务

GET /todos/:id

添加任务

POST  /todos

修改任务

PATCH /todos/:id

删除任务

DELETE /todos/:id

```
const express = require("express");
const app = express();
app.get("/todos", (req, res) => {
    res.send("get /todos");
})
app.get("/todos/:id", (req, res) => {
    res.send(`get /todos/:id ${req.params.id}`);
})
app.post("/todos", (req, res) => {
    res.send("post /todos");
})
app.patch("/todos/:id", (req, res) => {
    res.send("patch /todos");
})
app.delete("/todos/:id", (req, res) => {
    res.send("delete /todos");
})
app.listen(8080, () => {
    console.log("server runing at http://localhost:8080/")
})
```

## 基础案例---获取任务列表

```
data.json
{
    "tobos": [
        {
            "id": 1,
            "title": "吃饭"
        },
        {
            "id": 2,
            "title": "睡觉"
        },
        {
            "id": 3,
            "title": "写代码"
        }
    ],
    "users": []
}

app.js
const express = require("express");
const app = express();
const fs = require("fs");
app.get("/todos", (req, res) => {
    fs.readFile("./data.json", "utf-8", (err, data) => {
        if(err){
            return res.status(500).json({
                error: err.message
            })
        }
        const db = JSON.parse(data);
        res.status(200).json(db.tobos)
    })
})
app.listen(8080, () => {
    console.log("server runing at http://localhost:8080/")
})
```

## 基础案例---根据ID获取单个任务

```
const express = require("express");
const app = express();
const fs = require("fs");
app.get("/todos/:id", (req, res) => {
    fs.readFile("./data.json", "utf-8", (err, data) => {
        if(err){
            return res.status(500).json({
                error: err.message
            })
        }
        const db = JSON.parse(data);
        const target = db.tobos.find(todo => todo.id === Number(req.params.id));
        if(!target){
            return res.status(404).end()
        }
        res.status(200).json(target)
    })
})
app.listen(8080, () => {
    console.log("server runing at http://localhost:8080/")
})
```

基础案例---分装DB模块

```
db.js

const fs = require("fs");
const { promisify } = require("util");
const path = require("path")
const readFile = promisify(fs.readFile);

const dbPath = path.join(__dirname, "./data.json")
exports.getDB = async () => {
    const data = await readFile(dbPath, "utf-8");
    return JSON.parse(data);
}

app.js

const express = require("express");
const app = express();
const { getDB } = require("./db");
app.get("/todos", async (req, res) => {
    try {
        const db = await getDB();
        res.status(200).json(db.tobos)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
app.get("/todos/:id", async (req, res) => {
    try {
        const db = await getDB();
        const target = db.tobos.find(todo => todo.id === Number(req.params.id));
        if(!target){
            return res.status(404).end()
        }
        res.status(200).json(target)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
app.listen("8080", () => {
    console.log("server is started in http://localhost:8080");
})
```

基础案例---添加任务

```
db.js

const fs = require("fs");
const { promisify } = require("util");
const path = require("path")
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dbPath = path.join(__dirname, "./data.json")
exports.getDB = async () => {
    const data = await readFile(dbPath, "utf-8");
    return JSON.parse(data);
}
exports.saveDB = async (db) => {
    const data = JSON.stringify(db, null, "  ");  //有回车换行 使用两个 空格 进行缩进
    await writeFile(dbPath, data)
}

app.js

const express = require("express");
const { getDB, saveDB } = require("./db");
const app = express();
//配置解析表单请求体：application/json 的数据  通过req.body获取
app.use(express.json());  
//配置解析表单请求体：application/x-www-form-urlencoded 的数据  通过req.body获取
app.use(express.urlencoded())
app.post("/todos", async (req, res) => {
    try {
        //1、获取客户端的请求参数
        const todo = req.body;
        //2、数据验证
        if(!todo.title){
            return res.status(422).json({
                error: "The field title is required"
            })
        }
        //3、数据验证通过，把数据存储到DB中
        const db = await getDB();
        const lastTodo = db.todos[db.todos.length - 1]
        todo.id = lastTodo ? lastTodo.id + 1 : 1
        db.todos.push({
            id: todo.id,
            title: todo.title
        })
        await saveDB(db)
        //4、发送成功的响应
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
app.listen("8080", () => {
    console.log("server is started in http://localhost:8080");
})

```

## 基础案例---删除任务

```
const express = require("express");
const { getDB, saveDB } = require("./db");
const app = express();
//配置解析表单请求体：application/json 的数据  通过req.body获取
app.use(express.json());  
//配置解析表单请求体：application/x-www-form-urlencoded 的数据  通过req.body获取
app.use(express.urlencoded());
app.delete("/todos/:id", async (req, res) => {
    try {
        const todoId = Number(req.params.id);
        const db = await getDB();
        const index = db.todos.findIndex(todo => todo.id === todoId);
        if(index === -1){
            return res.status(404).end();
        }
        const target = db.todos.splice(index, 1);
        await saveDB(db)
        res.status(204).end() 
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
app.listen("8080", () => {
    console.log("server is started in http://localhost:8080");
})
```

## 基础案例总结

## Express中间件

### 示例引入 

```
const express = require("express");
const app = express();

//中间件的顺序很重要
//req 请求对象
//res 响应对象
//next 下一个中间件
app.use((res, req, next) => {
    console.log(res.method, res.url, Date.now());
    //交出执行权，往后继续匹配执行
    next();
})
//路由其实也是中间件
app.get("/", (req, res) => {
    res.send("get /")
})
app.get("/about", (req, res) => {
    res.send("get /about")
})
app.post("/login", (req, res) => {
    res.send("post /login")
})
app.listen("8080", () => {
    console.log("server is started in http://localhost:8080");
})
```

### 概念解析

Express的最大特色，也是最重要的一个设计，就是中间件，一个Express应用，就是由许多多的中间件来完成的

为了理解中间件，我们先来看一下我们现在生活中的自来水厂的净水流程 

取水口-->加絮凝剂-->反应沉淀池-->过滤池-->活性炭吸附池-->清水池-->配水泵-->用户

自来水厂从获取水源到净化处理交给用户，中间经历了一些列的处理环境，我们称其中的每个处理环节就是一个中间件。这样做的目的既提高了生产产效率也保证了可维护性

Express中间件和AOP面向切面编程就是一个意思，就是都需要经过一些步骤，不去修改自己的代码，以此扩展或者处理一些功能。

什么是AOP?中文意思是面向切面编程，听起来感觉很模糊，先举个生产的例子

农场的水果包装流水线一开始只有 采摘 -- 清洗 -- 贴标签

为了提高销量，想加两道工序 分类 和包装 但又不能干扰原有的流程，同时如果没有增加收益可以随时撤销新增工序

采摘 -- 分类 -- 清洗 -- 包装 -- 贴标签

在流水线中的空隙插入两个工人去处理，形成新流程，而且工人随时可以撤回

AOP 面向切面编程：

将日志记录，性能统计，安全控制，事物处理，异常处理等代码从业务逻辑代码中划分出来，通过对这些行为的分离，我们希望可以将它们独立到非指导业务逻辑的方法中，进而改变这些行为的时候不影响业务逻辑代码 

利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各个部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率和可维护性。

日志记录 --- 性能统计 --- 用户鉴权 --- 安全控制 --- 业务处理 --- 发送请求

总结：就是在现有代码程序中，在程序生命周期或者横向流程中 加入/减去 一个或多个功能，不影响原有功能

### Express中的中间件

在Express中，中间件就是一个可以访问请求对象、响应对象和调用next方法的一个函数

```
app.get("/", function(req, res, next){
	next();
}) 
```

在中间件函数中可以执行以下任何任务

执行任何代码

修改request或者response响应对象

结束请求响应周期

调用下一个中间件

注意：如果当前的中间件功能没有结束请求-响应周期，则必须调用next() 将控制权传递给下一个中间件功能，否则，该请求将被挂起

```
在整个中间件的处理流程当中，同一个请求所有中间件共享同一个req ， res对象
app.use((req, res, next) => {
	req.foo = "bar";
	res.abc = () => {
		console.log("abc")
	}
	next();
})
app.get("/", (req, res, next) => {
	console.log(req.foo);
	res.abc();
	res.send("get /");
})

注意：中间件的执行顺序从上往下，所以上面的app.use必须放在app.get前面

app.use(express.json())
app.use(express.urlencode())
这两个中间件解析完请求体后，往req对象上挂载了一个body属性

function fun(arg){
	return (req, res, next) => {
		next();
	}
}
app.use(fun("abc"));
通过这种方式可以对中间件进行传参数
```

## Express中间件分类

在Express中应用程序可以使用以下类型的中间件：

应用程序级别中间件

路由级别中间件

错误级别中间件

内置中间件

第三方中间件

### 应用程序级别中间件

不关心请求路径：

```
const express = require("express");
const app = express();
app.use(function(req, res, next){
	console.log("time", Date.now())
	next();
})
```

限定请求路径：

```
app.use("/user/:id", function(req, res, next){
	console.log("Request Type:", req.method);
	next();
})
```

限定请求方法 + 请求路径

```
app.get("/user/:id", function(req, res, next){
	res.send("USER")
})
```

 多个处理函数：

```
app.use("/user/:id", function(req, res, next){
	console.log("Request URL:", req.originalUrl);
	//下一个处理函数
	next()
}, function(req, res, next){
	console.log("Request Type:", req.method);
	//这个next 会脱离当前的处理栈，往后查找匹配调用
	next();
})
```

为同一个路径定义多个处理中间件

```
app.get("/user/:id", funciton(req, res, next){
	console.log("ID", req.params.id);
	next()
}, function(req, res, next){
	res.send("User info");
	next()
})
app.get("/user/:id", funciton(req, res, next){
	console.log(123);
})
```

要从路由中间件堆栈中跳过其余中间件功能，请调用next("route")，将控制权传给下一条路由

注意：next("route")仅在使用app.METHOD( ) 或 router.METHOD( ) 函数加载的中间件函数中有效

此示例显示了一个中间件子堆栈，该子堆栈处理对 /user/:id 路径的GET请求

```
app.get("/user/:id", function(req, res, next){
	if(req.params.id === "0") next("route")
	else next()
}, function(req, res, next){
	res.send("regular")
})
app.get("/user/:id", funciton(req, res, next){
	res.send("special")
})

/user/0    ---> special
/user/1.   ---> regular
```

中间件也可以在数组中声明为可重用。此示例显示了一个带有中间件子堆栈的数组，该子堆栈处理对 /user/:id 路由的GET请求

```
function logOriginalUrl(req, res, next){
	console.log("Request URL", req.originalUrl);
	next();
}
function logMethid(req, res, next){
	console.log("Request Type", req.method);
	next();
}
let logStuff = [logOriginalUrl, logMethid]
app.get("/user/:id", logStuff, funciton(req, res, next){
	res.send("user Info")
})
```

### 路由器级中间件

路由器级中间件与应用级中间件的工作方式相同，只不过它绑定到的实例express.Router()

```
let router = express.Router()
```

使用router.use( )和router.METHOD( )函数加载路由级中间件

以下示例代码通过使用路由器级中间件来复制上面显示的用于应用级中间件的中间件系统

```
router.js
//路由模块
const express = require("express");

//1、创建路由实例
//路由实例子其实就是一个mini Express 实例
const router = express.Router();

//2、配置路由
router.get("/foo", (req, res) => {
    res.send("get /foo");
})
router.post("/foo", (req, res) => {
    res.send("post /foo");
})

//3、导出路由实例
module.exports = router;
//4、将路由挂载集成到Express 实例应用中

app.js
const express = require("express");
const app = express();
const router = require("./router");
app.use(express.json());
app.use(express.urlencoded());

//挂载路由 
app.use(router);

//给路由限定访问前缀
app.use("/abc", router);

app.listen("8080", () => {
    console.log("server is started in http://localhost:8080");
})
```

### 错误处理中间件

以与其他中间件函数相同的方式定义错误处理中间件函数，除了使用四个参数而不是三个参数（特别是使用签名（err, req, res, next））之外：

```
app.use(funciton(err, req, res, next){
	console.error(err.stack)
	res.status(500).send("Something broker!");
})
```

错误处理中间件始终带有四个参数。你必须提供四个参数以将其标识为错误处理中间件函数。即使不需要使用该next对象，也必须指定它以维护签名。否则，该对象将被解释为常规中间件，并且无法处理错误。

如果将任何内容传递给该next( )函数（字符串除外"route"）,express都会将当前请求视为错误，并且将跳过所有剩余的非错误处理路由和中间件函数。

//next( )  执行中间件堆栈中的下一个

//next("route") 脱离中间件堆栈，执行下一个匹配的路由   （仅在app.METHOD或router.METHOD中使用）

//next(任意数据)  跳过所有剩余无错误处理路由和中间件函数

在所有的中间件之后挂载错误处理

```
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("get /")
})
app.get("/about", (req, res, next) => {
    try{
    	
    }catch(err){
    	next(err);
    }
})

//在所有的中间件之后挂载错误处理
app.use(funciton(err, req, res, next){
	console.log("错误", err);
	res.status(500).json({
		error: err.message
	});
})

app.listen("8080", () => {
    console.log("server is started in http://localhost:8080");
})
```

## Express路由

路由是指应用程序的端点（URL）如何响应客户端请求。

你可以使用app与HTTP方法相对应地Express对象的方法来定义路由。例如，app.get( ) 处理GET请求和app.post POST请求。有关完整列表，请参见API文档 app.METHOD。你还可以使用app.all( ) 处理所有HTTP方法，并使用app.use( )将中间件指定为回调函数

这些路由方法指定在应用程序收到对指定路由（端点）和HTTP方法的请求时调用的回调函数（有时称为“处理函数”）。换句话说，应用程序“侦听”与指定的路由和方法匹配的请求，并且当它检查到匹配项时，它将调用指定的回调函数。

实际上，路由方法可以具有多个回调函数作为参数，对于多个回调函数，重要的是提供next回调函数的参数，然后next（）在函数体内调用以将控制权转交个下一个回调。

以下代码是一个非常基本的路由示例

```
const express = require("express");
const app = express();
app.get("/", funciton(req, res){
	res.send("hello world")
})
```

### 路由方法

路由方法是从HTTP方法之中派生的，并附加到express该类的实例。

以下代码是为GET和POST方法定义的到应用根目录的路由的示例。 

```
app.get("/", function(req, res){
	res.send("GET request to homepage");
})
app.post("/", funciton(req, res){
	res.send("POST request to the homepage")
})
```

Express支持与所有HTTP请求方法相对应的方法： get，post等。

有一种特殊的路由方法，app.all( ) 用于于所有HTTP请求方法的路径加载中间件功能。例如，无论使用GET，POST，PUT，DELETE还是http模块支持的任何其他HTTP请求方法，都会对路由 /secret 的请求执行以下

```
app.all("/secret", funciton(req, res, next){
	console.log("Accessing the secret section ...");
	next(); 
})
```

###   路由路径

路由路径与请求方法结合，定义了可以进行请求的端点。路由路径可以是字符串，字符串模式或者正则表达式的对应的子集。字符?，+，*，和( )是他们的正则表达式的对应的子集。连字符 ( - ) 和点 ( . )由基于字符串的路径按字面意义进行解释。如果你需要$在路径字符串中使用美元符号 ( ) ,请将其转译([并方在括号中 ])，例如，“/data/$book”处于请求的路径字符串将为

```
"/data/([\$])book"
```

Express使用的path-to-regexp来匹配路由路径；有关 定义路由路径的所有可能性，请参见正则路径文档。Express Router Tester尽管不支持模式匹配，但却是用于测试基本Express路由的便捷工具。

查询字符串不是路由路径的一部分

以下是一些基于字符串的路由示例。

此路由会将请求匹配到根路由 / 。

```
app.get("/", funciton(req, res){
	res.send("root");
})
```

此路由路径会将请求匹配到 /about

```
app.get("/about", funciton(req, res){
	res.send("about");
})
```

此路径会将请求匹配到 /random.text

```
app.get("/random.text", funciton(req, res){
	res.send("random.text");
})
```

以下是一些基于字符串模式的路由路径示例

此路由路径将与acd和匹配abcd

```
app.get("/ab?cd", funciton(req, res){
	res.send("ab?cd");
})
```

这条路由的路径将会匹配abcd，abbcd，abbbcd, ...  等等

```
app.get("/ab+cd", funciton(req, res){
	res.send("ab+cd");
})
```

这条路由的路径将匹配 abcd，abxcd，abRANDOMcd，ab123cd

```
app.get("/ab*cd", funciton(req, res){
	res.send("ab*cd");
})
```

此路由路径将与 /abe 和匹配 /abcde

```
app.get("/ab(cd)?e", funciton(req, res){
	res.send("ab(cd)?e);
})
```

基于正则表达式的路由路径示例：

此路径将匹配其中带由 a 的任何内容

```
app.get(/a/, funciton(req, res){
	res.send("/a/")
})
```

这条路由的路径将匹配butterfly和dragonfly，但不匹配butterflyman，dragonflyman等

```
app.get(/.*fly$/, function(req, res){
	res.send("/.*fly$/")
})
```

### 路径参数

路由参数被命名为URL段，用于捕获URL中在其位置处指定的值。捕获的值将填充到req.params对像中，并将路径中指定的route参数的名称作为其各自的键

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: {"userId": "34", "bookId": "8989"}
```

要使用路由参数定义路由，只需在路由路径只能够指定路由参数，如下所示。

```
app.get("/users/:userId/books/:bookId", function(req, res){
	consoe.log(req.params)
})
```

路径参数的名称必须由“文字字符”（[A-Za-z0-9]）组成。由于连字符（-）和（.）是按字面解释的，因此可以将它们与路由参数一起使用，以实现有用的目的

```
Route path: /flights/:form-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: {"from":"LAX", "to": "SFO"}

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Parunus.persica
req.params: {"genus": "Parunus", "species": "persica"}
```

要更好第控制可以由route参数匹配的确切字符串，可以在括号（（））后面附加一个正则表达式： 

```
Route path: /user/:userId(\\d+)
Reqyest URl: http://localhost:3000/user/42
req.params: {"userId": "42"}

要求userId必须是数字 
```

由于正则表达式通常是文字字符串的一部分，因此请确保 \ 使用其他反斜杠对所有字符进行转义，例如 \\d+

在Express4.x中，不以常规方式解释正则表达式中的*字符。解决方式是，使用{0,}代替 *。这可能会在Express 5中修复

路由处理程序

你可以提供行为类似于中间件的多个回调函数来处理请求。唯一的例外是这些回调可能会调用next("route")，绕过其余的路径回调。你可以使用此机制在路由上施加先决条件，然后在没有理由继续使用当前路由的情况下将控制权传递给后续路由。

路由处理程序可以采用函数，函数数组。或者二者组合的形式。如以下示例所示。单个回调函数可以处理路由。例如：

```
app.get("/example/a", function(){
	res.send("Hello from A!")
})
```

多个回调函数可以处理一条路由（请确保指定了next对象）。例如

```
app.get("/example/b", funciton(req, res, next){
	console.log("the respomse will be sent by the next function");
	next();
}, funciton(req, res){
	res.send("Hello from B")
})
```

回调函数数组可以处理路由。例如：

```
var cb0 = function(req, res, next){
	console.log("CB0");
	next();
}
var cb1 = funciton(req, res, next){
	console.log("CB1");
	next();
}
var cb2 = function(req, res, next){
	res.send("Hello from c");
}
app.get("/example/c", [cb0, cb1, cb2]);
```

独立功能和功能数组的组合可以处理路由。例如：

```
var cb0 = function(req, res, next){
	console.log("CB0");
	next();
}
var cb1 = funciton(req, res, next){
	console.log("CB1");
	next();
}
app.get("/example/c", [cb0, cb1], funciton(){
	res.send("Hello from c");
});
```

### 对应的方法

res下表响应对象 （） 上的方法可以将响应发送到客户端，并终止请求-响应周期，如果没有从路径处理程序调用这些方法，则客户端请求将被挂起。

| 方法             | 描述                                               |
| ---------------- | -------------------------------------------------- |
| res.download()   | 提示要下载文件                                     |
| res.end()        | 结束响应过程                                       |
| Res.json()       | 发送JSON响应                                       |
| res.jsonp()      | 发送JSONP支持JSON响应                              |
| res.redirect()   | 重定向请求                                         |
| res.render()     | 渲染实图模版                                       |
| res.send()       | 发送各种类型的响应                                 |
| res.sendFile()   | 将文件作为八位字节流发送                           |
| res.sendStatus() | 设置响应状态码，并将其字符串表示形式发送为响应正文 |

### app.route()

你可以使用来为路由创建可连接的路由处理程序app.route()。由于路径是在单个位置指定的，因此创建模块化路由非常有帮助，减少冗余和错别字也很有帮助。关于路由更多的信息参见 Router文档

这是使用定义的链式路由处理程序的示例

```
app.route("/book")
	.get(function(req, res){
		res.send("get a random book");
	})
	.post(funciton(req, res){
		res.send("Add a book");
	})
	.put(function(req, res){
		res.send("update the book");
	})
```

### 快速路由器

使用express.Router该类创建模块化的，可安装的路由处理程序。一个Router实例是一个完整的中间件和路由系统；因此，它通常被称为迷你应用程序。

以下示例将路由器创建为模块，在其中加载中间件功能，定义一些路由，在其中加载中间件功能，定义一些路由，并将路由器模块安装在主应用程序的路径上。

birds.js在app目录中创建一个名为以下内容的路由器文件：

```
const express = require("express");
const router = express.Router();
router.use(function timeLog(req, res, next){
	console.log("time", Date.now());
	next()
})
router.get("/", funciton(req, res){
	res.send("Birds home page");
})
router.get("/about", function(req, res){
	res.send("About birds");
})
module.exports = router
```

然后，在应用程序中加载路由器模块

```
const birds = require("./birds");
app.use("/birds", birds);
```

该应用程序现在将能够处理对 /birds 请求和 /birds/about，以及调用timeLog特定于该路由的中间件功能

## 综合案例：使用Express开发接口服务

### RESTful接口设计规范

#### 协议

API与用户的通信协议，尽量使用HTTPS协议

#### 域名

应该尽量将API部署在专用域名之下

```
https://api.example.com
```

如果确定API很简单，不会有进一步扩展，可以考虑在主域名下

```
https://example.org/api
```

#### 版本

应该将API的版本好放入URL

```
https://api.example.com/v1
```

另一种方法是。将版本号放在HTTP头信息中，但不如放在URL方便和直观

GitHub采用这种做法

#### 路径

路径又称“终点”（endpoint），表示API的具体网址。

在RESTful框架中，每个网址代表一种资源（resource），所以网址中不有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的“集合”（collection），所以API中的名词也应该使用复数。

举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径要应该设计成下面这样

```
https://api.example.com/v1/zoos
https://api.example.com/v1/animals
https://api.example.com/v1/employees
```

HTTP动词

对于资源的具体操作类型，由于HTTP动词表示。

常用的HTTP动词有下面五个（括号里是对应的SQL命令）。

GET（读取）：从服务器取出资源（一项或多项）

PSOT（创建）：在服务器新建一个资源。

PUT（完整更新）：在服务器更新资源（客户段提供改变后的完成资源）。

PATCH（部分更新）：在服务器更新资源（客户端提供改变的属性）。

DELETE（删除）：从服务器删除资源。

还有两个不常用的HTTP动词：

HEAD：获取取资源的元数据

OPTION：获取信息，关于资源的哪些属性是客户端可以改变的。

下面是一些例子

```
GET /zoos：列出所有动物园
POST /zoos：新建一个动物园
GET /zoos/ID：获取某个指定动物园的信息
PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
DELETE /zoos/ID：删除某个动物园
GET /zoos/ID/animals：列出某个指定动物园的所有动物
DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
```

#### 过滤信息

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果

下面是常用的参数

```
?limit=10：指定返回记录的数量
?offest=10：指定返回记录的开始位置
?page=2&per_apge=100：指定第几页，以及每页的记录数
?sortby=name&order=assc：指定返回结果按照哪个属性排序，以及排序顺序。
?animal_type_id=1：指定筛选条件
```

参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如

GET /zoo/ID/animals  与 GET /animals？zoo_id=ID的含义是相同的。

#### 状态码

客户端的每一次请求，服务器都必须给出回应。回应包括HTTP状态码和数据两部分。

HTTP状态码就是一个三位数，分为五个类别

```
1XX：相关信息
2XX：操作成功
3XX：从定向
4XX：客户端错误
5XX：服务器错误
```

这五类总共包含100多种状态码，覆盖了绝大部份可能遇到的情况。每一种状态都标准的（或者约定的）解释，客户端只需查看状态码，就可以 判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。

常见的有以下一些（方括号种是该状态码对应的HTTP动词）

200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。

201 CREATE - [POST/PUT/PATCH]：用户新建或者修改数据成功

202 Accepted - [*]：表示一个请求已经进入后台队列（异常步任务）

204 NO CONTENT - [DELETE]：用户删除数据成功

400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或者修改数据的操作，该操作是幂等的

401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）

403 Forbidden - [*]：表示用户得到授权（与401错误相对），但是访问是被禁止的

404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作也是幂等的

406 NOT Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但只有XML格式）。

410 Gone - [GET]：用户请求的资源被永久删除，且不会在得到的

422 Unprocesable entity - [POST/PUT/PATCH]当创建一个对象时，发生一个验证错误。

500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。 

#### 返回结果 

API返回的数据格式，不应该是纯文本，而应该是一个JSON对象，因为这样才能返回标准的结构化数据。所以，服务器回应的HTTP头的Content-Type属性要设为application/json。 

针对不同操作，服务器向用户返回的结果应该符合以下规范。

GET  /collection：返回资源对象的列表（数组）

GET /collection/resource：返回单 个资源对象

POST /collection：返回新生成的资源对象

PUT /collection/resource：返回完整的资源对象

PATCH /collection/resource：返回完整的资源对象

DELETE /collection/resource：返回一个空文档

#### 错误处理

有一种不恰当的做法是，即使发生错误，也返回200状态码，把错误信息放在数据体里面，就像下面这样

```
HTTP/1.1 200 OK
Content-Type：application/json
{
	"status": "failure",
	"data": {
		"error": "Expected at least tow items in list"
	}
}
```

上面代码中，解析数据体以后才能得知操作失败。

这种做法实际上取消了状态码，这是完全不可取的。正确的做法是，状态码反映发生的错误，具体的错误信息放在数据体里面返回。下面是一个例子。

```
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
	"error": "Invalid payoad.",
	"detail": {
		"surname": "This field is required."
	}
}
```

#### 身份认证

基于JWT的接口权限认证：

字段名：Authorization

字段值：Bearer token 数据

#### 跨域处理

可以在服务端设置CORS允许客户端跨域资源请求。

### 创建项目

```
mkdir reawlworld-api-express
cd reawlworld-api-express
npm init -y
npm i express
```

app.js

```
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})

执行
PORT=8000 nodemon app.js 或 nodemon app.js
```

### 目录结构

```
config                配置文件
   config.default.js  
contriller            用于解析用户的输入，处理后返回相应的结果
model                 数据持久层
middleware            用于编写中间件
router                用于配置URL路径
uril                  工具模块
app.js                用于自定义启动时的
```

配置常用中间件

```
解析请求体
express.json()
express.urlencoded()

日志输出
morgan()

为客户端提供跨域资源请求
cors()


app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
    res.send("Hello World")
})
app.post("/", (req, res) => {
    console.log(req.body)
    res.send("post /");
})
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})
```

### 路由设计

```
router/user.js------------
const express = require("express");
const router = express.Router();
//用户登陆
router.post("/users/login", async (req, res, next) => {
    try {
        //处理请求
        res.send(`post /users/login`);
    } catch (error) {
        next(error)
    }
})
//用户注册
router.post("/users", async (req, res, next) => {
    try {
        //处理请求
        res.send(`post /users`);
    } catch (error) {
        next(error)
    }
})
//获取当前登陆用户
router.get("/user", async (req, res, next) => {
    try {
        //处理请求
        res.send(`get /user`);
    } catch (error) {
        next(error)
    }
})
//更新当前登陆用户
router.put("/user", async (req, res, next) => {
    try {
        //处理请求
        res.send(`put /user`);
    } catch (error) {
        next(error)
    }
})

module.exports = router

/router/profile.js ---------------------------
const express = require("express");
const router = express.Router();
//获取指定用户资料
router.get("/:username", async (req, res, next) => {
    try {
        //处理请求
        res.send(`get /:username`);
    } catch (error) {
        next(error)
    }
})
//关注用户
router.post("/:username/follow", async (req, res, next) => {
    try {
        //处理请求
        res.send(`post /:username/follow`);
    } catch (error) {
        next(error)
    }
})
//取消关注用户
router.delete("/:username/follow", async (req, res, next) => {
    try {
        //处理请求
        res.send(`delete /:username/follow`);
    } catch (error) {
        next(error)
    }
})
module.exports = router

/router/index.js ------------------
const express = require("express");
const router = express.Router();

//用户相关
router.use(require("./user")); 
//用户资料相关
router.use("/profile", require("./profile"));

module.exports = router;

app.js -----------------------
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.use("/api", router)


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})
```

### 提取控制器模块

将路由处理函数集中到一个模块中

```
---------------------------
/controller/user.js
//用户登陆
exports.login = async (req, res, next) => {
    try {
        //处理请求
        res.send(`post /users/login`);
    } catch (error) {
        next(error)
    }
}
//用户注册
exports.register = async (req, res, next) => {
    try {
        //处理请求
        res.send(`post /users`);
    } catch (error) {
        next(error)
    }
}
//获取当前登陆用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        //处理请求
        res.send(`get /user`);
    } catch (error) {
        next(error)
    }
}
//更新当前登陆用户
exports.updateCurrentUser = async (req, res, next) => {
    try {
        //处理请求
        res.send(`put /user`);
    } catch (error) {
        next(error)
    }
}
---------------------------
/router/user.js
const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user")
//用户登陆
router.post("/users/login", userCtrl.login);
//用户注册
router.post("/users", userCtrl.register);
//获取当前登陆用户
router.get("/user", userCtrl.getCurrentUser)
//更新当前登陆用户
router.put("/user", userCtrl.updateCurrentUser)

module.exports = router
```

### 配置统一错误处理中间件

 

```
-------------------------------
/middleware/error-handler.js
const util = require("util");
module.exports = () => {
    return (err, req, res, next) => {
        res.status(500).json({
            error: util.format(err)
        })
    }
}
------------------------------
app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handler")
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

//挂载路由
app.use("/api", router);

//挂载统一处理服务端错误中间件
app.use(errorHandler());


const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})
```

### 在Postman中统一管理测试接口

在Collection中创建新的Collection

创建user目录

创建request

创建环境变量

dev                 base_url  localhost:8080/api

product         base_url  .........

在request使用

{{base_url}}/user

### 用户注册-将数据保存到数据库中

安装mongo

安装Navicat

安装mongoose

```
-----------------------------------
config\config.defautl.js
module.exports = {
    dbUri: "mongodb://localhost:27017/realworld"
}

------------------------
model\user.js
const mongoose = require("mongoose");
const userScahema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = userScahema;
-----------------------------------------------
realWorld\model\index.js
//链接 MongoDB 数据库
const mongoose = require('mongoose');
const {dbUri} = require("../config/config.defautl")
mongoose.connect(dbUri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;

//当链接失败的时候
db.on('error', () => {
    console.log("MongoDB 数据库链接失败", err)
});
db.once('open', function() {
  console.log("MongoDB 数据库链接成功")
});

//组织导出模型类
module.exports = {
    User: mongoose.model("User", require("./user"))
}
---------------------------------------
controller\user.js
const { User } = require("../model");

//用户注册
exports.register = async (req, res, next) => {
    try {
        //1、获取请求体数据
        console.log(req.body);
        //2、数据验证
        //2.1、基本数据验证
		
        //2.2、业务数据验证

        //3、验证通过，将数据保存到数据库
        const user = new User(req.body.user);
        await user.save();
        //4、发送成功响应
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error);
    }
}

//用户登录
exports.userLogin = (req, res, next) => {
    try {
        console.log(req.body);
        res.send("用户登录");
    } catch (error) {
        next(error)
    }
}

```

### 提取通用数据模型

在其他数据模型中都会有

createAt、updateAt字段

```
-------------------------------
model\baseModel.js
module.exports = {
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
}
---------------------------------
model\user.js
const mongoose = require("mongoose");
const baseModel = require("./baseModel")
const userScahema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})
module.exports = userScahema;
```

### 关于数据验证

express-validator

安装express-validator

```
-------------------------------------------
router\user.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userCtrl = require("../controller/user");
const {User} = require("../model");
//用户注册
router.post("/users", [                                              //1、配置验证规则
    body("user.username").notEmpty().withMessage("用户名不能为空!")
    .bail()
    .custom(async value => {                                   //自定验证  用户名不能重复
        const user = await User.findOne({username: value});
        if(user){
            return Promise.reject("用户名已存在")
        }
    })
    ,      
    body("user.password").notEmpty().withMessage("密码不能为空!"),
    body("user.email")
    .notEmpty().withMessage("邮箱不能为空!")
    .isEmail().withMessage("邮箱格式不正确")
    .bail()                                              //表示前面验证通过才会往后走
    .custom(async value => {                                   //自定验证  邮箱不能重复
        const user = await User.findOne({emial: value});
        if(user){
            return Promise.reject("邮箱已存在")
        }
    })
    ,
], (req, res, next) => {                   //2、判断验证结果
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}, userCtrl.register);                     //3、通过验证，执行具体的控制器处理结果
//用户登录
router.post("/users/login", userCtrl.userLogin);

module.exports = router;
```

### 提取验证中间件模块

```
----------------------------------
middleware\validator.js
const { validationResult } = require("express-validator")
module.exports = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    };
};
-------------------------------------
validator\user.js
const validate = require("../middleware/validator");
const { body } = require('express-validator');
const {User} = require("../model");
exports.registor = validate([
    body("user.username").notEmpty().withMessage("用户名不能为空!")
    .bail()
    .custom(async value => {                                   //自定验证  用户名不能重复
        const user = await User.findOne({username: value});
        if(user){
            return Promise.reject("用户名已存在")
        }
    }),      

    body("user.password").notEmpty().withMessage("密码不能为空!"),
    
    body("user.email")
    .notEmpty().withMessage("邮箱不能为空!")
    .isEmail().withMessage("邮箱格式不正确")
    .bail()                                              //表示前面验证通过才会往后走
    .custom(async value => {                                   //自定验证  邮箱不能重复
        const user = await User.findOne({emial: value});
        if(user){
            return Promise.reject("邮箱已存在")
        }
    })
])
--------------------
router\user.js
const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");

//用户注册
router.post("/users", userValidator.registor, userCtrl.register); 
//用户登录
router.post("/users/login", userCtrl.userLogin);

module.exports = router;

```

### 密码加密处理

```
-----------------------------
uitl\md5.js
const crypto = require("crypto");
//获取 crypto 支持的散列算法
// crypto.getHashes()
module.exports = (str) => {
    return crypto.createHash("md5")      //md5为散列算法，必须为crypto.getHashes()返回值中一个
    .update("prefix" + str)             //prefix 为混入的字符串
    .digest("hex");
}
------------------------
model\user.js
const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const md5 = require("../uitl/md5")
const userScahema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value),         //设置值时进行MD5加密
        select: false                     //查询不反回password
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})
module.exports = userScahema;
---------------------------------------
controller\user.js
const { User } = require("../model");
//用户注册
exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body.user);
        await user.save();
        user = user.toJSON();         //将mongoose对象转换为JSON
        delete user.password;         //不将password返回给前端
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error);
    }
}

//用户登录
exports.userLogin = (req, res, next) => {
    try {
        console.log(req.body);
        res.send("用户登录");
    } catch (error) {
        next(error)
    }
}
```

### 用户登录-数据验证

```
-----------------------
realWorld\validator\user.js
const validate = require("../middleware/validate");
const { body } = require('express-validator');
const {User} = require("../model");
const md5 = require("../uitl/md5")
exports.registor = validate([
    body("user.username").notEmpty().withMessage("用户名不能为空!")
    .bail()
    .custom(async value => {                                   //自定验证  用户名不能重复
        const user = await User.findOne({username: value});
        if(user){
            return Promise.reject("用户名已存在")
        }
    }),      

    body("user.password").notEmpty().withMessage("密码不能为空!"),

    body("user.email")
    .notEmpty().withMessage("邮箱不能为空!")
    .isEmail().withMessage("邮箱格式不正确")
    .bail()                                              //表示前面验证通过才会往后走
    .custom(async value => {                                   //自定验证  邮箱不能重复
        const user = await User.findOne({emial: value});
        if(user){
            return Promise.reject("邮箱已存在")
        }
    })
])
exports.login = [
    validate([
        body("user.email")
        .notEmpty().withMessage("邮箱不能为空!"),
        body("user.password").notEmpty().withMessage("密码不能为空!")
    ]),
    validate([
        body("user.email")
        .custom(async (value, {req}) => {                                   //自定验证  
            // const user = await User.findOne({email: value}).select("password");  //由于userModel的password设置了select：false   所以需再查一下passowrd
            const user = await User.findOne({email: value}).select([
                "email", "username", "bio", "image", "password"
            ]);
            if(!user){
                return Promise.reject("用户不存在")
            }
            req.user = user              //将查询到的用户挂载到请求对象上
        })
    ]),
    validate([
        body("user.password")
        .custom(async (value, {req}) => { 
            if(md5(value) !== req.user.password){
                return Promise.reject("密码错误!")
            }
         })
    ])
] 
---------------------------------------------
router\user.js
const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");

//用户注册
router.post("/users", userValidator.registor, userCtrl.register); 
//用户登录
router.post("/users/login", userValidator.login, userCtrl.userLogin);

module.exports = router;
```

### 基于JWT的身份认证

JSON Web Tocken（缩写JWT）是目前最流行的跨域认证解决方案

### 跨域认证的问题

互联网服务离不开用户认证。一般流程是下面这样

1、用户向服务器发送用户名和密码

2、服务器验证通过后，在当前对话session里保存相关数据，比如用户角色、登录时间等等

3、服务器向用户返回一个session_id，写入用户的Cookie

4、用户随后的每一次请求，都会通过Cookie，将session_id传回服务器

5、服务器收到session_id，找到前期保存的数据，由此得知用户的身份。

这种模式的问题在于，扩展（scaling）不好。单机当然没有问题，如果是服务器集群，或者是跨域的服务导向框架，就要求session数据共享。每台服务器都能够读取session

举例来说，A网站和B网站是同一家公司的关联服务。现在要求，用户只要在其中一个网站登录，再访问另外一个网站就会自动登录，请问怎么实现

一种解决方案是session数据持久化，写入数据库或别的持久层。各种服务收到请求后，都向持久层请求数据，这种方案的有点是架构清晰，缺点是工程量较大。另外，持久层万一挂了，就会单点失败

另一种方案是服务器索性不保存session数据了，所有数据都保存在客户端，每次请求都发回服务器。JWT就是这种方案的一个代表。

### JWT原理

JWT的原理是，服务器认证以后，生成一个JSON对象，发回给用户，就像下面这

```
{
	"姓名": "张三",
	"角色": "管理员",
	"到期时间": "2018年7月1日0点0分"
}
```

以后，用户与服务端通信的时候，都要发回这个JSON对象。服务器完全只靠这个对象认定用户身份。为了防止y9onghu篡改数据，服务器在生成这个对象的时候，会加上签名。

服务器就不保存任何session数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

### JWT的数据结构

实际的JWT大概就像下面这样

```
dsfafafsfasfassfdasfas.
dfsafafasfasdfafdsafsdfaafdasfaa.
dfsafdsafsdafsafasfdsaf
```

它是一个很长的字符串，中间用点(.)分割成三个部分。注意，JWT内部是，没有换行的，这里只是为了便于展示，将它写成了几行。

JWT的三个部分依次如下

Header（头部）

Payload（负载）

Signature（签名）

写成一行，就是下面的样子

```
Header.Payload.Signature
```

#### Header

header部分是一个JSON对象，描述JWT的元数据，通常是下面这样子

```
{	"alg": "HS256",	"type": "JWT"}
```

上面代码中，alg属性表示签名的算法（algorithm），默认是HMAC SHA256（写成HS256）；type属性表示这个令牌（token）的类型（type），JWT令牌统一写成JWT

最后，将上面的JSON对象使用Base64URL算法转成字符串

#### Payload

Payload部分也是一个JSON对象，用来存放实际需要传递的数据。JWT规定了7个官方字段，供选用。

```
iss(issuer): 签发人exp(expiration time): 过期时间sub(subject): 主题aud(audience): 受众nbf(Not Beffore): 生效时间iat(Issued At): 签发时间jti(JWT ID): 编号
```

除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子

```
{	"sub": "1234567890",	"name": "JohnDoe",	"admin": true}
```

注意，JWT默认是不加密的，任何人都可以读到，所以不要把秘密的信息放在这个部分。

这个JSON对象也要使用Base64URL算法转成字符串

#### Signature

Signature部分是对前两部分的签名，防止数据篡改。

首先，需要指定一个秘钥（secret）。这个秘钥只有服务器才知道，不能泄露给用户。然后，使用Header里面指定的签名法（默认是HMAC SHA256），按照下面的公式产生签名。

```
HMACSHA256(	base64UrlEncode(header) + "." +	base64UrlEncode(payload),	secret)
```

 算出这个签名以后，把Header、Payload、Signature三个部分拼成一个字符串，每一个部分之间用“点”（.）分割，就可以返回给用户。

在JWT中，消息体是透明的，使用签名可以保证消息不被篡改。但不能实现数据加密功能。

Base64URL

#### Base64URL

前面提到，Header和Payload串型算法是Base64URL。这个算法跟Base64算法基本类似，但有一些小的不同。

JWT作为一个令牌（tocken），有些场合可能会放到URL（比如api.example.com/?token=xxx）。Base64有三个字符 + 、/ 和 = ，在URL里面有特殊含义，所以要被替换掉：= 被省略、+替换成-， /替换成_。这就是Base64URL算法。

### JWT的使用方式

客户端收到服务器返回的JWT，可以储存在Cookie里面，也可以储存在localStorage。

此后，客户端每次与服务器通信，都要带上这个JWT。你可以把它放在Cookie里面自动发送，但这样不能跨域，所以更好的做法是放在HTTP请求头信息Authorization字段里面。

```
Authorization: Bearer <token>
```

另一种做法是，跨域的时候，JWT就放在POST请求的数据体里面。

### JWT的几个特点

```
1）JWT默认是不加密，但也是可以加密的。生成原始Token以后，可以用密钥再加密一次。
2）JWT不加密的情况下，不能将密钥数据写入JWT
3）JWT不仅可以用于认证，也可以用于交换信息。有效使用JWT，可以降低服务器查询数据库的次数。
4）JWT的最大缺点是，由于服务器不保存session状态，因此无法再使用的过程中废止某个token。或者更改token的权限。也就是说，一旦JWT签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
5）JWT本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
6）为了减少盗用JWT不应该使用HTTP协议明码传输。要使用HTTPS协议传输
```

### 使用jsonwebtoken

```
//同步方式生成token
const token = jwt.sign({
	foo: "bar"
}, "密钥")
console.log(token) 
// xxx.xxx.xxx


//异步方式生成token
jwt.sign({
	foo: "bar"
}, "密钥", (err, token) => {
	if(err){
		return console.log("生成token 失败")
	}
	consoel.log(token)
})

//同步方式验证 jwt
const ret = jwt.verify("xxx.xxx.xxx", "密钥");
console.log(ret)
//{"foo": "bar", iat: 1607495203}   
//果然验证失败会抛出异常

//异步方式验证 jwt
jwt.verify("xxx.xxx.xxx", "密钥", (err, res) => {
	if(err){
		return console.log("token 认证失败")
	}
	console.log(ret)
})
```

### 用户登陆生成token

```
------------------------------------------
/config/config.default.js
module.exports = {
    dbUri: "mongodb://localhost:27017/realworld",
    jwtSecret: "02eacd4a-1da3-48a6-ae75-d9bcabfb9f47 "
}
------------------------------------------
/util/jwt.js
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
exports.sign = promisify(jwt.sign);

exports.verify = promisify(jwt.verify);

exports.decode = promisify(jwt.decode);

---------------------------------------------
/controller/user.js
const jwt = require("../util/jwt");
const {jwtSecret} = require("../config/config.default")
...
//用户登录
exports.userLogin = async (req, res, next) => {
    try {
        const user = req.user.toJSON();
        delete user.password;
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret)
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}
...
```

### 使用中间件统一处理JWT

```
---------------------------
/middleware/auth.js
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model")
module.exports = async (req, res, next) => {
    //从请求头获取token数据
    let token = req.headers["authorization"];
    token = token ? token.split("Bearer ")[1] : null;
    if(!token){
        return res.status(401).end();
    }
    //验证token 是否有效
    try {
        const decodeToken = await jwt.verify(token, jwtSecret)
        req.user = await User.findById(decodeToken.userId);
        next()
    } catch (error) {
        return res.status(401).end();
    }
}
-------------------------------
/router/user.js
const auth = require("../middleware/auth");
....
	//获取当前登陆用户
router.get("/user", auth, userCtrl.getCurrentUser)
//更新当前登陆用户
router.put("/user", auth, userCtrl.updateCurrentUser)
....
```

### JWT过期时间

```
/controller/user.js
...
exports.userLogin = async (req, res, next) => {
    try {
        const user = req.user.toJSON();
        delete user.password;
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, {expiresIn: "1h"})
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}
...
```

### 创建文章

```
--------------model
const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
    ...baseModel,
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    tagList: {
        type: [String],
        default: null
    },
    favorited: {
        type: Boolean,
        default: false
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
})
module.exports = articleSchema;

--------------validator
exports.createArticle = validate([
    body("article.title").notEmpty().withMessage("文章标题不能为空！"),
    body("article.description").notEmpty().withMessage("文章摘要不能为空！"),
    body("article.body").notEmpty().withMessage("文章内容不能为空！")
])
--------------constroller
//创建文章
exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article);
        article.author = req.user._id;
        article.populate("author").execPopulate();
        await article.save();
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
----------------router
//创建文章
router.post("/", auth, articleValidator.createArticle, articleCtrl.createArticle);
```

### 根据Id获取文章

```
--------------validator
exports.getArticle = validate([
    param("slug").custom(async (value) => {
        if(!mongoose.isValidObjectId(value)){
            return Promise.reject("文章ID类型错误！")
        }
    })
])
--------------constroller
//获取文章
exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.slug).populate("author");
        if(!article){
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
----------------router
//获取文章
router.get("/:slug",articleValidator.getArticle, articleCtrl.getArticle);
```

### 获取文章列表

```
--------------constroller
//获取文章列表
exports.getArticles = async (req, res, next) => {
    try {
        const {
            limit = 20, 
            offset = 0,
            tag,
            author
        } = req.query;
        const filter = {}
        //数组字符串筛选
        if(tag){
            filter.tagList = tag           //mongobd 只要tagList数组中包含tag，就认为是匹配的
        }
        //作者筛选
        if(author){                        
            const user = await User.findOne({username: author});
            filter.author = user ? user._id : null;
        }
          
        const articles = await Article.find(filter)
        .skip(Number.parseInt(offset)) // 跳过offset条
        .limit(Number.parseInt(limit))// 取limit条
        .sort({
            createAt: -1            //-1倒序    1升序
        })
        const articleCount = await Article.countDocuments();
        res.status(200).json({
            articles,
            articleCount
        })
    } catch (error) {
        next(error);
    }
}
```

## Express与传统Web应用

### 服务端渲染相关概念

随着前端技术栈和工具链的迭代成熟，前端工程化、模块化也已经成为了当下的主流技术啊方案，在这波前端技术浪潮中，涌现了诸如React、Vue、Angular等基于客户端渲染的前端框架，这类框架所构建的单页面应用（SPA）具有用户体验好、开发效率高、渲染性能好、可维护性高等优点。但也有一些很大的缺陷，其中主要设计以下两点：

1、首屏加载时间长

2、不利于SEO

为了解决这两个缺陷，业界也借鉴了传统的服务端渲染方案，提出同构渲染的方式。

这种方式简而言之就是：

1、 通过服务端渲染首屏直出，解决SPA应用首屏渲染慢以及不利于SEO问题

2、通过客户端渲染接管页面内容交互得到更好的用户体验

这种方式我们通常称之为现代化的服务端渲染，也叫同构渲染；

同理，这种方式构建的应用称之为服务端渲染应用或者同构应用。

为类让大家更好的理解服务端渲染应用，我们这里需要了解一些相关概念：

1、什么是渲染

2、传统的服务端渲染

3、客户端渲染

4、现代的服务端渲染（也叫同构渲染）

#### 什么是渲染

例如对于我们前端开发者来说最常见的一种场景就是：请求后端接口数据，然后将数据通过模版绑定语法绑定到页面中，最终呈现给用户。

数据

```
{
	"message": "Hello World"
}
```

模版

```
<h1>{{message}}</h1>
```

渲染（数据 + 模版）结果 

```
<h1>Hello World</h1>
```

把（数据+模版）拼接到一起的这事儿就是我们这里所指的渲染。

#### 传统的Web应用

最早期，Web页面渲染都是在服务端完成的，即服务端运行过程中将所需的数据结合页面模版渲染为HTML，响应给客户端浏览器。所以浏览器呈现出来的是直接包含内容的页面。

这种方式的代表技术有：ASP、PHP、JSP等，再到后来的一些相对高级一点的服务端框架配备一些模版引擎。

无论如何这种方式对于没有玩过后端开发的同学来说可能比较陌生，所以下面我们通过 我们前端同学比较熟悉的Node.js来了解一下这种方式。

这也就是最早的页面渲染方式，也就是动态网站的核心工作步骤。在这样的一个工作过程中，因为页面中的内容不是固定的，它有一些动态的内容。

在今天看来，这种渲染模式是不合理或者说不先进的。因为在当下这种网页越来越复杂的情况下，这种模式存在很多明显的不足；

1、应用的前后端部分完全耦合在一起，在前后端协同开发方面会有非常大的阻力；

2、前端没有足够的发挥空间，无法充分利用现在前端生态下的一些非常优秀的方案；

3、由于内容在服务端动态生成，所以服务端的压力较大；

4、相比目前流行的SPA应用来说，用户体验一般

### 动态网页渲染原理 

```
const express = require("express");
const {promisify} = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const app = express();
const PORT = "8080";
app.get("/", async (req, res) => {
    try {
        let data = await readFile("./view/index.html", "utf-8");
        const todos = ["吃饭1", "吃饭2", "吃法3"];
        let str = "";
        todos.forEach(todo => {
            str += `<li>${todo }</li>`
        })
        data = data.replace('^_^', str)
        res.status(200).contentType("text/html;charset=utf-8").send(data);
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
    
})
app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
})
```

### 模版引擎介绍

```
 ejs
 pug
 handlebars
 nunjucks
 art-template
 
 
const express = require("express");
const {promisify} = require("util");
const fs = require("fs");
const template = require('art-template');
const readFile = promisify(fs.readFile);
const app = express();
const PORT = "8080";
app.get("/", async (req, res) => {
    try {
        const templateStr = await readFile("./view/index.html", "utf-8");
        const ret = template.render(templateStr, {
            foo: 'bar',
            todos: [
                {
                    'title': '吃饭'
                },
                {
                    'title': '睡觉'
                }
            ]
        })
        res.status(200).contentType('text/html;charset=utf-8').send(ret);
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
    
})
app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
})
```

### 配置art- template模版引擎

```
const express = require("express");
const app = express();
const path = require("path");
const PORT = "8080";
// view engine setup
app.engine('art', require('express-art-template')); 
//  当渲染以 .artj结尾的源文件的时候 使用express-art-template
app.set('view options', {     //art-tempalte 配置
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));  //模版文件的存储目录，默认是views
app.set('view engine', 'art');  //可以省略的模版文件后缀

app.get('/', function (req, res) {
    //只要配置了模版引擎，就可以使用res.render 方法渲染页面了
    // 1、读取模版文件  2、渲染  3、发送响应 
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
})

```

### 在express中托管静态资源

```
1\直接把public下的资源开放出去，路径不需要写/public
app.use(express.static("./public"));

2\把public下的资源开放出去，并通过/public前缀进行访问
app.use("/public", express.static("./public"));

路径最好是绝对路径
app.use("/public", express.static(path.join(__dirname, './public ')));
```

### 静态资源托管配置项

```
app.use(
	'/foo', 
	express.static(path.join(__dirname, './public'), 
	{
		index: false
	}
));

访问 /foo时不会默认渲染 /foo/index.html

app.use(
	'/foo', 
	express.static(path.join(__dirname, './public'), 
	{
		index: ['index.html']
	}
));
访问 /foo时 默认渲染 /foo/index.html

托管多个静态资源目录
app.use(express.static('./public'));
app.use(express.static('./test')); 


app.use("/public", express.static('./public'));
app.use("/test", express.static('./test')); 

```

页面中资源请求路径问题

```
1、绝对地址
http://example.com/main.css

2、相对地址
../public/css/main.css
在file协议中，相对于当前文件
在http协议中，相对于网络url地址
 /index.html      ../public/css/main.css   --->    /public/css/main.css
 /a/b   b表示文件  ../public/css/main.css.  --->    /public/css/main.css
 /a/b/c c表示文件  ../public/css/main.css.  --->    /a/public/css/main.css
 
 
合理写法 ---  绝对路径，以/开头 
/public/css/main.css
```

传统web应用案例
