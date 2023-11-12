import { useState } from 'react'
import AddToDo from './AddToDo'
import ChangeCompletedToDo from './ChangeCompletedToDo'
import ShowToDoList from './ShowToDoList'
import './App.css'

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