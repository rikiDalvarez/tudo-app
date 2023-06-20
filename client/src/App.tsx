import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => setTodos(data))

  }, [todos]);

  return (
    <>
      <div className="app">
        <TodoForm />
        <div className='list'>
          {todos.map((todo: any, index: number) => (
            <div className="todo" key={index}>
              <h1 className="todoTitle">{todo.todo}</h1>
              <input className="todoCheckbox" type="checkbox" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
