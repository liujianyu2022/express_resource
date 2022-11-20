const http = require("http")
const url = require("url")

const routes = [
    // {path, method, handler}
]

function createApplication() {

    function get(path, handler) {
        routes.push({ path, method: "get", handler })
    }

    function listen(...args) {       // 端口号 和 回调函数
        let server = http.createServer((req, res) => {

            const { pathname } = url.parse(req.url)         // req.url 可能包含着查询参数, 就是把端口号后面一堆都返回  /?user=1/:1

            const method = req.method.toLocaleLowerCase()

            let route = routes.find(route => route.path === pathname && route.method === method)

            if (route) {
                route.handler(req, res)     //把node原生的req和res对象传给路由的处理函数
                return 
            }

            res.end("404, NOT FOUND")
        })

        server.listen(...args)
    }

    return {
        get,
        listen
    }
}

module.exports = createApplication