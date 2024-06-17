const http = require("http")

const server = http.createServer((req, res) => {
    res.end("test server")
})

server.listen(process.env.PORT || 3000)