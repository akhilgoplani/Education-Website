import axios from 'axios'

export const getNotes = (notes) => {
    return { type: "GET_NOTES", payload: notes };
  };
  

export const setNotes = (notes)=>{
    return{type:'SET_NOTES',payload:notes}
}
export const postNotes = (notes)=>{
    return {type:'POST_NOTES',payload:notes}
}
export const editNotes = (data, id) => {
    return {
      type: "EDIT_NOTES",
      payload: {
        id,
        data,
      },
    };
  };

export const deleteNotes = (notes)=>{
    return {type:'DELETE_NOTES',payload:notes}
}

export const startGetNotes = (dispatch)=>{
    return(dispatch)=>{
        axios.get('http://localhost:2000/api/notes',{
            headers:{
                'auth-token':localStorage.getItem('token')
        }})
            .then(res=>{
                const notes = res.data
                dispatch(setNotes(notes))
               
            })
            .catch(err=>alert(err))
    }
}
export const startPostNotes = (formdata)=>{
    console.log(formdata)
    return(dispatch)=>{
        axios.post('http://localhost:2000/api/notes',formdata,{
            headers:{
                'auth-token':localStorage.getItem('token')
        }})
            .then(res=>{
                const notes = res.data
                console.log(notes);
                dispatch(postNotes(formdata))
            })
            .catch(err=>alert(err))
    }
}

export const startDeleteNotes = (id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:2000/api/notes/${id}`,{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        }).then(res=>{
                const notes = res.data
                dispatch(deleteNotes(notes))
            })
            .catch(err=>alert(err))
    }
}
export const startEditNotes = (formdata,id)=>{
    return(dispatch)=>{
        axios.put(`http://localhost:2000/api/notes/${id}`,formdata,{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        }).then(res=>{
                const notes = res.data
                dispatch(editNotes(formdata,id))
            })
            .catch(err=>alert(err))

          
    }
}