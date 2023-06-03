import React, { useContext } from "react";
import quizContext from "../../context/quizContext";
import 'bootstrap/dist/css/bootstrap.css'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const QuizItem = (props) => {
const context = useContext(quizContext);
const { deleteQuiz } = context;
  const { quiz, updateQuiz } = props;
  return (
    <div className="col-md-6 gx-1">
      <div className="card my-3 shadow-lg p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h5 className="card-title">{quiz.question}</h5>
          <div className="row gx-2">
            <div className="col">
              <ul><li>{quiz.option1}</li></ul>
            </div>
            <div className="col">
            <ul><li>{quiz.option2}</li></ul>
            </div>
            {quiz.option3!='N'?
            <div className="col">
            <ul><li>{quiz.option3}</li></ul>
            </div>:''}
           { quiz.option4!='N'?<div className="col">
            <ul><li>{quiz.option4}</li></ul>
            </div>:''}
          </div>
          <div className="row my-1">
            <div className="col">Answer is : {quiz.answer}</div>
          </div>
          
          <div className="row my-1">
            <div className="col">Title : {quiz.title}</div>
          </div>
           <DeleteOutlined style={{fontSize:"25px"}} onClick={()=>{deleteQuiz(quiz._id); props.showAlert("deleted successfully","success")}}/>&nbsp;&nbsp;&nbsp;&nbsp;
          <EditOutlined style={{fontSize:"25px"}} onClick={()=>{updateQuiz(quiz)}}/> 
        </div>
      </div>
    </div>
  );
};

export default QuizItem;