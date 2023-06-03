import React from 'react'
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar.js'
import image from "../../images/bg1.jpeg"
import Hero from "./Hero"
import "./Home.css"

import CardSlider from '../../components/Card/CardSlider'
import Footer from '../../components/Footer/Footer'







const Home = () => {
  

  return (
   <>
  
  <Navbar/>
   <Hero cName="hero" heroImg={image} title="IMAGINE, BELIEVE, ACHIEVE..." text="Education is what survives when what has been learned has been forgotten..." buttonText="Know More" url="/about" btnClass="show"/>
   <CardSlider className="cards" pageSize={4}/>
   <Footer/>
    </>
  
  )
}

export default Home