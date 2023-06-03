import React, { useContext, useEffect, useState } from 'react'
import './Result.css';
import { Link } from 'react-router-dom';
import quizContext from "../../context/quizContext";

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../../helper/helper';



import { resetResultAction } from '../../reducer/resultReducer';
import { usePublishResult } from '../../utils/result-action';


export default function Result() {
    const [queue,setQueue]=useState(0);
   const [earnPoints,setEarnPoints]=useState(0);
   

    useEffect(async()=>{
        const fetchuNum = async()=>{
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
    fetchuNum();
}
    ,[])

    const getQuizResults = async (quizCode) => {
        const response = await fetch(`http://localhost:2000/api/result/${quizCode}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
      
        const result = await response.json();
        setEarnPoints(result.score);
        return result;
      };

    

    // const dispatch = useDispatch()
    // const {  result : { result, userId}}  = useSelector(state => state)

    const totalPoints = queue; 
    // const attempts = attempts_Number(result);
    // const earnPoints = earnPoints_Number(result, answers, 10)
    // const flag = flagResult(totalPoints, earnPoints)

  

    /** store user result */
    // usePublishResult({ 
    //     result, 
    //     user : userId,
    //     attempts,
    //     points: earnPoints,
    //     achived : flag ? "Passed" : "Failed" });

    // function onRestart(){
      
    //     dispatch(resetResultAction())
    // }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>User</span>
                 {/* <span className='bold'>{userId || ""}</span> */}
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue || 0}</span>
            </div>
          
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
           
        </div>

      
        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>
    </div>
  )
}