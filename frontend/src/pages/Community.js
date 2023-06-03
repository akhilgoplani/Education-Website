import React, { useContext } from 'react'
import { AppContext } from '../context/apiContext';
import Search from "../components/community/Search";
import Pagination from "../components/community/Pagination";
import "./community.css"
import { Link } from 'react-router-dom';
import Footer from "./../components/Footer/Footer"
import Navbar from "./../components/Navbar/Navbar"
import image from "../images/bg3.jpeg"



const Community = () => {
  const { hits, isLoading } = useContext(AppContext);
 return (
    <>
   
      <Navbar/>
      <div className="contain">
      <Search />
      <Pagination />
      <h2 className="ml"><b>NEW TECH POSTS</b></h2>
        <div className="stories-div">
          {hits.map((curPost) => {
            const { title, author, objectID, url, num_comments } = curPost;
            return (
              <div className="ab" key={objectID}>
                <h2 className="cd">{title}</h2>
                <p className="ef">
                  By <span> {author}</span> | <span> {num_comments} </span>
                  comments
                </p>
                <div className="gh">
                  <a href={url} target="_blank">
                    Read More
                  </a>

                </div>
              </div>
            );
          })}
        </div>
        <h3 className="text-center my-3 mn"><b>Have some doubts?? &rarr; Want to discuss!!</b></h3>
        <div className=" d-flex justify-content-center">
        
        <button className="btn btn-lg btn-primary btn-outline-light my-3 mnb">
          <Link to="/discussions/dashboard" className="abcde">Go to discussions</Link>
        </button>
        </div>
        <Footer/>
       
        </div>
       

       
      </>
      );
    }




export default Community