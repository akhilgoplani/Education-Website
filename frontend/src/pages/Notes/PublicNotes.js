import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
const useStyles = makeStyles({
    root: {
      maxWidth: 375,
      marginTop: 15,
     maxHeight:375,
      
      marginLeft:'auto',
      marginRight:"auto",
      textAlign:"center"
      
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const PublicNotes = () => {
  const [publicNotes, setPublicNotes] = useState([]);
  const classes=useStyles();

  const getShareableLinkFromURL = () => {
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const shareableLink = urlParts[urlParts.length - 1]; // Assuming the shareable link is the last part of the URL
  
    return shareableLink;
  };
  
  // Usage
  const shareableLink = getShareableLinkFromURL();
  console.log(shareableLink); // The extracted shareable link from the URL

  useEffect(() => {
    // Make a request to the backend API to retrieve public notes
    axios.get(`http://localhost:2000/api/notes/public/${shareableLink}`)
      .then(response => {
        setPublicNotes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <div>
      <h1 style={{textAlign:"center"}}>Notes</h1>
      {/* Display the public notes */}
      {publicNotes.map((note,i) => (
        <div style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}} key={i}>
              <Card
                      className={classes.root}
                      variant="outlined"
                      style={{
                        background: i % 2 === 0 ? "#EC7063" : "#A569BD",
                        boxShadow:50
                      }}
                    >
                      <h3 style={{ color: "white" }}>{note.title}</h3>
                      <CardContent>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{ color: "white" }}
                        >
                          {note.body}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{ color: "white" }}
                        >
                          {note.category?note.category.name:""}
                        </Typography>
                        
                      </CardContent>
                      </Card>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default PublicNotes;
