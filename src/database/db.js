//Importar a dependência sqlite3
const sqlite3 = require("sqlite3").verbose()  //Function dentro de um objeto é um MÉTODO

//Objeto que realizará operações no DB
const db = new sqlite3.Database("./src/database/database.db") //Constructor/Classe

module.exports = db

/* Executa objeto
db.serialize(() => {
    //Criar tabela com comandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //Inserir dados na tabela
    const query = `
        INSERT INTO places ( 
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 270",
        "Santa Catarina",
        "Rio do sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this) //This não funciona properly em uma arrow function
    }

    db.run(query, values, afterInsertData)

    //Consultar dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)
    })

    //Deletar dados da tabela
    db.run((`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso")
    }))
}) */