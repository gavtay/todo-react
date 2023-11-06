import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import './App.css'

const checkBtn = <FontAwesomeIcon id="check" icon={faCheck} style={{color: "#00ff00", pointerEvents: 'none'}} />
const xBtn = <FontAwesomeIcon id="x" icon={faX} style={{color: "#ff0000", pointerEvents: 'none'}} />

export default function App() {
  const [text, setText] = useState('');
  const [toDoList, setToDoList] = useState([]);

  // Creates new todo task
  function createTodo(_event) {
    let todo = {
      title: text,
      complete: false
    }
    
    setToDoList([...toDoList, todo]);
  }

  // saves text in input, stores the value in text state
  function handleChange(event) {
    setText(event.target.value);
  }

  // completes task and checkmarks the task for visible completion
  function completeTask(index) {  
    let copyArray = [...toDoList];
    let toDoAtIndex = copyArray[index];

    toDoAtIndex.complete = !toDoAtIndex.complete;
    
    setToDoList(copyArray); 
  }

  let getObjectName = (obj) => {
    return obj.complete ? true: false;
  }
  const completedTodos = toDoList.filter(getObjectName);
  const numberOfCompletedTodos = completedTodos.length;

  let textCount = text.length;

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <div className="main">
          <h4 className="header">Add Todo</h4>
          <input className="input" type="text" id="newInput" placeholder="Add New Todo" maxLength='120' value={text} onChange={handleChange}/>
          <div id="submit-p-container">
            <button className="btn" onClick={createTodo}>Submit</button>
            <p id="char-count">{textCount} / 120</p>
          </div>
          {
            toDoList.map((inp, ind) => { // first argument is value, second argument is index, third arg is entire array

              return (
                <div className="task-container"> 
                  <p className="text" id="text-content">
                    {
                      inp.complete ? `\u2713 ---  ${inp.title}  --- \u2713` : inp.title                    
                    }
                  </p>
                  <button className="check-btn" id="first" onClick={() => {completeTask(ind)}}>
                    {checkBtn}
                  </button>
                  <button className="del-btn" id="second" onClick={ function() { console.log('deleted task') } }>{xBtn}</button>
                </div>        
              );
            })
          }
          <p>Completed Todos: { numberOfCompletedTodos } </p>
        </div>
      </div>
    </>
  );
}

