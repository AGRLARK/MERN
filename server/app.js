const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookies = require('cookie-parser');	

dotenv.config({path:'./config.env'});

const PORT = process.env.PORT;
//Database
require('./db/conn');

//const USER = require('./model/userSchema');
app.use(express.json());
app.use(cookies());

//We link the router files to link the router
app.use(require('./router/auth'));
 

//middleware();

// app.get('/',(req,res)=>{
// 	res.send(`Hello World! from the server `);
// });
app.get('/about',(req,res)=>{
	console.log(`Hello my About `);
	res.send(`Hello About World! from the server `);
	
});

// app.get('/contact',(req,res)=>{

// 	res.cookie("Test","AGRLARK2");
// 	res.send(`Hello Contact World! from the server `);
	
// });

app.get('/signin',(req,res)=>{
	res.send(`Hello Login World! from the server `);
	
});

app.get('/signup',(req,res)=>{
	res.send(`Hello Registration World! from the server `);
	
});

app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
});