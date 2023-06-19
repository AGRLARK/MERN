const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    work: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    cpassword: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name: {
                type:String,
                required:true
            },
            email: {
                type:String,
                required:true
            },
            phone: {
                type:Number,
                required:true
            },
            message: {
                type:String,
                required:true
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


//Hashing the Password 
userSchema.pre('save',async function(next){   //Whenver we have to use 'this' method the fat arrow function i.e. ()=>{} works Opposte that's why we use Normal Function  
        console.log(" Hi From Inside ");
    if(this.isModified('password')){
        console.log("Hi i am pre password ");
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

//We are Generating Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token});  //In this this.tokens refer to the Array Function
        await this.save();
        return token;
    }
    catch(err){
        console.log("Error: "+err);
    }
}

//Stored the Message

userSchema.methods.addMessage = async function(name,email,phone,message){
    try{
        this.messages = this.messages.concat({name,email,phone,message});
        await this.save();
        return this.messages;
    }
    catch(error){
        console.log(error);
    }
}


//Collection Created
const User = mongoose.model('USER',userSchema);

module.exports = User;