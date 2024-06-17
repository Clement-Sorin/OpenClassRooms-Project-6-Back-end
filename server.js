const http = require("http")
const app = require("./app")

app.set("port", process.env.PORT || 3100)
const server = http.createServer(app)

server.listen(process.env.PORT || 3100)