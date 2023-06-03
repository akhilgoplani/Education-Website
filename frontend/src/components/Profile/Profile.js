import React, { useEffect, useState } from 'react'
import image from "../../images/avatar.jpeg"
import "./profile.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Profile = () => {
  const [user,setUser]=useState([])
 
  const userinfo = async () => {
  
 
    const response = await fetch("http://localhost:2000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
     
    });
    
    const abc = await response.json();
    setUser(abc);
    
 }


 useEffect(()=>{
  userinfo();

 },[])
  return (
    <div className="pro">
      <Navbar/>
      <h1 className='heading'>YOUR PROFILE</h1>
      <img src={user.avatarUrl} className="imag" alt={user.name} />
      <hr/>
    <h2 className="sub">NAME:{user.name}</h2>
    <h2 className="sub">EMAIL:{user.email}</h2>
    <Footer/>
    </div>

  );
  
}


export default Profile;