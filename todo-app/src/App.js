import logo from './logo.svg'
import './App.css'
import TodoTemplate from './component/TodoTemplate'
import TodoInsert from './component/TodoInsert'
import TodoList from './component/TodoList'
import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '일정 1', checked: false },
    { id: 2, text: '일정 2', checked: true },
    { id: 3, text: '일정 3', checked: false },
  ])

  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos} />
    </TodoTemplate>
  )
}

export default App
