Hooks란? 리액트 v16.8이후 도입된 기능

- useState : 함수 컴포넌트에서도 state 관리.
- useEffect : 렌더링 직후 작업을 설정.

## useState

```js
const [state, setState] = useState(기본 값);
// 가변 상태를 지닐 수 있게 해준다.
```

1. useState를 여러 번 사용하기.

- `하나의 useState함수는 하나의 state만 관리`
- 그러므로 `여러 번의 useState를 사용하면 여러 개의 state 관리`

[맨 위로](#)

## useEffect

- `리액트 컴포넌트가 rendering 될 때마다 특정 작업을 수행하도록 설정하는 Hook`
- 클래스형 컴포넌트의 `componentDidMount`와 `componentDidUpdate`를 합친 상태

1. 마운트 될 때만 실행하고 싶을 때 (업데이트 할 때는 실행되지 않는다.)

```js
// 함수의 두번째 파라미터를 빈 배열로 넣어준다.

useEffect(() => {
  console.log({ name, nickname })
}, [])
```

2. 특정 값이 업데이트될 때만 실행하고 싶을 때 (업데이트)

```js
// 함수의 두번째 파라미터에 검사하고 싶은 값을 넣어주면 된다.
useEffect(() => {
  console.log({ name, nickname })
}, [name])
```

3. 뒷 정리 하기 (cleanup)

- 컴포넌트가 `언마운트 되기 전 이나 업데이트 되기 직전에 작업을 수행하려면 cleanup 함수 반환`

```js
useEffect(() => {
  console.log('이펙트')
  console.log(name)
  return () => {
    console.log('클린업')
    console.log(name)
  }
}, [name])
```

- 오직 `언마운트 직전에만 동작`하려면 빈 배열을 넣는다.

[맨 위로](#)

## useReducer

- useReducer는 `useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해 주고 싶을 때 사용하는 Hook`이다.
- reducer는` 현재 state`, `업데이트를 위해 필요한 정보를 담은 action 값`을 전달받아 새로운 state를 반환하는 함수.

```js
// reducer
function reducer(state,action){
  return {...}; // 불변성을 지키면서 업데이트한 새로운 상태를 반환한다.
}
```

```js
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
```

[맨 위로](#)

## useMemo

- `함수형 컴포넌트 내부에서 발생하는 연산을 최적화`
- 렌더링 하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고 만약에 원하는 값이 바뀐 것이 아니라면 이전에 연산했던 결과를 다시 사용하는 방식
- useMemo(() => 실행 함수, 특정 값)

```js
const getAverage = numbers => {
  console.log('평균값 계산중..')
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((a, b) => a + b)
  return sum / numbers.length
}

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')

  const onChange = e => {
    setNumber(e.target.value)
  }
  const onInsert = e => {
    const nextList = list.concat(parseInt(number))
    setList(nextList)
    setNumber('')
  }

  // list의 값이 바뀔때만 평균 값 계산.
  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {avg}
      </div>
    </div>
  )
}
```

[맨 위로](#)

## useCallback

- useMemo와 상당히 비슷한 함수이다.
- 주로 렌더링 성능을 최적화해야 하는 상황에서 사용. `(이벤트 핸들러 함수를 필요할 때만 생성 가능)`
- 앞선 예제에서 컴포넌트가 리렌더링 될 때마다 onChange와 onInsert라는 함수가 새로 생성된다.
- useCallback(생성하고 싶은 함수, 어떤 값이 변화했을 때 함수를 새로 생성하는지 명시하는 배열).(빈 배열은 컴포넌트가 렌더링 될 때 단 한번만 함수가 생성된다.)

```js
const onChange = useCallback(e => {
  setNumber(e.target.value)
}, []) // 컴포넌트가 처음 렌더링 될 때만 함수 생성

const onInsert = useCallback(
  e => {
    const nextList = list.concat(parseInt(number))
    setList(nextList)
    setNumber('')
  },
  [number, list]
) // number 혹은 list 가 바뀌었을 때만 함수 생성
```

- `숫자, 문자열, 객체 처럼 일반 값을 재사용하기 위해서는 useMemo`
- `함수를 재사용 하기 위해서는 useCallback 을 사용`

[맨 위로](#)

## useRef

- 함수형 컴포넌트에서 ref 를 쉽게 사용

```js
const getAverage = numbers => {
  console.log('평균값 계산중..')
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((a, b) => a + b)
  return sum / numbers.length
}

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')

  // useRef 사용
  const inputEl = useRef(null)

  const onChange = useCallback(e => {
    setNumber(e.target.value)
  }, []) // 컴포넌트가 처음 렌더링 될 때만 함수 생성

  const onInsert = useCallback(
    e => {
      const nextList = list.concat(parseInt(number))
      setList(nextList)
      setNumber('')
      inputEl.current.focus()
    },
    [number, list]
  ) // number 혹은 list 가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {avg}
      </div>
    </div>
  )
}
```

[맨 위로](#)

## 커스텀 Hooks 만들기

[맨 위로](#)

## 다른 Hooks

[맨 위로](#)
