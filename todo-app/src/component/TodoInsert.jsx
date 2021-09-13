import { MdAdd } from 'react-icons/md'
import './TodoInsert.scss'
import React from 'react'

const TodoInsert = () => {
  return (
    <form className="TodoInsert">
      <input placeholder="할 일 입력하기" />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  )
}

export default TodoInsert
