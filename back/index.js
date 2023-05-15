const express = require('express');
const mariadb = require('mariadb');

const app = express(), bodyParser = require('body-parser');
app.use(bodyParser.json());
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

app.get('/', (req, res) => res.send("Hello"))


//Decidir como passar o objeto
app.post('/user', async (req, res) => {
    const result = creatUser()
})

async function createUser(name, surename, email, cellphone, eventos, relacionamentos, dataNascimento){
    let conn;
    try{
        conn = pool.getConnection();
        const row = (await conn)
            .query("INSERT INTO user (name, surename, email, cellphone, dataNascimento, eventos, relacionamentos) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, surename, email, cellphone, dataNascimento, eventos, relacionamentos]);
    }catch(err){
        throw err;
    }finally{
        if (await conn){
            (await conn).end;
            return row;
        }
    }
}

app.listen(port, () =>{
    createDatabase();
   console.log("listening to port 3000")
})