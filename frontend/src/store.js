import {createStore , combineReducers, applyMiddleware} from 'redux'
//import usersReducer from '../reducers/usersReducer'
import notesReducer from './reducer/NoteReducer'
import categoryReducer from './reducer/CategoryReducer'
import thunk from 'redux-thunk'
import resultReducer from './reducer/resultReducer'


const configStore = ()=>{
    const store = createStore(combineReducers({
        // users:usersReducer,
        notes:notesReducer,
        category:categoryReducer,
        result:resultReducer
        
    }),applyMiddleware(thunk))
    return store
}

export default configStore