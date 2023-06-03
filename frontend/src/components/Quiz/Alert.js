import React, { useEffect, useState } from 'react'

function Alert(props) {
  const [show, setShow] = useState(true)
    const capitalize = (word)=>{
      if (word==="danger"){
        word = "error"
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    useEffect(() => {
      const timeId = setTimeout(() => {
        
        setShow(true)
      }, 3000)
  
      return () => {
        clearTimeout(timeId)
      }
    }, []);
  
    
    if (!show) {
      return null;
    }
    return (
        <div style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert