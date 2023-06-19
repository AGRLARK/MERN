const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB,{
	useNewUrlParser: true,
	useUnifiedTopology : true
}).then(()=>{
	console.log(`Connection Sucessfull `);
}).catch((err) => 
		console.log(`Connection Failed: `)
);