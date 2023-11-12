import { useState } from "react";
import './AddToDo.css'

export default function AddToDo({createTodo}) {
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

