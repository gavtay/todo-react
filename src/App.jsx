import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import './task.css'
import './create.css'
import './task.css'
import './App.css'

const checkBtn = <FontAwesomeIcon id="check" icon={faCheck} style={{color: "#00ff00", pointerEvents: 'none'}} />
const xBtn = <FontAwesomeIcon id="x" icon={faX} style={{color: "#ff0000", pointerEvents: 'none'}} />



export default function App() {

  // Creates new todo task
  function createTodo(_event) {
    setToDoList([...toDoList, text]);
    setCompleted([...completed, false]);
  }

  // saves text in input, stores the value in text state
  function handleChange(event) {
    setText(event.target.value);
  }

  // switch complete state value
  function changeCompleted(index) {
    let newArray = completed.slice();
    newArray[index] = !newArray[index];
    
    setCompleted(newArray);
  }
  
  // completes task and checkmarks the task for visible completion
  function completeTask(event) {  
    let btnElement = event.target.parentElement;
    let pElement = btnElement.firstElementChild;
    let textContent = pElement.innerHTML;
    
    let compIndex = toDoList.indexOf(textContent);
    let newList = toDoList.slice();
    
    changeCompleted(compIndex);

    // Figure out a way to run the change after the complete state runs 

    // useEffect(() => {
    //   if (completed[compIndex] === true) {
    //     newList[compIndex] = '\u2713 --- ' + textContent + ' --- \u2713';
    //     setToDoList(newList);
    //     return;
    //   }
    //   else {
    //     let newEle = newList[compIndex];
    //     newEle = newEle.slice(6, -6);
    //     newList[compIndex] = newEle;
    //     setToDoList(newList);
    //     return;
    //   }
    // }, [completed]);

    if (completed[compIndex] === true) {
      newList[compIndex] = '\u2713 --- ' + textContent + ' --- \u2713';
      setToDoList(newList);
      return;
    }
    else {
      let newEle = newList[compIndex];
      newEle = newEle.slice(6, -6);
      newList[compIndex] = newEle;
      setToDoList(newList);
      return;
    }
  }

  const [text, setText] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [completed, setCompleted] = useState([]);

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <div className="main">
          <h4 className="header">Add Todo</h4>
          <input className="input" type="text" id="newInput" placeholder="Add New Todo" value={text} onChange={handleChange}/>
          <button className="btn" onClick={createTodo}>Submit</button>
          {
            toDoList.map((inp)=> { // first argument is value, second argument is index, third arg is entire array
              return (
                <div className="task-container"> 
                  <p className="text" id="text-content">{inp}</p>
                  <button className="check-btn" id="first" onClick={completeTask}>{checkBtn}</button>
                  <button className="del-btn" id="second" onClick={()=>console.log('deleted task')}>{xBtn}</button>
                </div>        
              )})
          }
        </div>
      </div>
    </>
  );
}

