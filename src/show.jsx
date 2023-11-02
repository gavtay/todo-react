import Task from './task.jsx'
import Createtodo from './create.jsx'

export default function Showtodo() {
    
    return (
        <div className="show-container" style={{marginTop: 25}}>
            <Task />
            <Task />
        </div>
    )
}

