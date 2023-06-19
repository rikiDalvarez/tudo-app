import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => setTodos(data))

  }, []);

  return (
    <>
      <div>
        {todos.map((todo: any, index: number) => (
          <div className="todo" key={index}>
            <h1 className="todoTitle">{todo.title}</h1>
            <input className="todoCheckbox" type="checkbox" />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
