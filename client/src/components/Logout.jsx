import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

  const {state,dispatch} = useContext(UserContext);

  const Navigate = useNavigate();

  useEffect(()=>{
    fetch('/logout',{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      dispatch({type:"USER",payload:false});

      Navigate('/login',{replace:true});

      if(res.status !== 200){
        const error = new Error(res.error);
        throw error;
      }
    }).catch((err)=>{
      console.log(err);
    })
  })


  return (
    <div style={{justifyContent:'center',alignItems:'center',textAlign:'center'}}><h1>Logout</h1></div>
  )
}

export default Logout