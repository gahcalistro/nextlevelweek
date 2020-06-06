const express = require("express")
const server = express()

//Config Public Source
server.use(express.static("public"))

//Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { //Identifica as Views
    express: server, //Identifica o servidor
    noCache: true //Não guarda na memória a fim de evitar bugs
})

//Config Routes
//req => Requisição (Pergunta/GET)
//res => Resposta
server.get("/", (req, res) => {
    //res.send -> retorna algo
    //res.send -> sendFile() => retorna um arquivo
    //__dirname + "" => arquivo
    return res.render("index.html", { title: "Um título" }) //Renderiza a page utilizando o Nunjucks | Precisa do RETURN
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//Run Server.js
server.listen(3000)