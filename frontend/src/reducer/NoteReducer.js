const NoteReducer = (state=[],action)=>{
    switch(action.type){
        case('SET_NOTES'):{
            return [...action.payload]
        }
        
        case('POST_NOTES'):{
            return [action.payload,...state]
        }
        case('DELETE_NOTES'):{
            const filtered = state.filter(ele=>ele._id!==action.payload._id)
            return [...filtered]
        }
        case ('EDIT_NOTES'):{
            return state.map((ele) =>
        ele._id === action.payload.id
          ? Object.assign(ele, {}, action.payload.data)
          : Object.assign(ele, {})
      );
        }
        default:{
            return [...state]
        }
    }
}

module.exports = NoteReducer;