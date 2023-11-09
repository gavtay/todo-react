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
    setText('');
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

  // delete task
  function deleteTask(index, toDoArray) {
    let newToDoArray = toDoArray.slice();
    let taskToDelete = toDoArray[index];

    newToDoArray = newToDoArray.filter((toDo) => {
      return toDo !== taskToDelete;       
    });

    setToDoList(newToDoArray);
  }

  // delete all completed tasks
  function deleteCompletedTasks() {
    let newArray = toDoList.slice();

    newArray = newArray.filter((toDo) => {
      return toDo.complete !== true;
    })

    setToDoList(newArray);
  }

  // Toggle the view for the submit button
  function submitButtonVisibility() {
    if (textCount === 0) {
      return null;
    }
    else {
      return <button id="submit-btn" onClick={createTodo}>Submit</button>
    }
  }

  // Toggle the completed todo count and delete completed buttons
  function changeCompletedTodoVisibility() {
    if (toDoList.length === 0) {
      return null;
    }
    else {
      return (
        <>
          <p>Completed Todos: </p>
          <p id='amt-completed'>{numberOfCompletedTodos}</p>
          <button id='del-completed' onClick={()=>{deleteCompletedTasks()}}>Delete Completed</button>
        </>
      )
    }
  }

  // Show # of completed todos
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
            <p id="char-count">{textCount} / 120</p>
            {submitButtonVisibility()}
          </div>
          {
            toDoList.map((inp, ind, arr) => { // first argument is value, second argument is index, third arg is entire array

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
                  <button className="del-btn" id="second" onClick={()=> {deleteTask(ind, arr)}}>{xBtn}</button>
                </div>        
              );
            })
          }
          <div id='completed-container'>
            {changeCompletedTodoVisibility()}
          </div>
        </div>
      </div>
    </>
  );
}

