var express = require('express')
var bodyParser = require('body-parser')

app = express()
port = process.env.PORT || 8081


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
var routes = require('./api/routes/userListRoutes')
routes(app)
app.listen(port)
console.log('Server started on:'+port)