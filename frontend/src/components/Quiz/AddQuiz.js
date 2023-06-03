import React, { useContext, useRef } from "react";
import { useState } from "react";
import quizContext from "../../context/quizContext";
import {Link, useLocation} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";



const AddQuiz = () => {
  const context = useContext(quizContext);
  const { addQuiz, editCode } = context;
  const location=useLocation();



  // const [user, setUser] = useState({ user: ""})

  // const getUser = (currentUser) => {
  //   ref.current.click();
  //   setUser({
  //     user :currentUser.user,
  //   })
  


  const [quiz, setQuiz] = useState({
    id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    title: "",
    code:""
  });
  const handleClick = (e) => {
    e.preventDefault(); //page doesn't get reload

    addQuiz(
      quiz.question,
      quiz.option1,
      quiz.option2,
      quiz.option3,
      quiz.option4,
      quiz.answer,
      quiz.title,
      code
    );
    setQuiz({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      title: "",
     
      
    });
   // props.showAlert("Added Successfully", "success");
  };

  // const ref = useRef(null);
  // const refClose = useRef(null);

  var code;
  const [gcode, setGcode] = useState("")


const test = () =>{
  // generate code
  toast.success("Quiz published Successfully. Copy the code and share with your friends")
  const publish = ()=>{
    var len = 6;
    var arr = "1234567890qwertyuiopasdfghjklzxcvbnm"
    var ans= "";
    for (var i = len; i > 0; i--) {
			ans+=
			arr[Math.floor(Math.random() * arr.length)];
		}
    console.log(ans);
    
    code = ans;
    console.log(code, "CODE");
    setGcode(code);
  }
  publish();
  // console.log(code, "OUTSIIDE");


  // add code to the questions
  const editTESTCode =()=>{
    //console.log('updating quiz...', quiz);
    editCode( code )
    console.log(code, "INSIDE EDITCODE")
   // props.showAlert("Quiz Published Successfully... Copy the code and share with your friends to play the quiz!!", "success");
  }
  editTESTCode()

}
  



  const onChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value }); 
  };
  return (
    
    <>
     
    
      <div className="container my-3">
        <ToastContainer/>
       
        <h2><b>Add your Quiz</b></h2> 
        <Link to="/playquiz" className="btn btn-primary float-end" tabIndex="-1" role="button" >Play Quiz</Link>
        
       
      
            
        {/* http://localhost:1000/api/quiz/codeupdate */}
        <a onClick={test} className="btn btn-primary " tabIndex="-1" role="button">Publish</a>
        <h3 className="my-3 text-success text-center"><b>Click on publish to generate a code for your quiz</b> </h3>
        <h3 className="text-center text-success"><b>{gcode}</b></h3>
        
        

        
        <div className="mb-3 my-2">
          <label htmlFor="title" className="form-label">
            {" "}
            <b>Question{" "}</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="question"
            name="question"
            onChange={onChange}
            value={quiz.question}
            minLength={5}
            required
            placeholder="write your Question here"
          />
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              {" "}
              <b>Title{" "}</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              value={quiz.title}
              minLength={5}
              required
              placeholder="Enter the title"
            />
          </div>
        </div>

        <h4 className="text-center my-3"><b>YOUR OPTIONS</b></h4>
        <p className="text-center my-3"><b>Note : If true/false kind of question enter N in remaining options</b></p>

        <div className="row gx-5">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
                <b>Option 1{" "}</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="option1"
                name="option1"
                onChange={onChange}
                value={quiz.option1}
                
                required
                placeholder="Enter the option1"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
                <b>Option 2{" "}</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="option2"
                name="option2"
                onChange={onChange}
                value={quiz.option2}
               
                required
                placeholder="Enter the option2"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
                <b>Option 3{" "}</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="option3"
                name="option3"
                onChange={onChange}
                value={quiz.option3}
                placeholder="Enter the option3"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {" "}
               <b> Option 4{" "}</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="option4"
                name="option4"
                onChange={onChange}
                value={quiz.option4}
                placeholder="Enter the option4"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <b>{" "}
              Answer of the above question{" "}</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="answer"
              name="answer"
              onChange={onChange}
              value={quiz.answer}
              minLength={5}
              required
              placeholder="Enter the answer"
            />
          </div>

         
        </div>


        

        <button
          type="submit"
          className="btn btn-dark"
          onClick={handleClick}
        >
          Add Quiz
        </button>
       
      </div>
    </>
  );
};

export default AddQuiz;