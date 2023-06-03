import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import {EllipsisOutlined, SettingOutlined,EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Sidebar from '../Sidebar/Sidebar.js'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import "./bp.css"

const { Title } = Typography


function BlogPage() {

    const [blogs, setBlogs] = useState([])
    const [textbooks, setTextbooks] = useState([]);
    const [shareableLink, setShareableLink] = useState("");
    const location = useLocation();
    const categoryName = new URLSearchParams(location.search).get('cat');

    const handleGenerateLink = async () => {
        try {
         
          const response = await axios.post(`http://localhost:2000/api/chapters/generate-link/?cat=${categoryName}`,{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        });
          const  shareableLink  = response.data
          console.log(shareableLink);
          setShareableLink(shareableLink);
        } catch (error) {
          console.log(error);
          console.error(error);
         
        }
      };

    const deletePost=async(id) => {
        // API Call
       await axios.delete(`http://localhost:2000/api/removePost/${id}`, {
        
          headers: { 
           
            "auth-token": localStorage.getItem('token')
          }
        }).then(response => {
                if (response.data.success) {
                    const newBlogs = blogs.filter((blogs) => { return blogs._id !== id })
                    setBlogs(newBlogs);
                } else {
                    alert('Couldnt remove');
                }
            })
       
      }

    useEffect(() => {
        axios.get(`http://localhost:2000/api/getBlogs/?cat=${categoryName}`,{
            headers:{
                'auth-token':localStorage.getItem('token')
            } 
        },)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })
    },[categoryName])

    const renderCards = blogs.map((blog, index) => {
        return <Col key={index} lg={8} md={12} xs={24}>
           
            <Card className="blog-card"
                hoverable
                style={{ width: 310, marginTop: 16}}  
                actions={[
                    <DeleteOutlined className="ico" style={{fontSize:'30px'}} onClick={()=>deletePost(blog._id)}/>,

                    <a href={`/post/${blog._id}`}> <EllipsisOutlined className="ico" style={{fontSize:'30px'}} /></a>,
                ]}
            >   <h2 style={{textAlign:"center"}}><b>{blog.chapter}</b></h2><hr/>
               
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </Card>
        </Col>
    })

    useEffect(() => {
        const getTextbooks = async (e) => {
           
            const res = await axios.get("http://localhost:2000/api/bookName")
            setTextbooks(res.data)
        }
        getTextbooks();
    })
    

    const baseUrl = `http://localhost:3000/chapters/public/`; 
    return (
        <>
        <Navbar/>
        <div style={{ display:'flex' }}>
            <Sidebar/>
            <div style={{ width: '100%', marginLeft: '20px',position:"relative"}}>
            <h1 style={{color:"black",textAlign:"center",backgroundColor:"",marginTop:"8px"}}>{categoryName}</h1> 
            <div style={{display:'flex',flexDirection:'column'}}>
            <button style={{}} className="btn btn-lg btn-primary btn-outline-light my-3">
          <Link to={`/create/?cat=${categoryName}`} className="abcde">Add New Chapter</Link>
              </button>
              <button style={{backgroundColor: '#4CAF50', /* Green */
  border: 'none',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize:'16px',marginLeft:'60px',marginRight:'20px'}} onClick={handleGenerateLink}>Generate Sharable Link</button>
  </div>
  {shareableLink && typeof shareableLink === 'string' && (
        <div style={{textAlign:"center",marginTop:"8px"}}>
         <a style={{color: 'blue', textDecoration: 'underline'}} href={baseUrl + `${shareableLink}/?cat=${categoryName}`}>{baseUrl + `${shareableLink}/?cat=${categoryName}`}</a>
          <p style={{color:"red",fontWeight:"bold"}}>Share this link with others to access this textbook's public chapters.</p>
        </div>
      )}
  
            <Row style={{display:"flex",flexWrap:"wrap"}} className="rowse" gutter={[32, 16]}>
                {renderCards}
            </Row>
            </div>
           
            
        </div>
        <Footer/>
        </>
    )
}

export default BlogPage

