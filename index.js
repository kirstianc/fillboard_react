const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// sql commands
const SELECT_ALL_MEET = `SELECT * FROM meet`;

// providing db server info
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sportyboy33',
    database: 'fillboard'
});

// connecting to server and if err => return err
connection.getConnection(err=>{
    if(err){
        return err;
    }
});

//http://localhost:4000/meets/add?Meet_ID=7&Name=testNovember

const app = express();

app.use(cors());

app.get('/', (req, res)=>{
    res.send('go to /meets for Meets')
});

app.get('/meets/add', (req,res)=>{
    const {Meet_ID, Name} =req.query;

    // create INSERTION query using provided information
    const INSERT_MEET_QUERY = `INSERT INTO meet(Meet_ID, Name) VALUES(${Meet_ID},'${Name}'))`;
    
    connection.query(INSERT_MEET_QUERY, (err,results)=>{
        if(err){
            res.send(err)
        }else{
            res.send('successfully added a Meet')
        }
    })
});

app.get('/meets', (req, res)=>{
    res.send('welcome to /meets');
    
    connection.query(SELECT_ALL_MEET, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json({
                data: results
            })
        }
    });
});

// listen on Port 4000
app.listen(4000,()=>{
    console.log(`db server listening on port 4000`)
});

