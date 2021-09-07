## 자바스크립트 배열의 map() 함수

### 문법

```js
arr.map(callback, [thisArg]);
```

- callback : 새로운 배열의 요소를 생성하는 함수로 3가지 파라미터를 가진다.
  1. currentValue : 현재 처리하고 있는 요소
  2. index : 현재 처리하고 있는 요소의 idx
  3. array : 현재 처리하고 있는 원본 배열
- thisArg(선택 항목) : callback 함수 내부에서 사용할 this 레퍼런스

### 예제

```js
let num = [1, 2, 3, 4, 5];
let processed = num.map((n) => n * n);
// processed 는 새로운 배열 [1,4,9,16,25]
```

[맨 위로](#)

## 데이터 배열을 컴포넌트 배열로 변환하기

```js
// 앞선 방식으로 넣게 되는 경우 "key" prop이 없다는 경고가 뜸
const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const namelist = names.map((name) => <li>{name}</li>);
  return <ul>{namelist}</ul>;
};
```

[맨 위로](#)

## key

> 컴포넌트 배열을 렌더링 했을 때 어떤 원소에 변도이 있었는지 알아내려 사용.

```js
const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const namelist = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{namelist}</ul>;
};
```

- 수정하여 index 값을 key로 사용했지만, index값은 리렌더링시 효율적이지 못하다.

[맨 위로](#)

## 응용

### 초기 상태 설정하기

- useState를 사용하여 초기 상태 설정.
  1. 데이터 배열
  2. 텍스트를 입력할 수 있는 input의 상태
  3. 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유 id를 위한 상태

### 데이터 추가 기능 구현하기

> map을 이용한 데이터 추가 기능 구현.

### 데이터 제거 기능 구현하기

> filter를 이용한 데이터 삭제 기능 구현.

- filter()를 사용하면 배열에서 특정 조건을 만족하는 원소들만 쉽게 분류 가능.

[맨 위로](#)

## 정리

-

```js
// IterationSample.js
const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "사람" },
  ]);

  const [inputText, setInputText] = useState(""); // input값 설정
  const [nextId, setNextId] = useState(5); // 새로운 항목 추가시 사용할 id

  const onChange = (e) => setInputText(e.target.value); // 데이터 추가 기능 구현
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1); // 다음 id 값을 설정한다.
    setNames(nextNames); // names 값을 업데이트 한다.
    setInputText(""); // input 을 비운다.
  };
  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  }; // 데이터 삭제 기능 구현
  const namesList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));

  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{namesList}</ul>
    </>
  );
};
```

- 반복 렌더링 과정은 key값을 반드시 설정해줘야한다.
- 상태 안에서 배열을 변형할 때는 concat,filter등 내장 함수를 적극 활용한다.
  [맨 위로](#)
