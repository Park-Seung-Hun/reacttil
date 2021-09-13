import React, { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'up':
      return { value: state.value + 1 }
    case 'down':
      return { value: state.value - 1 }
    default:
      return state
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 })
  return (
    <div>
      <p>현재 카운터 {state.value} 입니다.</p>

      <button onClick={() => dispatch({ type: 'up' })}>+1</button>
      <button onClick={() => dispatch({ type: 'down' })}>-1</button>
    </div>
  )
}

export default Counter
