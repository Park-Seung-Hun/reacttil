import logo from './logo.svg'
import './App.css'
import TodoTemplate from './component/TodoTemplate'
import TodoInsert from './component/TodoInsert'
import TodoList from './component/TodoList'
import { useState, useRef, useCallback } from 'react'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '일정 1', checked: false },
    { id: 2, text: '일정 2', checked: true },
    { id: 3, text: '일정 3', checked: false },
  ])

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4)

  // 추가 기능
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      }
      setTodos(todos.concat(todo)) // todos에 추가
      nextId.current += 1
    },
    [todos]
  )

  // 삭제 기능
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id))
    },
    [todos]
  )

  // 수정 기능
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      )
    },
    [todos]
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  )
}

export default App
