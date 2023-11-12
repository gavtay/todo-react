import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import './App.css'

const checkBtn = <FontAwesomeIcon id="check" icon={faCheck} style={{color: "#00ff00", pointerEvents: 'none'}} />
const xBtn = <FontAwesomeIcon id="x" icon={faX} style={{color: "#ff0000", pointerEvents: 'none'}} />

export default function App() {
  const [toDoList, setToDoList] = useState([]);
  // const [filter, setFilter] = useState('');

  // render specific tasks based on the filter
  // function filterTodoChange(event) {
  //   setFilter(event.target.value);
  // }

  // Show filtered tasks
  // function renderTasks() {
  //   let newArray = toDoList.slice();
        
  //   newArray = newArray.filter((todo) => {
  //     let str = todo.title.toLowerCase();
  //     let filt = filter.toLocaleLowerCase();

  //     if (str.includes(filt)) {
  //       return todo;
  //     }
  //   })

  //   newArray = newArray.map((inp, ind, arr) => { // first argument is value, second argument is index, third arg is entire array
  //     return (
  //       <>
  //         <div className="task-container"> 
  //           <p className="text" id="text-content">
  //             {
  //               inp.complete ? `\u2713 ---  ${inp.title}  --- \u2713` : inp.title                    
  //             }
  //           </p>
  //           <button className="check-btn" id="first" onClick={() => {completeTask(ind)}}>
  //             {checkBtn}
  //           </button>
  //           <button className="del-btn" id="second" onClick={()=> {deleteTask(ind, arr)}}>{xBtn}</button>
  //         </div>        
  //       </>
  //     );
  //   })
  //   return newArray;
  // }

  // Creates new todo task
  function createTodo(text) {
    let todo = {
      title: text,
      complete: false
    }
    setToDoList([...toDoList, todo]);
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

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <div className="main">
          <AddToDo createTodo={createTodo}/>
          {/* <div className='filterTasks'>
            <h4 id='filter-input-header'>Filter Tasks by Name</h4>
            <input
              className="input"
              type="text"
              id="filter-input"
              placeholder="Add New Todo"
              maxLength='120'
              value={filter}
              onChange={filterTodoChange}
            />
          </div> */}
          <div className='tasks-container'>
            <h4 id='task-header'>Tasks</h4>
            {
              toDoList.map((inp, ind, arr) =>
                <ShowToDoList 
                  value={inp} 
                  index={ind} 
                  array={arr}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                />
              )
            }
          </div>
          <ChangeCompletedToDo 
            toDoList={toDoList} 
            deleteCompletedTasks={deleteCompletedTasks}
          />
        </div>
      </div>
    </>
  );
}

export function AddToDo({createTodo}) {
  const [text, setText] = useState('');
  let textCount = text.length;

  // saves text in input, stores the value in text state
  function addTaskInputChange(event) {
    setText(event.target.value);
  }

  // Toggle the view for the submit button
  function submitButtonVisibility() {
    if (textCount === 0) {
      return null;
    }
    else {
      return <button id="submit-btn" onClick={()=> {
        createTodo(text);
      }}>Submit</button>
    }
  }

  return (
    <>
      <h4 className="header">Add Todo</h4>
      <input
        className="input"
        type="text"
        id="newInput"
        placeholder="Add New Todo"
        maxLength='120'
        value={text}
        onChange={addTaskInputChange}
      />
      <div id="submit-p-container">
        <p id="char-count">{textCount} / 120</p>
        {submitButtonVisibility()}
      </div>
    </>
  )
}

export function ShowToDoList({ value, index, array, completeTask, deleteTask}) {
  return (
    <>
      <div className="task-container"> 
        <p className="text" id="text-content">
          {
            value.complete ? `\u2713 ---  ${value.title}  --- \u2713` : value.title                    
          }
        </p>
        <button className="check-btn" id="first" onClick={() => {completeTask(index)}}>
          {checkBtn}
        </button>
        <button className="del-btn" id="second" onClick={()=> {deleteTask(index, array)}}>{xBtn}</button>
      </div>        
    </>
  )
}

export function ChangeCompletedToDo({ toDoList, deleteCompletedTasks }) {
  // Show # of completed todos
  let getObjectName = (obj) => {
    return obj.complete ? true: false;
  }
  const completedTodos = toDoList.filter(getObjectName);
  const completedCount = completedTodos.length;

  if (completedCount === 0) {
    return null;
  }

  return (
    <>
      <div id='completed-container'>
        <p>Completed Todos: </p>
        <p id='amt-completed'>{completedCount}</p>
        <button id='del-completed' onClick={()=>{deleteCompletedTasks()}}>Delete Completed</button>
      </div>
    </>
  )
}

