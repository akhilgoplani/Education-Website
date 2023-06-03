import React, { useEffect, useState } from 'react'

import "./Result.css"
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export default function ResultTable() {

    const [queue,setQueue]=useState(0);
   
    const [message,setMessage]=useState('')
   
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        setMessage(event.target.value);
      };
    

    useEffect(()=>{
        const fetchNum = async()=>{
           const response= await fetch(`http://localhost:2000/api/quiz/fetchallquiz`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
           
          });
          const json = await response.json() 
         
          setQueue(json.numQuizzes)

    }
    fetchNum();
}
    ,[])

    const totalPoints = queue; 

        const getResult = async () => {
          try {
            const response = await fetch(`http://localhost:2000/api/result/${message}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
              },
            });
      
            if (response.ok) {
              const result = await response.json();
             setResults(result)
            } else {
              throw new Error(`Failed to fetch result for quiz ${message}`);
              
            }
          } catch (error) {
            console.error(error);
          }
        };
      
       
      
      

    
  return (
    <>
    <Navbar/>
    <div className="rr">
       <h2 className="result-heading my-5"><b> Enter code of the quiz for which you want the results</b></h2>
        <textarea
    type="text" className="form-control"
    id="message"
    name="hide"
    onChange={handleChange}
    value={message}
  />

  <h2 className="result-heading my-5">Message: {message}</h2>
  <button className='btn btn-primary my-5' id="btn2" onClick={getResult}>Get Result</button>
        
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Username</td>
                    <td>Total Quiz points</td>
                    <td>Total questions</td>
                    <td>Total Earn points</td>
                </tr>
            </thead>
            <tbody>
               
                
            {results.length === 0 ? (
  <tr>
    <td colSpan="6" className="text-center">No data found</td>
  </tr>
) : (
  results.map((result, index) => (
    <tr key={index} className="table-body">
      <td>{result.name}</td>
      <td>{result.email}</td>
      <td>{result.user.name}</td>
      <td>{totalPoints || 0}</td>
      <td>{queue || 0}</td>
      <td>{result.score || 0}</td>
    </tr>
  ))
)}
                
                
            </tbody>
        </table>
    </div>
    <Footer/>
    </>
  )
}