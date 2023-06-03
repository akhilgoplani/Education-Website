import Axios from "axios"

export const getCategory = (category) => {
    return { type: "GET_CATEGORY", payload: category };
  };

export const setCategory = (data)=>{
    return{type:'SET_CATEGORY',payload:data}
}
export const deleteCategory = (data)=>{
    return{type:'DELETE_CATEGORY',payload:data}
}
export const postCategory = (data)=>{
    return{type:'POST_CATEGORY',payload:data}
}
export const editCategory = (formData, id) => {
    return { type: "EDIT_CATEGORY", payload: { id: id, data: formData } };
  };


export const startGetCategory = (dispatch)=>{
    return (dispatch)=>{
            Axios.get('http://localhost:2000/api/category',{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        })
        .then(res=>{
            const category = res.data
            dispatch(setCategory(category))
        })
        .catch(err=>alert(err))
    }
}
export const startPostCategory = (formdata)=>{
    return (dispatch)=>{
            Axios.post('http://localhost:2000/api/category',formdata,{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        })
        .then(res=>{
            const category = res.data
            dispatch(postCategory(formdata))
        })
        .catch(err=>alert(err))
    }
}

export const startRemoveCategory=(id)=>{
    return (dispatch)=>{
        Axios.delete(`http://localhost:2000/api/category/${id}`,{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        })
        .then(res=>{
            const category = res.data
            dispatch(deleteCategory(category))
        })
        .catch(err=>alert(err))
    }
}


export const startCategoryEdit = (formData, id) => {
    return (dispatch) => {
      Axios
        .put(`http://localhost:2000/api/category/${id}`, formData, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          dispatch(editCategory(formData, id));
        });
    };
  };
  
  