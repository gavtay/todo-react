import './App.css'
import Createtodo from './create.jsx'
import Showtodo from './show.jsx'

// export let taskArray = {
//   1: 'this is',
//   2: 'an array'
// };

export default function App() {
  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <div className="main">
          <Createtodo />
          <Showtodo />
        </div>
      </div>
    </>
  )
}

