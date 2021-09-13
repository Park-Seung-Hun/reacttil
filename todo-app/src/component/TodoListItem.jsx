import React from 'react'
import './TodoListItem.scss'
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md'
import cn from 'classnames'

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo

  // classnames : cn은 1번쨰 파라미터는 그냥 추가, 2번쨰 파라미터의 값이 true일 경우에만 checked 클래스가 추가된다.
  return (
    <div className="TodoListItem">
      <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  )
}

export default TodoListItem
