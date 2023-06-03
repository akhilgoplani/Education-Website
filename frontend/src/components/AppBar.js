import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import NoteIcon from "@material-ui/icons/Note";
import CategoryIcon from "@material-ui/icons/Category";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { connect } from "react-redux";
import zIndex from "@material-ui/core/styles/zIndex";
const HeadingText = styled.h6`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: ${(props) => props.fontSize}px;
  letter-spacing: 0.15px;
  color: #ffffff;
`;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    zIndex:9999,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    zIndex:1000,
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    textDecoration:"none"
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
   
  },
}));

function MainAppBar(props) {
  const classes = useStyles();
  
  return (
    <>
    <div className={classes.grow}>
      <AppBar position="relative" style={{ height: "70px",zIndex:1 }}>
        <Toolbar>
          <div>
            <HeadingText fontSize={18}>
              <b>Notes only</b>
            </HeadingText>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/notes" style={{color:"white"}}>
              
                Add Notes
              
            </Link>&nbsp;&nbsp;&nbsp;
          </div>
          <div className={classes.sectionDesktop}>
            <Link className={classes.abc} to="/category" style={{color:"white"}}>
              
                Add Category
              
            </Link>
          </div>
         
        </Toolbar>
      </AppBar>
    </div>
    </>
  );
}

export default connect()(MainAppBar);