const express = require('express')
const server = express()
const pageLanding = require('./pages')
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
    .use(express.urlencoded({ extended: true }))
    .use(express.static("public"))
    .get("/", pageLanding)
    .listen(5500)