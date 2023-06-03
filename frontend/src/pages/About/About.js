import React from 'react'
import Navbar from "../../components/Navbar/Navbar.js"
import image from "../../images/bg2.jpeg"
import Hero from "../Home/Hero.js"
import AboutUs from '../../components/About/AboutUs.js'
import Footer from '../../components/Footer/Footer.js'



const About = () => {
  return (
    <>
     <Navbar/>
     <Hero cName="hero" heroImg={image}  btnClass="hide"/>
     <AboutUs/>
     <Footer/>
    
    </>
  )
}

export default About;