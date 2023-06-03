import React, { useEffect, useState} from 'react'
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import "./Editprofile.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import image from "../images/avatar.jpeg"

const Editprofile = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  
  const [selectedFile, setSelectedFile] = useState();

    const [user,setUser]=useState([]);
    const history=useHistory();

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
  };

  const userinfo = async () => {
    
   
    const response = await fetch("http://localhost:2000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
     
    });
    console.log(response);
    
    const abc = await response.json();
    setUser(abc);
    console.log(user);
  
 }

 
  const imag=user.avatarUrl
 const [previewSource, setPreviewSource] = useState(image);


  
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) 
    userupdate('');
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
        userupdate(reader.result);
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        
    };
};
   
 
   
  const userupdate = async (base64EncodedImage) => {
   


    
    const response = await fetch("http://localhost:2000/api/auth/updateprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({avatar:base64EncodedImage})
     
    });
    console.log(response);
    const json=await response.json();
    if(json.success){
    
      
      history.push('/');
     

  }
  else{
    console.log(json.error);
  }
};
const onChange =(e)=>{
  setName({...name, [e.target.name]: e.target.value})
  setEmail({...name, [e.target.name]: e.target.value})
 
  
}
    

 useEffect(()=>{
 
  userinfo();
 
  
  
 },[])
 
  return (
          <>
          
            
              <div className="updateProfileContainer">
                <div className="updateProfileBox">
                  <h2 className="updateProfileHeading">Update Profile</h2>
    
                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={handleSubmitFile}
                  >
                    <div className="updateProfileName" >
                    <FaceIcon/>
                      
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        defaultValue={user.name}
                        onChange={onChange}
                      />
                    </div>
                    <div className="updateProfileEmail">
                      <MailOutlineIcon/>
                       
                     
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        defaultValue={user.email}
                        onChange={onChange}
                      />
                    </div>
                    <div id="updateProfileImage">
                     {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    defaultValue={image}
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
                      value="Update"
                      className="updateProfileBtn"
                    />
                  </form>
                </div>
              </div>
            </>
          
       
  )
}

export default Editprofile
