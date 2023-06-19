import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../App.css";
import { UserContext } from '../App';

const Login = () => {

  const {state , dispatch} = useContext(UserContext);

  const Navigate = useNavigate(); 

  const [email,setEmail] = useState('');

  const [password,setPassword] = useState('');

  const loginUser = async (e) => {
      e.preventDefault();

      const res = await fetch('/signin',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      const data = res.json();
      
      if(res.status === 400 || !data){
        window.alert("Login Failed");
        console.log("Login Failed");
      }else{
        dispatch({type:"USER",payload:true});
        window.alert("Login Sucessfull");
        console.log("Login Sucessfull");
        Navigate('/');
      }
  }

  return (
    <div>
      {/* <div className="App"> */}
        <section className="signin">
          <div className="container-login">
            <div className="signin-content">
              <div className="signin-form">
                <h1 className="form-title">Sign In</h1><br/>
                <form method='POST' className="register-form" id="register-form">

                  <div class="form-group">
                    <label htmlFor="email">
                      <i class="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      placeholder="Enter Your Email"
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      placeholder="Enter Your Password"
                      autoComplete="off"
                    ></input>
                  </div>

                </form>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Login"
                  onClick={loginUser}
                />
                <br /><br />
                <div className="signin-inside">
                  <NavLink to="/signup" className="signin-link">
                    <button>Create an Account</button>
                    
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    // </div>
  )
}

export default Login