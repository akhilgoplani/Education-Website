import React from 'react'
import "./Card.css"
import {memo} from "react";

const Card = ({title,description,imageUrl,newsUrl}) => {
    
    
  return (
    <>
    <div className="crd">
        <img  src={!imageUrl?"https://resizer.glanacion.com/resizer/KA7LNpWmpkZL43kZ--0-rUoHPpY=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/E6RNCV73YBAQPPGNPHLWSPW7UE.jpg":imageUrl} className="cardImg" alt=""/>
        <div className="cardBody">
            <h5 className="crd-title">{title}...</h5>
            <p className="crd-text">{description}....</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="buton">Read More</a>
        </div>
    </div>
    </>
  )
}

export default memo(Card)