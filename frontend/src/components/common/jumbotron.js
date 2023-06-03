import React from "react";
import { Link } from "react-router-dom";

const Jumotron = () => {
  return (
    <div className="jumbotron text-center my-5">
      <h1 className="display-3 text-center my-3">Community</h1>
      <p className="lead mx-3 my-3 text-center font-size-lg">We &lt;3 people who code!</p>
      <hr className="my-4" />
      <p className="lead mx-3">A disscussion forum for enthusiastic developers.</p>
      <div className="col md-12 text-center">
      <button className="btn btn-primary">
        <Link className="abcde" to="/discussions/dashboard">DASHBOARD &rarr;</Link>
      </button>
      </div>
    </div>
  );
};

export default Jumotron;