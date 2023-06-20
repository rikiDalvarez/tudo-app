import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([])

  const handleCheckboxChange = async (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos)
    const response = await fetch("http://localhost:3000/todos", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    })
    console.log({ response })

  };

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
          {todos.map((todo: any, index: number) => {
            if (todo.done === false) {
              return (
                <div className="todo" key={index}>
                  <h1 className="todoTitle">{todo.todo}</h1>
                  <input
                    className="todoCheckbox"
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
              );
            }
          })}
        </div>

      </div>
    </>
  )
}

export default App
