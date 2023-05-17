const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors')

const app = express(), bodyParser = require('body-parser');
app.use(express.json());
app.use(cors())
port = 3000;


const pool = mariadb.createPool({
    host: "localhost",
    user: "admin",
    password: "admin123",
    connectionLimit: "100",
})

async function createDatabase(){
    let conn;
    try{
        pool.query("CREATE DATABASE IF NOT EXISTS dengo")
        pool.query("use dengo")
        conn = pool.getConnection();
        (await conn)
            .query("CREATE TABLE IF NOT EXISTS user (name CHAR(50) NOT NULL, surename CHAR(50), email VARCHAR(100) PRIMARY KEY, cellphone VARCHAR(20), dataNacimento DATE, eventos TINYTEXT, relacionamentos VARCHAR(30))");
    }catch (err){
        throw err
    } finally {
        if (conn) (await conn).end();
    }

}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))


app.post('/user', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    let client = req.body
    console.log(client.nome, client.sobrenome, client.email, client.telefone,  client.eventos, client.relacionamento, client.dataNascimento)
    createUser(client.nome, client.sobrenome, client.email, client.telefone,  client.eventos.toString(), client.relacionamento, client.dataNascimento)
})

async function createUser(name, surename, email, cellphone, eventos, relacionamentos, dataNascimento){
    let conn;
    try{
        conn = pool.getConnection();
        const row = (await conn)
            .query("INSERT INTO user (name, surename, email, cellphone, dataNacimento, eventos, relacionamentos) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, surename, email, cellphone, dataNascimento, eventos, relacionamentos]);
    }catch(err){
        throw err;
    }finally{
        if (await conn){
            (await conn).end;
        }
    }
}

app.listen(port, () =>{
    createDatabase();
   console.log("listening to port 3000")
})