import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "./signup.css"

import image from "../images/avatar.jpeg"
import imagee from "../images/google.jpeg"

const Signup = (props) => {

  const googleAuth = () => {
    console.log('error');
		window.open(
			`http://localhost:2000/api/auth/google/callback`,
			"_self"
		);
	};
  const [credential, setcredential] = useState({ name:"", email: "", password: "", confirmpassword:"" });
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState(image);
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
};

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setPreviewSource(reader.result);
  };
};
  let history = useHistory();

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
        handleSubmit(reader.result);
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        
    };
};
  const handleSubmit = async (base64EncodedImage) => {
  
   
    const {name, email, password} = credential
    // console.log(credential);
    const response = await fetch("http://localhost:2000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,email, password ,avatar:base64EncodedImage}),
    });
    setFileInputState('');
    setPreviewSource('');
    console.log(credential);
    const json = await response.json();
    
    if(json.success){
   //save the auth token and redirect
        localStorage.setItem('token', json.authToken);
       
     
        history.push('/login');
        props.showAlert("Account created successfully", "success")

    }
    else{
    props.showAlert("Invalid Credentials", "danger")
    }
  };
  const onChange =(e)=>{
    setcredential({...credential, [e.target.name]: e.target.value})
  }
  return (
    <>
    <div className="updateProfileContainer">
                <div className="updateProfileBox">
                  <h2 className="updateProfileHeading">Sign Up</h2>
    
                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={handleSubmitFile}
                  >
                    <div className="updateProfileName">
                      
                      <input
                        type="text"
                        placeholder="name"
                        required
                        name="name"
                        
                        onChange={onChange}
                      />
                    </div>
                    <div className="updateProfileEmail">
                       
                     
                      <input
                        type="email"
                        placeholder="email"
                        required
                        name="email"
                        
                        onChange={onChange}
                      />
                    </div>
                    <div className="updateProfileEmail">
                       
                     
                       <input
                         type="password"
                         placeholder="password"
                         required
                         name="password"
                         
                         onChange={onChange} minLength={5}
                       />
                     </div>
                     <div className="updateProfileEmail">
                       
                     
                       <input
                         type="password"
                         placeholder="confirm password"
                         required
                         name="password"
                         
                         onChange={onChange}
                         minLength={5}
                       />
                     </div>
                     <div id="updateProfileImage">
                     {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '50px' }}
                />
            )}
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                  </div>
    
                    
                    <input
                      type="submit"
                      value="Submit"
                      className="updateProfileBtn"
                    />

<button className="google-btn" onClick={googleAuth}>
						<img src={imagee} alt="google icon" />
						<span>Sign up with Google</span>
					</button>
                  </form>
                  
                </div>
                <div className="login-page">
      <h3 className="some-text">Already registered?</h3>
      <Link to="/login" className="gotologin">Login</Link>
      </div>
              </div>
    </>
    
  );
};

export default Signup;