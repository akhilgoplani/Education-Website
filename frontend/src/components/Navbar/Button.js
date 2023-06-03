import React, { useEffect, useState } from 'react';
import './Button.css';
import { Link, useHistory } from 'react-router-dom';
import image from "../../images/avatar.jpeg"

export function Button() {
    const auth=localStorage.getItem('token');
    const history=useHistory();
    const logout=()=>{
        localStorage.clear();
        history.push('/signup');
    }
    
    
    const toggleMenu=()=>{
      let subMenu = document.getElementById("subMenu");
        subMenu.classList.toggle("open-menu");
    }

    const [user,setUser]=useState([])
 
    const userinfo = async () => {
    
      try {
        const response = await fetch("http://localhost:2000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        
        const abc = await response.json();
        setUser(abc);
      } catch (error) {
        console.log(error.message);
      }
      
    }
  
  
   useEffect(()=>{
    userinfo();
  
   },[])
  return (
    <>
    { auth? 
    <ul className="profile-ul">
      <img className="avatar-img" src={user.avatarUrl} alt="img" onClick={toggleMenu}/>
      <div className="sub-menu-wrap" id="subMenu">
                <div className="sub-menu">
                    <Link to="/profile" className="user-info">
                        See Profile
                    </Link>
                    <hr/>

                    <Link to="/editprofile" className="sub-menu-link">
                        Edit Profile
                        </Link>

                  <Link to="/logout" className="sub-menu-link" onClick={logout}>
                       Logout
                         </Link>

                </div>
            </div>
    </ul>:
    <ul>
        <Link to='/login'>
      <button className='botn'>Login</button>
    </Link>
    <Link to='/signup'>
      <button className='botn'>Sign Up</button>
    </Link>
    </ul>}
     </>
  );
}