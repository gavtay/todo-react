import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import './task.css'

const checkBtn = <FontAwesomeIcon id="check" icon={faCheck} style={{color: "#00ff00", pointerEvents: 'none'}} />
const xBtn = <FontAwesomeIcon id="x" icon={faX} style={{color: "#ff0000", pointerEvents: 'none'}} />

export default function FilterTasks({toDoList, completeTask, deleteTask}) {
    const [filter, setFilter] = useState('');

    function filterTodoChange(event) {
        setFilter(event.target.value);
      }

    function renderTasks() {
        let newArray = toDoList.slice();
            
        newArray = newArray.filter((todo) => {
          let str = todo.title.toLowerCase();
          let filt = filter.toLocaleLowerCase();
    
          if (str.includes(filt)) {
            return todo;
          }
        })
        
        newArray = newArray.map((inp, ind, arr) => { // first argument is value, second argument is index, third arg is entire array
          return (
            <>
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
            </>
          );
        })
        return newArray;
      }

    return (
        <>
            <div className='filterTasks'>
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
            </div>
            <div className='tasks-container'>
                <h4 id='task-header'>Tasks</h4>
            </div>
            {renderTasks()}
        </>
    )
}
