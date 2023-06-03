import React from "react";
import { AppContext } from "../../context/apiContext";
import { useContext } from "react";
import "../../pages/community.css";

const Search = () => {
  const { query, searchPost } = useContext(AppContext)
  return (
    <>
      <div className="pr">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="pri">
          <input
            type="text"
            placeholder="search here"
            value={query}
            onChange={(e) => searchPost(e.target.value)}
          />
        </div>
      </form>
      </div>
    </>
  );
};

export default Search;