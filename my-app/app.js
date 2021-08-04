








// const express = require("express");
// const app = express();
// const router = require("./router");
// app.use(express.json());
// app.use(express.urlencoded());

// app.get("/foo", (req, res, next) => {
//     // res.send("next1")
//     next("err")
// }, (req, res, next) => {
//     res.send("next2") 
// })
// app.use((err, req, res, next) => {
//     console.log(err)
//     res.send("error")
// })

// app.listen("8080", () => {
//     console.log("server is started in http://localhost:8080");
// })

// const express = require("express");
// const app = express();
// const router = require("./router");
// app.use(express.json());
// app.use(express.urlencoded());

// //挂载路由 
// app.use(router);

// //给路由限定访问前缀
// app.use("/abc", router);

// app.listen("8080", () => {
//     console.log("server is started in http://localhost:8080");
// })




// const express = require("express");
// const app = express();

// //req 请求对象
// //res 响应对象
// //next 下一个中间件
// app.use((res, req, next) => {
//     console.log(res.method, res.url, Date.now());
//     next();
// })
// app.get("/", (req, res) => {
//     res.send("get /")
// })
// app.get("/about", (req, res) => {
//     res.send("get /about")
// })
// app.post("/login", (req, res) => {
//     res.send("post /login")
// })
// app.listen("8080", () => {
//     console.log("server is started in http://localhost:8080");
// })




// const express = require("express");
// const { getDB, saveDB } = require("./db");
// const app = express();
// //配置解析表单请求体：application/json 的数据  通过req.body获取
// app.use(express.json());  
// //配置解析表单请求体：application/x-www-form-urlencoded 的数据  通过req.body获取
// app.use(express.urlencoded())
// app.get("/todos", async (req, res) => {
//     try {
//         const db = await getDB();
//         res.status(200).json(db.todos)
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// })
// app.get("/todos/:id", async (req, res) => {
//     try {
//         const db = await getDB();
//         const target = db.todos.find(todo => todo.id === Number(req.params.id));
//         if(!target){
//             return res.status(404).end()
//         }
//         res.status(200).json(target)
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// })
// app.post("/todos", async (req, res) => {
//     try {
//         //1、获取客户端的请求参数
//         const todo = req.body;
//         //2、数据验证
//         if(!todo.title){
//             return res.status(422).json({
//                 error: "The field title is required"
//             })
//         }
//         //3、数据验证通过，把数据存储到DB中
//         const db = await getDB();
//         const lastTodo = db.todos[db.todos.length - 1]
//         todo.id = lastTodo ? lastTodo.id + 1 : 1
//         db.todos.push({
//             id: todo.id,
//             title: todo.title
//         })
//         await saveDB(db)
//         //4、发送成功的响应
//         res.status(201).json(todo)
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// })
// app.patch("/todos/:id", async (req, res) => {
//     try {
//         //1、获取表单数据
//         const todo = req.body;
//         //2、查找到要修改的任务项
//         const db = await getDB();
//         let target = db.todos.find(todo => todo.id === Number(req.params.id));
//         if(!target){
//             return res.status(404).end();
//         }
//         //3、修改
//         Object.assign(target, todo);
//         //4、保存数据
//         await saveDB(db)
//         //5、发送成功的响应
//         res.status(200).json(target)
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// })
// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const todoId = Number(req.params.id);
//         const db = await getDB();
//         const index = db.todos.findIndex(todo => todo.id === todoId);
//         if(index === -1){
//             return res.status(404).end();
//         }
//         const target = db.todos.splice(index, 1);
//         await saveDB(db)
//         res.status(204).end() 
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// })
// app.listen("8080", () => {
//     console.log("server is started in http://localhost:8080");
// })