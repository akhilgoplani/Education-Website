import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { EllipsisOutlined } from '@ant-design/icons';
import { Col,Card } from 'antd';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


const PublicNotes = () => {
  const [publicChapters, setPublicChapters] = useState([]);
 
 
  const queryParams = new URLSearchParams(window.location.search);
  const categoryName = queryParams.get('cat');

  const getShareableLinkFromURL = () => {
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const shareableLink = urlParts[urlParts.length - 2];
   

    // Assuming the shareable link is the last part of the URL
  
    return shareableLink;
  };
  
  // Usage
  const shareableLink = getShareableLinkFromURL();
  console.log(shareableLink); // The extracted shareable link from the URL

  useEffect(() => {
    // Make a request to the backend API to retrieve public notes
    axios.get(`http://localhost:2000/api/chapter/public/${shareableLink}`)
      .then(response => {
        setPublicChapters(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <h1 style={{color:"black",textAlign:"center",backgroundColor:"",marginTop:"8px"}}>{categoryName}</h1> 
    <div style={{marginLeft:'auto',marginRight:'auto',textAlign:'center',display:"flex",flexWrap:"wrap"}}>
      
       
       {publicChapters.map((blog,index) => (
       
         <Col key={index} lg={8} md={12} xs={24}>
           
        <Card className="blog-card"
            hoverable
            style={{ width: 400, marginTop: 16,marginLeft:"20px"}}  
            actions={[

                <a href={`/post/${blog._id}`}> <EllipsisOutlined className="ico" style={{fontSize:'30px'}} /></a>,
            ]}
        >   <h2 style={{textAlign:"center"}}><b>{blog.chapter}</b></h2><hr/>
           
            <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
        </Card>
    </Col>
   
      ))}
     
    </div>
    <Footer/>
    </>
  );
};

export default PublicNotes;
