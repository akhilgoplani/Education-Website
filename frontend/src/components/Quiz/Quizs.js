import React, {useEffect, useRef, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import quizContext from "../../context/quizContext";
import AddQuiz from "./AddQuiz";
import Quizitem from "./QuizItem";
import { Link } from "react-router-dom";


const Quizs = (props) => {

  const context = useContext(quizContext);
  const { quizs, getQuizs, editQuiz} = context;
  let history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')){
     getQuizs();
    }
    else{
      history.push("/login");
    }
   
    
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [quiz, setQuiz] = useState({id:"", equestion: "", eoption1: "",eoption2: "",eoption3: "",eoption4: "", eanswer: "", user: ""})

  const updateQuiz = (currentQuiz) => {
    ref.current.click();
    setQuiz({
      id:currentQuiz._id,
      equestion: currentQuiz.question, 
      eoption1: currentQuiz.option1,
      eoption2: currentQuiz.option2,
      eoption3: currentQuiz.option3, 
      eoption4: currentQuiz.option4,
      eanswer: currentQuiz.answer
    })
    
  };
  const handleClick =(e)=>{
    //console.log('updating note...', note);
    editQuiz(quiz.id, quiz.equestion, quiz.eoption1, quiz.eoption2, quiz.eoption3, quiz.eoption4, quiz.eanswer)
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  }

  const onChange =(e)=>{
    setQuiz({...quiz, [e.target.name]: e.target.value}) 
}
  
  return (
    <>
      <AddQuiz showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref} //use to give references
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo
      </button>
      {/* <!-- Modal --> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-2" id="exampleModalLabel">
                Edit Quiz
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <div className="container my-3">
        
        <div className="mb-3">
          <label htmlFor="title" className="form-label"> Question </label>
          <input
            type="text"
            className="form-control"
            id="equestion"
            name="equestion"
            value={quiz.equestion} 
            onChange={onChange}
            minLength={2} required
            placeholder="Enter the question"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option1 </label>
          <input
            type="text"
            className="form-control"
            id="eoption1"
            name="eoption1" 
            value={quiz.eoption1}
            onChange={onChange}
            minLength={2} required
            placeholder="Enter the option1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option2 </label>
          <input
            type="text"
            className="form-control"
            id="eoption2"
            name="eoption2" 
            value={quiz.eoption2}
            onChange={onChange}
            minLength={3} required
            placeholder="Enter the option2"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option3 </label>
          <input
            type="text"
            className="form-control"
            id="eoption3"
            name="eoption3" 
            value={quiz.eoption3}
            onChange={onChange}
           
            placeholder="Enter the option3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> option4 </label>
          <input
            type="text"
            className="form-control"
            id="eoption4"
            name="eoption4" 
            value={quiz.eoption4}
            onChange={onChange}
           
            placeholder="Enter the option4"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="answer" className="form-label"> Answer of the above question </label>
          <textarea
            type="text"
            className="form-control"
            id="eanswer"
            name="eanswer" 
            value={quiz.eanswer}
            onChange={onChange}
            minLength={3} required
            placeholder="Enter the answer"
          />
        </div>
      </div>

            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={quiz.equestion.length<2 || quiz.eoption1.length<2} onClick={handleClick} type="button" className="btn btn-primary">
               Update quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 gy-2">
        <h2><b>Your quizes</b></h2>
        <div className="container">
        {quizs.length===0 && 'No notes to display'}
        </div>
        {quizs.map((quiz) => {
          return (
            <Quizitem quiz={quiz} key={quiz._id} updateQuiz={updateQuiz} showAlert={props.showAlert}/>
          );
        })} 
        <div style={{textAlign:"center"}}>
        <Link  to="/quizResult">
        <button className='btn btn-primary my-5' id="btn2">
    See Results
  </button>
</Link>
</div>

      </div>
      
    </>
  );
};

export default Quizs;