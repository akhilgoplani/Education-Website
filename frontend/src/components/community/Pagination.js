import React from "react";
import { AppContext } from "../../context/apiContext";
import { useContext } from "react";

const Pagination = () => {
  const { page, nbPages, getPrevPage, getNextPage } = useContext(AppContext);
  return (
    <>
      <div className="pagination-btn">
        <button className="butn" onClick={() => getPrevPage()}>PREV</button>
        <p className="pagi">
          {page + 1} of {nbPages}
        </p>
        <button className="butn" onClick={() => getNextPage()}>NEXT</button>
      </div>
    </>
  );
};

export default Pagination;