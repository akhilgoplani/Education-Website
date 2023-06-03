import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import configStore from './store';
import {startGetNotes} from './utils/notes-action'
import {startGetCategory} from './utils/category-action'



import App from './App';
import { AppProvider } from './context/apiContext';
import { Provider } from 'react-redux';


const store = configStore()
store.subscribe(()=>console.log(store.getState()))
if(localStorage.getItem('token')){
    store.dispatch(startGetCategory())
    store.dispatch(startGetNotes())
   
   
    
}



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
   <AppProvider>
    <App />
    </AppProvider>
    </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);