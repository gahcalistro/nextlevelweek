const express = require("express")
const server = express()

//Import DB
const db = require("./database/db")

//Enable Req.body
server.use(express.urlencoded({ extended: true }))

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
    //Query Strings => Dados enviados pelo form
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body => Dados enviados através do corpo do form
    //console.log(req.body)

    //Insert Data in DB
    const query = `
        INSERT INTO places ( 
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this) //This não funciona properly em uma arrow function

    }

    db.run(query, values, afterInsertData)
    return res.render("create-point.html", { saved: true })
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //Field empty
        return res.render("search-results.html", { total: 0 } )
    }

    // DB 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        //console.log("Data:")
        //console.log(rows)

        const total = rows.length

        //Show data in the html
        return res.render("search-results.html", { places: rows, total} )
    }) 
})

//Run Server.js
server.listen(3000)