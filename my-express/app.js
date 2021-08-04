const express = require('./express');
const app = express();

app.use('/test', (req, res, next) => {
    console.log("use test")
    res.end("/test")
})
app.get('/', (req, res, next) => {
    console.log(1)
    next();
})
app.get('/', (req, res, next) => {
    setTimeout(() => {
        console.log(2)
        next();
    }, 10000);
})
app.get('/', (req, res, next) => {
    res.end("get /")
})

app.get('/about', (req, res, next) => {
    console.log('/about1')
    setTimeout(() => {
        console.log('/about2')
        next();
    }, 10000);
}, (req, res, next) => {
    setTimeout(() => {
        console.log('/about3')
        next();
    }, 10000);
})
app.get('/about', (req, res, next) => {
    res.end("get /about");
})
app.get('/about*rrr', (req, res) => {
    res.end('get /about*rrr')
})
app.get('/about/:id/a/:name', (req, res) => {
    console.log(req.params);
    res.end('get /about*rrr')
})
app.listen(3000, () => {
    console.log('running');
});
console.log(app._router)