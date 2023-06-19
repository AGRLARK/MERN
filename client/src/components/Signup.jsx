import React, { useState } from "react";
import "../App.css";
import { NavLink , useNavigate } from "react-router-dom";

const Signup = () => {

  const Navigate = useNavigate();


  const [User,setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });

  let name , value ;
  const handleInputs = (e)=>{
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...User, [name]:value});
  }

    const PostData = async (e) =>{
        e.preventDefault();

        const  {name,email,phone,work,password,cpassword}= User;

        const res  = await fetch("/register",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body:JSON.stringify({
            name, email, phone, work, password, cpassword
          })
          
        });

        const data = await res.json();

        if(data.status === 422 || !data ){
          window.alert("Invalid Registration ");
          console.log("Invalid Registration ");
        }else{
          window.alert("Sucessfull Registration ");
          console.log("Sucessfull Registration ");
          
          Navigate('/login');
        }
    }

  return (
    <div className="container-signup">
      <section className="signup">
        {/* <div className="container mt-5"> */}
          <div className="signup-content">
            <div className="signup-form">
              <br />
              <h2 className="form-title">Sign In</h2><br /><br />
              <form  method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i class="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    value={User.name}
                    onChange={handleInputs}
                    autoComplete="off"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i class="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={User.email}
                    onChange={handleInputs}
                    autoComplete="off"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i class="zmdi zmdi-phone material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Your Phone"
                    value={User.phone}
                    onChange={handleInputs}
                    autoComplete="off"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="work">
                    <i class="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    placeholder="Enter Your Profession"
                    value={User.work}
                    onChange={handleInputs}
                    autoComplete="off"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="name">
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={User.password}
                    onChange={handleInputs}
                    autoComplete="off"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Enter Your Confirm password"
                    value={User.cpassword}
                    onChange={handleInputs}
                    autoComplete="off"
                  ></input>
                </div>
              </form>
            </div>
            <div className="form-group form-button">
              <input
                type="submit"
                name="signup"
                id="signup"
                className="form-submit"
                value="Register"
                onClick={PostData}
              />
              <br/><br/>
              <div className="signup">
                <NavLink to="/login" className="signup-link" id="signup-btn">
                  <button>I am Already Registered</button>
                  
                </NavLink>
              </div>
            </div>
          </div>
        {/* </div> */}
      </section>
    </div>
  );
};

export default Signup;
