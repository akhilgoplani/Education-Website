import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Typography } from 'antd';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
const { Title } = Typography

function PostPage(props) {

    const [post, setPost] = useState([])
    const postId = props.match.params.postId;

    useEffect(() => {

        const variable = { postId: postId }

        axios.post('http://localhost:2000/api/getPost',variable, {
            headers:{
                'auth-token':localStorage.getItem('token')
            } 
        })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.post)
                    setPost(response.data.post)
                } else {
                    alert('Couldnt get post')
                }
            })
    }, [])

   
        return (
            <>
            <Navbar/>
            <div className="postPage" style={{ width: '80%', margin: '3rem auto' }}>
               
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Title style={{letterSpacing:"2px"}} level={4}>{post.createdAt}</Title>
                </div>
                <h2 style={{textAlign:"center"}}><b>{post.chapter}</b></h2><hr/>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

            </div>
            <Footer/>
            </>
        )
    
    

}

export default PostPage