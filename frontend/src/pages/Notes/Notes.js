import React from "react";
import { connect } from "react-redux";
import NotesForm from "./notes-form";
import { startDeleteNotes } from "../../utils/notes-action";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";

import MainAppBar from "../../components/AppBar";
import { startGetCategory } from "../../utils/category-action";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    maxWidth: 375,
    marginTop: 15,
    maxHeight: 375,
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

function Notes(props) {
  const classes = useStyles();
  const [dataId, SetDataId] = React.useState("");
  const [status, SetStatus] = React.useState("add");
  const [title, SetTitle] = React.useState("");
  const [body, SetBody] = React.useState("");
  const [showPublic, setShowPublic] = useState(false); 
  const [category, SetCategory] = React.useState("");
  const [shareableLink, setShareableLink] = useState("");
  
  
  
    const handleGenerateLink = async () => {
      try {
       
        const response = await axios.post(`http://localhost:2000/api/notes/generate-link`,{
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
  
  const handleEdit = (id, title, body, category) => {
    status === "add" ? SetStatus("edit") : SetStatus("add");
    status === "edit" ? SetStatus("add") : SetStatus("edit");
   
    SetTitle(title);
    SetBody(body);
    SetCategory(category);
    SetDataId(id);
    console.log(dataId, status);
  };

  const handleRemove = (id) => {
    props.dispatch(startDeleteNotes(id));
  };

  const handleBluring = (id) => {
    props.dispatch(startGetCategory());
  };
  const handleTogglePublic = () => {
    setShowPublic((prevShowPublic) => !prevShowPublic);
  };
  const baseUrl = "http://localhost:3000/notes/public/"; 

  return (
    <>
    <Navbar/>
      <MainAppBar />
      
      <div align="center" style={{ marginTop: "100px" }}>
      <div>
      <button style={{backgroundColor: '#4CAF50', /* Green */
  border: 'none',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize:'16px',marginTop:'0'}} onClick={handleGenerateLink}>Generate Sharable Link</button>
      {shareableLink && typeof shareableLink === 'string' && (
        <div style={{marginTop:"8px"}}>
         <a style={{color:"blue"}} href={baseUrl + shareableLink}>{baseUrl + shareableLink}</a>
          <p style={{color:"red",fontWeight:"bold"}}>Share this link with others to access the public notes.</p>
        </div>
      )}
    </div>
        <Grid container component="main">
          <Grid item xs={12} sm={3}>
            <Grid container justify="center">
              <NotesForm
                id={dataId}
                title={title}
                body={body}
                category={category}
                status={status}
                handleBluring={handleBluring}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Divider orientation="vertical" />
          </Grid>

          <Grid item xs={12} sm={5}>
            <div>
            
              {props.notes !== undefined &&
                props.notes.map((ele, i) => {
                  return (
                    <Card key={i}
                      className={classes.root}
                      variant="outlined"
                      style={{
                        background: i % 2 === 0 ? "#EC7063" : "#A569BD",
                        boxShadow:50
                      }}
                    >
                      <h3 style={{ color: "white" }}>{ele.title}</h3>
                      <CardContent>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{ color: "white" }}
                        >
                          {ele.body}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{ color: "white" }}
                        >
                          {ele.category?ele.category.name:""}
                        </Typography>
                        
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => handleRemove(ele._id)}
                          variant="outlined"
                          color="primary"
                        >
                          Remove
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            handleEdit(
                              ele._id,
                              ele.title,
                              ele.body,
                              ele.category?ele.category.name:'CATEGORY'
                            )
                          }
                        >
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer/>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};
export default connect(mapStateToProps)(Notes);