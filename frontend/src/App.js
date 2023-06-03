import React, { useEffect, useState } from 'react'
import axios from "axios"

 

import Home from "./pages/Home/Home.js"
import { BrowserRouter as Router,Switch,Route} from "react-router-dom"
import About from "./pages/About/About.js"
import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import Notes from './pages/Notes/Notes.js';
import Quiz from "./pages/Quiz.js"
import Alert from './components/Quiz/Alert.js'
import Profile from './components/Profile/Profile.js'
import PlayQuizEntry from './components/Quiz/PlayQuizEntry.js'
import Community from './pages/Community.js'
import Discussions from './pages/Discussions.js'
import Editprofile from './pages/Editprofile.js'
import Category from './pages/Notes/Category.js'
import BlogPage from './components/views/BlogPage/BlogPage.js'
import CreatePage from './components/views/BlogPage/Section.js/CreatePage.js'
import PostPage from './components/views/PostPage/PostPage.js'
import PublicPage from './components/views/PublicPage.js'

import ResultTable from './components/Result/ResultTable.js'
import PublicNotes from './pages/Notes/PublicNotes.js'









function App () {
  const[alert, setAlert] = useState(null);
 
 
  const showAlert =(message,type)=> {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setAlert(null)
    },1500)
  };
 const token=localStorage.getItem('token');
 const user=localStorage.getItem('user')


  return ( 
  <>
    
    
  <Router>
    <Switch>
   
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    
   
    <Route path="/login" render={(props) => <Login {...props} showAlert={showAlert} />}/>
     <Route path="/signup" render={(props) => <Signup {...props} showAlert={showAlert} />}/>
    

   
   <Route path='/notes' component={token||user?Notes:Login} exact={true}/>
   <Route path='/notes/public/:shareableLink' component={token||user?PublicNotes:Login}/>
   <Route path='/chapters/public/:shareableLink' component={token||user?PublicPage:Login}/>
          <Route path='/category' component={token||user?Category:Login} exact={true}/>
          <Route path="/textbook" component={token||user?BlogPage:Login}/>
          <Route path="/create" component={token?CreatePage:Login}/>
          <Route path="/post/:postId" component={token?PostPage:Login}/>
              <Route path="/quiz" component={token?Quiz:Login}/>
              <Route path="/profile" component={token?Profile:Login}/>
              <Route  path="/playquiz" component={token?PlayQuizEntry:Login}/>
                   <Route path="/quizResult" component={ResultTable}/>
                  <Route path="/community" component={token?Community:Login}/>
                  <Route path="/discussions" component={token?Discussions:Login}/>
                   <Route path="/editprofile" component={Editprofile}/>
   
   

            
       </Switch>
      </Router>
              
  </>
    
);
};
  
    
  


export default App