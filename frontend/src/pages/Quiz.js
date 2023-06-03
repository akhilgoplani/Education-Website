import {Route} from "react-router-dom";

import Home from "../components/Quiz/Home";
import QuizState from "../context/QuizState";

import Alert from "../components/Quiz/Alert";

import PlayQuizEntry from "../components/Quiz/PlayQuizEntry";

import{ useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const Quiz=()=> {
  const[alert, setAlert] = useState(null);
  const showAlert =(message,type)=> { //to show alert messages
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setAlert(null)
    },1500)
  }
  return (
    <>
    <Navbar/>
      <QuizState>
          <Alert alert={alert}/>
          <div className="container">
           <Route path="/quiz" render={(props) => <Home/>}/>
          
              </div>
       
      </QuizState>
      <Footer/>
    </>
  );
}

export default Quiz;