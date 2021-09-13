import { MdAdd } from 'react-icons/md'
import './TodoInsert.scss'
import React, { useCallback, useState } from 'react'

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('')

  const onChange = useCallback(e => {
    setValue(e.target.value)
  }, [])

  const onSubmit = useCallback(
    e => {
      onInsert(value)
      setValue('') // value 초기화.

      // submit 이벤트는 브라우저에서 새로고침을 발생시킨다(리렌더링)
      // 이를 방지하기 위한 함수 호출
      e.preventDefault()
    },
    [onInsert, value]
  )

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input placeholder="할 일 입력하기" value={value} onChange={onChange} />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  )
}

export default TodoInsert
