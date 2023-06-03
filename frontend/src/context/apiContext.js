 import React, { useReducer,useEffect} from "react";
 import apiReducer from "../reducer/apiReducer";

 let API="https://hn.algolia.com/api/v1/search?";

 const initialState={

    query:"",
    hits:[],
    page:0,
    nbPages:0
 }
 const AppContext=React.createContext();

 const AppProvider=({children})=>{
    
    const [state,dispatch]=useReducer(apiReducer,initialState);

   

    const fetchapiData=async(url)=>{
      
        try{
            const res=await fetch(url);
            const data=await res.json();
          
           dispatch({type:"GET_STORIES",payload:{
            hits:data.hits,
            nbPages:data.nbPages,

           },})
             
        }
        catch(error)
        {
            console.log(error);
        }

    }
    const removePost = (post_ID) => {
        dispatch({ type: "REMOVE_POST", payload: post_ID });
      };
    
      
    
      // search
      const searchPost = (searchQuery) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: searchQuery,
        });
      };
    
      // pagination
      const getNextPage = () => {
        dispatch({
          type: "NEXT_PAGE",
        });
      };
    
      const getPrevPage = () => {
        dispatch({
          type: "PREV_PAGE",
        });
      };

    useEffect(()=>{
        fetchapiData(`${API}query=${state.query}&page=${state.page}`);
    },[state.query, state.page]);


    return (
        <AppContext.Provider value={{...state,removePost, searchPost, getNextPage, getPrevPage}}>{children}</AppContext.Provider>
    )
 };

 export {AppContext,AppProvider};