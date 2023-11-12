export default function ChangeCompletedToDo({ toDoList, deleteCompletedTasks }) {
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
