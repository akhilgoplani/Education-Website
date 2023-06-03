const CategoryReducer = (state=[],action)=>{
    switch(action.type){
        case('SET_CATEGORY'):{
            return [...action.payload]
        }
        case('DELETE_CATEGORY'):{
            const filtered = state.filter(ele=>ele._id!==action.payload._id)
            return [...filtered]
        }
        case('POST_CATEGORY'):{
            return [action.payload,...state]
        }
        case "EDIT_CATEGORY":{
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

module.exports = CategoryReducer