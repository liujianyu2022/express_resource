const http = require("http")
const url = require("url")


function App (){
    this.routes = []            // {pathname, method, handler}

    //app.get("/id", (req, res)=>{})
    //可能写多个get方法，因此采用数组
    this.get = function(pathname, handler){
        this.routes.push({
            pathname, 
            method: "get",
            handler
        })
    }

    // app.listen(3000, ()=>{})
    this.listen = function(...args){

        let server = http.createServer((req, res)=>{
            let {pathname} = url.parse(req.url)     //当前页面的pathname
            let method = req.method.toLocaleLowerCase()

            let route = this.routes.find(route => route.pathname === pathname && route.method === method)

            if(route){
                route.handler(req, res)
                return
            }

            res.end("404 Not Found")
        })

        server.listen(...args)
    }
}

module.exports = App

