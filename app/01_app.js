const express = require("../express-resource")

const app = express()

app.get("/", (req, res) => {
    res.end("hello")
})


app.listen(5000, () => {
    console.log("the server is running at 5000")
})


