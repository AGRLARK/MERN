import React, { useCallback, useEffect, useState} from "react";
import logo from "../images/logo.jpg";
import logo2 from "../images/logo56.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { use } from "../../../server/router/auth"; 

const About = () => {

  const Navigate = useNavigate();
  const [userData,setUserData] = useState({});

  const callAboutPage = useCallback(async () =>{
    try{
      const res = await fetch('/about',{
        method:"GET",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status===200){
        const  error = new Error(res.error);
        throw error;

      }

    }catch(err){
        console.log(err);
        Navigate('/login'); 
    }
  }, [setUserData, Navigate]);



  useEffect(()=>{
    callAboutPage();
  },[callAboutPage]);


  const [isTimeline, setIsTimeline] = useState()
  const [isAbout, setIsAbout] = useState()


  const handleAbout = () => {
    setIsAbout(true)
    setIsTimeline(false)
  }

  const handleTimeline = () => {
    setIsAbout(false)
    setIsTimeline(true)
  }
  return (
    <>
      <div className="containers">
        <form method="GET">
        <div className="about-box">
          <div className="about-row">
            <div className="about-box-left">
              <div className="img-logo">
                <img src={userData.name === "Akash Gupta" ? logo :logo2} alt="AGRLARK" />
              </div>
            </div>

            <div className="about-box-right">
              <div className="about-box-data">
                <h2>{userData.name}</h2>
                <h4>{userData.work}</h4>
                <p>RANKINGS : <span>10/10</span>  </p>


                <div className="navbar-tablist">
                  <ul class="nav nav-tabs" >
                    <li class="nav-item">
                    <NavLink className="nav-link" id="home-tab" >
                       <button onClick={handleAbout} >
                          About
                        </button>
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink class="nav-link" id="profile-tab" >
                        <button onClick={handleTimeline}>
                          TimeLine
                        </button></NavLink>
                    </li>
                  </ul>
                </div>
                {
                  isAbout ?
                    <>
                      <div className="about-tab">
                      <div className="row ">
                            <div className="col-md-6">
                              <label >Experience</label>
                            </div>
                            <div className="col-md-6">
                              <p>Expert</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label >Hourly Rate : </label>
                            </div>
                            <div className="col-md-6">
                              <p> 10 hr </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label > Total Projects </label>
                            </div>
                            <div className="col-md-6">
                              <p>5</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label >English Level</label>
                            </div>
                            <div className="col-md-6">
                              <p>Expert </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label >Availability</label>
                            </div>
                            <div className="col-md-6">
                              <p>6 Months </p>
                            </div>
                          </div>

                        {/* <NavLink to="https://www.youtube.com/channel/UCUKaj96mSSeS0BdCWlo3Rqg"><p>Youtube</p></NavLink>
                        <NavLink to="https://www.youtube.com/channel/UCUKaj96mSSeS0BdCWlo3Rqg"><p>Instagram</p></NavLink>
                        <NavLink to="https://www.youtube.com/channel/UCUKaj96mSSeS0BdCWlo3Rqg"><p>Facebook</p></NavLink>
                        <NavLink to="https://www.youtube.com/channel/UCUKaj96mSSeS0BdCWlo3Rqg"><p>Messenger</p></NavLink>
                        <NavLink to="https://www.youtube.com/channel/UCUKaj96mSSeS0BdCWlo3Rqg"><p>Twitter</p></NavLink> */}

                      </div>
                    </> : isTimeline ?
                      <>
                        <div className="about-tab">
                          <div className="row">
                            <div className="col-md-6">
                              <label >User Id</label>
                            </div>
                            <div className="col-md-6">
                              <p>{userData.phone}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label >Name : </label>
                            </div>
                            <div className="col-md-6">
                              <p> {userData.name} </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label > Email </label>
                            </div>
                            <div className="col-md-6">
                              <p>{userData.email}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label > Phone Number </label>
                            </div>
                            <div className="col-md-6">
                              <p>{userData.phone}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label >Profession</label>
                            </div>
                            <div className="col-md-6">
                              <p>{userData.work}</p>
                            </div>
                          </div>
                        </div>
                      </> : ""
                }

              </div>

            </div>
            {/* Edit Porfile */}
            <div className="btn-btn">
              <input type="submit" className="profile-edit-btn" name="Addbtn" value="Edit Profile" />
            </div>
          </div>
          <div className="row">
            {/* left side url  */}
            <div className="down-left-side">
              <div className="profile-work">
                  

              </div>
            </div>
          </div>

          {/* right side data toggle */}
          {/* <div className="down-right-data">
            <div className="tab-content profile-tab" id="myTabContent" >
              <div className="tab-pane fade show-active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label >User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>7854412445</p>
                  </div>
                </div>

              </div>

            </div>
          </div> */}
        </div>
        </form>
      </div>
    </>
  );
};

export default About;
