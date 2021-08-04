const path = require('path');
const url = require('url');
const methods = require('methods');
const pathRegexp = require('path-to-regexp');
const Layer = require('./layer');
const Route = require('./route');

function Router() {
    this.stack = []
}

methods.forEach(method => {
    Router.prototype[method] = function(path, handlers) {
        const route = new Route();
        const layer = new Layer(path, route.dispatch.bind(route));
        layer.route = route;
        this.stack.push(layer)
        route[method](path, handlers)
    }
})
Router.prototype.use = function(path, handlers) {
    if (typeof path === 'function') {
        handlers.unshift(path);
        path = '/'
    }
    handlers.forEach(handler => {
        const layer = new Layer(path, handler);
        layer.isUseMiddleware = true;
        this.stack.push(layer);
    })
}

Router.prototype.handle = function(req, res) {
    const { pathname } = url.parse(req.url);
    let index = 0;
    const next = () => {
        if (index >= this.stack.length) {
            return res.end(`can not get ${pathname}`)
        }
        const layer = this.stack[index++];
        const match = layer.match(pathname);
        if (match) {
            req.params = req.params || {};
            Object.assign(req.params, layer.params);
        }
        //顶层只判定请求路径，内层判定请求方法
        if (match) {
            console.log(match);
            //顶层这里调用的handle其实就是dispatch
            return layer.handler(req, res, next);
        }
        next();
    }
    next();
}

module.exports = Router;