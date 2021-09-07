- DOM 요소에 이름을 다는 경우
  - 일반 HTML : `id`
  - 리액트 : `reference 사용` (react에선 id를 사용하면 중복 id가 발생하는 경우가 생긴다)

## ref를 사용하는 상황은??

- 특정 DOM에 작업을 해야 할 때 ref를 사용한다. `(DOM을 꼭 직접 건드려야 하는 경우)`

### 예제 컴포넌트 생성

> state를 이용하여 컴포넌트 생성

- ValidationSample.css , ValidationSample.js

### App 컴포넌트에서 에제 컴포넌트 렌더링

### DOM을 꼭 사용해야 하는 상황

- `특정 input에 포커스 추가`
- `스크롤 박스 조작`
- `Canvas 요소에 그림 그리기 등`

[맨 위로](#)

## ref 사용

> ref를 사용하는 방법은 두가지이다.

### 1. 콜백 함수를 통한 ref 설정

- ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달함.

  - 콜백 함수는 ref 값을 파라미터로 전달받음.

    - 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정.

```js
// this.input은 input요소의 DOM을 가르킨다.
<input
  ref={(ref) => {
    this.input = ref;
  }}
/>
```

### 2. createRef를 통한 ref 설정

1. 컴포넌트 내부에서 멤버변수로 React.createRef()를 담아준다.
2. 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어주면 설정 완료

```js
class test extends Component {
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  };
  render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}
```

[맨 위로](#)

## 컴포넌트에 ref 달기

> 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할때 사용.

- Scrollbax.js 생성

[맨 위로](#)

## 정리

[맨 위로](#)
