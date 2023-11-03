import Task from './task.jsx'
import './create.css'
import { useState } from 'react'

export default function Createtodo() {
    let [num, setNum] = useState(0);

    return (
        <>
            <h4 className="header">Add Todo</h4>
            <input className="input" type="text" id="newInput" placeholder="Add New Todo"/>
            <button className="btn" onClick={() => {
                const inp = document.getElementById('newInput');
                let inpVal = inp.value;
                
                if (inpVal !== '') {
                    setNum(num + 1);
                }  
            }}>Submit</button>

        </>
    )
}

// Pre create x amount of tasks, set the visibility to invisible with styles, use state to make visible

