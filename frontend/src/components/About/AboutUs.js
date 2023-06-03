import React from 'react'
import "./About.css"
import {memo} from "react";

const AboutUs = () => {
  return (
    <div className="about-content" >
        <h1><b>Our Mission</b></h1>
        <h3><b>Increased Engagement</b></h3>
        <p> Interactivity makes learning more engaging and fun. When learners can interact with the content, they are more likely to stay focused and interested in the material.</p>
        <h3><b>Deeper Understanding</b></h3>
        <p> Interactivity can help learners to develop a deeper understanding of the material by allowing them to explore and manipulate concepts in a more hands-on way. </p>
        <h3><b>Greater Retention</b></h3>
        <p> Interactive learning is often more memorable than passive learning, which can improve retention of information over time. Interactive elements such as quizzes and games can also help learners to test their knowledge .</p>
        <h3><b>Customized Learning</b></h3>
        <p> Interactivity can allow learners to customize their learning experience to their individual needs and preferences.</p>
        <h3><b>Collaborative Learning</b></h3>
        <p>Interactivity can facilitate collaboration and knowledge-sharing among learners. Interactive elements such as discussion forums and group projects can help learners to exchange ideas, ask questions, and work together to solve problems.</p>
    </div>
  )
}

export default  memo(AboutUs)