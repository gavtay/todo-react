import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import './ShowToDoList.css'

const checkBtn = <FontAwesomeIcon id="check" icon={faCheck} style={{color: "#00ff00", pointerEvents: 'none'}} />
const xBtn = <FontAwesomeIcon id="x" icon={faX} style={{color: "#ff0000", pointerEvents: 'none'}} />

export default function ShowToDoList({ value, index, array, completeTask, deleteTask}) {
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

