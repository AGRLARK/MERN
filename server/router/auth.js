const jwt = require('jsonwebtoken');
const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { now } = require('mongoose');
const authenticate = require('../middleware/authenticate');

router.get("/", (req, res) => {
  res.send(`Hello World! from the server to router `);
});

//Using Async Await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ err: "Plz filled the remaining field" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist ." });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Email Already Exist ." });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Using Promises
// router.post("/register", (req, res) => {
//   // console.log(req.body);  // TO get the whole data

//   // To get the data using console.log use this Object Destructive
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ err: "Plz filled the ramining field" });
//   }

//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "Email Already Exist . " });
//     }

//     const user = new User({ name, email, phone, work, password, cpassword });

//     user
//       .save()
//       .then(() => {
//         res.status(201).json({ message: "User Registered Successfully" });
//       })
//       .catch((err) => res.status(500).json({ error: "Failed to Registered " }));

//      }).catch(err => {console.log(err); })
// });

//login route

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"Awesome"});
  try {
  
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Please filled the data" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) { 
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token , "token mila");

      res.cookie("jwtoken",token , {
        expires : new Date(Date.now() + 25892000000),
        httpOnly:true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials1 " });
      } else {
        res.json({ message: "User signin Sucessfully " });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials2 " });
    }
  } catch (err) {
    console.log(err);
  }
});


// About Us ka page
router.get('/about' , authenticate , (req,res)=>{
	console.log(`Hello my About `);
	res.send(req.rootUser);
  
});

// Get user data from Contact us & Home Page
router.get('/getdata',authenticate,(req,res)=>{
  console.log(`Hello Contact Us Page`);
   res.send(req.rootUser);

});


// Contact Us page
router.post('/contact',authenticate, async(req,res)=>{

  console.log(req.body)
  try{
    const { name , email , phone , message } = req.body;

    if(!name || !email || !phone || !message){
      console.log("Error in Contact Form");
      return res.json({error: " Plz filled the contact Form "});
    }

    const userContact = await User.findOne({_id:req.userID});

    if(userContact){
        const userMessage = await userContact.addMessage(name,email,phone,message);

        console.log(userMessage);  // Debugging purpose

        res.status(201).json({message : "User Contact Sucessfully" });
    }

  }catch(err){
    console.log(err);
  }
});

// Logout ka page
router.get('/logout' , (req,res)=>{
	console.log(`Hello my Logout Page`);
  res.clearCookie('jwtoken');
	res.status(200).send("<h1>User Logout</h1>");
  
});




module.exports = router;
