import ChangeCompletedToDo from './ChangeCompletedToDo'
import FilterTasks from './FilterTasks'
import AddToDo from './AddToDo'
import { useState } from 'react'
import './App.css'

export default function App() {
  const [toDoList, setToDoList] = useState([]);

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
          <FilterTasks 
            toDoList={toDoList}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
          <ChangeCompletedToDo 
            toDoList={toDoList} 
            deleteCompletedTasks={deleteCompletedTasks}
          />
        </div>
      </div>
    </>
  );
}
