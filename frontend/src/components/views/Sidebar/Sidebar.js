import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';



export default function Sidebar() {
    const [textbooks, setTextbooks] = useState([]);
    const [newTextbook, setNewTextbook] = useState("");

    const onPressAdd =  (e) => {
        
        
       const variables={
         name:newTextbook
       }
         
        axios.post('http://localhost:2000/api/bookName',variables,{
           headers: {
                'auth-token':localStorage.getItem('token'),
            }
        })
            .then(response => {
                if (response) {
                    console.log(response)
                
                }
                else{
                    console.log(response.err);
                }
            })
            
            setTextbooks([...textbooks,newTextbook]);
            setNewTextbook("");
            

    }

    const handleInputChange=(e)=>{
        setNewTextbook(e.target.value);

    }

    useEffect(() => {
        const getTextbooks = async (e) => {
           
            const res = await axios.get("http://localhost:2000/api/bookName",{
            headers: {
                'auth-token':localStorage.getItem('token'),
            }
        }
            )
            setTextbooks(res.data)
        }
        getTextbooks();
    })

  return (
    <div className="sidebar">
        <div className="sidebar__item">
        <input
            type="text"
            placeholder="New Textbook"
            
            onChange={handleInputChange}
          />
        <button className="tadd" onClick={()=>onPressAdd()}>Add</button>
            <span className="sidebar__title">TEXTBOOK NAMES</span>
            <ul className="sidebar__list">
                
                {textbooks.map((textbook) => (
                    <Link to={`/textbook/?cat=${textbook.name}`} className="link" key={textbook._id}>
                        <li className="sidebar__list__item">{textbook.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
        <div className="sidebar__item">
            <span className="sidebar__title">FOLLOW US</span>
            <div className="sidebar__social">
                <i className="sidebar__icon fa-brands fa-square-facebook"></i>
                <i className="sidebar__icon fa-brands fa-square-twitter"></i>
                <i className="sidebar__icon fa-brands fa-square-pinterest"></i>
                <i className="sidebar__icon fa-brands fa-square-instagram"></i>
            </div>
        </div>
    </div>
  )
}