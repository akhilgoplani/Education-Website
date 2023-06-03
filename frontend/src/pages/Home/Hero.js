import "./Home.css"

import React from 'react'
import { Link } from "react-router-dom"


const Hero = (props) => {
  
  return (
    <>
    <div className={props.cName}>
      
        <img src={props.heroImg} alt="HeroImg"/>
        <div className="heroText">
            <h1>{props.title} </h1>
            <p>{props.text}</p>
            <Link to={props.url} className={props.btnClass}>{props.buttonText}</Link>
        </div>
    </div>
    </>
  )
}

export default Hero