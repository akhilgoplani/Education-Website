import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import imagee from "../images/google.jpeg"

const Login = (props) => {

  const googleAuth = () => {
		window.open(
			`http://localhost:2000/api/auth/google/callback`,
			"_self"
		);
	};
  const [credential, setcredential] = useState({ email: "", password: "" });
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:2000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credential.email, password:credential.password }),
    });
    const json = await response.json();
    if(json.success){
    
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        localStorage.setItem("user", JSON.stringify(response.data));
        

        // console.log("authToken", localStorage.getItem('token'))
        history.push('/');
        props.showAlert("Logged In successfully", "success")

    }
    else{
      props.showAlert("Invalid Details", "danger")
    }
  };
  const onChange =(e)=>{
    setcredential({...credential, [e.target.name]: e.target.value})
  }
  return (
    <>
    <div className="updateProfileContainer">
                <div className="updateProfileBox">
                  <h2 className="updateProfileHeading">Login</h2>
    
                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <div className="updateProfileName">
                      
                      <input
                        type="email"
                        placeholder="email"
                        required
                        name="email"
                        defaultValue={credential.email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="updateProfileEmail">
                       
                     
                      <input
                        type="password"
                        placeholder="password"
                        required
                        name="password"
                        defaultValue={credential.password}
                        onChange={onChange}
                      />
                    </div>
    
                    
                    <input
                      type="submit"
                      value="Submit"
                      className="updateProfileBtn"
                    />
                    <button className="google-btn" onClick={googleAuth}>
                    <img src={imagee} alt="google icon" />
                    <span>Sign in with Google</span>
                  </button>
                  </form>
                </div>
              </div></>
   
  );
};

export default Login;