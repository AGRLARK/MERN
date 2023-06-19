import React, {useContext, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../images/logo-png.jpg";
import { UserContext } from "../App";


const Navbar = () => {
  const {state , dispatch} = useContext(UserContext)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">

            {/* <RenderMenu/> */}

            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            {
             state ?(<>
                <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout 
                </NavLink>
              </li>
              </>
               ) : (
           <>
            <li className="nav-item">
              <NavLink  className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Registration 
              </NavLink>
            </li>
            </>
            )
            
             }
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
