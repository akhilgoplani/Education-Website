import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Route, Switch, Redirect } from "react-router-dom";

import http from "../services/httpService";
import { api } from "../config";
import Dashboard from "../components/community/dashboard";
import Jumotron from "../components/common/jumbotron";
import NotFound from "../components/community/not-found";
import NewPost from "../components/community/createpost";
import ProtectedRoute from "../components/common/protectedRoute";
import PostPage from "../components/community/PostPage";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

 class Discussions extends Component{
  state = {};
  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user_jwt = jwtDecode(jwt);
      const user = await http.post(`${api.usersEndPoint}getuser`);
      console.log(user);
      this.setState({user: user.data });
    } catch (ex) {}
  }
  render() {
    return (
      <div>
        <Navbar/>

        {/* on the dashboard, have a quesry string parameter to 
       to find the method of sorting of posts.(using query string package) */}
        <Switch>
          
        
          
          <Route
            path="/discussions/dashboard"
            render={(props) => <Dashboard {...props} user={this.state.user} />}
          />
          <Route path="/discussions/not-found" component={NotFound} />
          <ProtectedRoute
            path="/discussions/new-post"
            render={(props) => <NewPost {...props} user={this.state.user} />}
          />
          <Route
            path="/discussions/post/:id"
            render={(props) => <PostPage {...props} user={this.state.user} />}
          />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Discussions;