- 이벤트란? `사용자가 웹 브라우저에서 DOM요소들과 상호 작용 하는 것`
  - ex) 마우스 커서를 올렸을 때 `onmouseover`, 클릭 했을 때 `onClick`

## 리액트의 이벤트 시스템

> Say.js 에서 작성한 버튼 코드 이용.

```js
import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState("");
  const onClickEnter = () => setMessage("안녕하세요~");
  const onClickLeave = () => setMessage("안녕히 가세요~");

  const [color, setColor] = useState("black");

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>

      <button style={{ color: "red" }} onClick={() => setColor("red")}>
        빨
      </button>
      <button style={{ color: "blue" }} onClick={() => setColor("blue")}>
        파
      </button>
      <button style={{ color: "green" }} onClick={() => setColor("green")}>
        초
      </button>
    </div>
  );
};

export default Say;
```

[맨 위로](#)

### 이벤트 사용시 주의 사항

1. 이벤트 이름은 카멜 표기법으로 작성
   - ex) onclick => onClick으로 작성
2. 이벤트에 실행할 JS 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달
3. DOM 요소에만 이벤트 설정
   - DOM 요소에는 이벤트를 설정할 수 있지만 직접 만든 컴포넌트 자체엔 안된다.

[맨 위로](#)

## 예제로 이벤트 핸들링 익히기

- 이벤트 핸들링 단계

<img src="https://thebook.io/img/080203/123.jpg" height=250>

### 컴포넌트 생성 및 불러오기

### onChange 이벤트

1. onChange 이벤트 설정

```js
// 입력창에 글을 칠때마다 변하는 값이 나타남
class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="입력하기"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></input>
      </div>
    );
  }
}
```

2. state에 input value 담기 & onClick 동작

```js
class EventPractice extends Component {
  state = {
    message: "",
  };
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="입력하기"
          value={this.state.message}
          onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            alert(this.state.message);
            this.setState({
              message: "",
            });
          }}
        >
          확인
        </button>
      </div>
    );
  }
}
```

[맨 위로](#)

### 임의 메서드 만들기

> 이벤트에 실행할 js 코드를 전달하는 것이 아니라 함수 값을 전달하므로, 임의 메서드를 만들어줘야한다.`(함수를 미리 만들어서 전달하는 방법)` 가독성이 더 좋음

- `기본 방식`과 `transform class properties 문법 사용 방식`

```js
class EventPractice extends Component {
  state = {
    message: "",
  };

  // 기본 방식
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleClick() {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  }
  // -------------

  // 바벨의 transform class properties 문법을 사용해 화살표 함수 형태로 메서드 정의.
  // construct 수정을 안해도 된다.
  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  };
  // -------------

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="입력하기"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}
```

[맨 위로](#)

### input 여러 개 다루기

- event 객체를 활용하여 input을 여러개 다룰 수 있다.
- `e.target.name`을 이용해 target의 name을 가리킨다.

```js
class EventPractice extends Component {
  state = {
    message: "",
    username: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    alert(this.state.username + ": " + this.state.message);
    this.setState({
      message: "",
      username: "",
    });
  };
  // -------------

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자 명"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="메세지"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}
```

[맨 위로](#)

### onKeyPress 이벤트 핸들링

```js
class EventPractice extends Component {
  state = {
    message: "",
    username: "",
  };

  // 바벨의 transform class properties 문법을 사용해 화살표 함수 형태로 메서드 정의.
  // construct 수정을 안해도 된다.
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    alert(this.state.username + ": " + this.state.message);
    this.setState({
      message: "",
      username: "",
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };
  // -------------

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자 명"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="메세지"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}
```

[맨 위로](#)

## 함수 컴포넌트로 구현해보기

- input이 적을 경우 이 방식
- 아니면 다른 방식 사용

```js
const EventPractice2 = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeMessage = (e) => setMessage(e.target.value);
  const onClick = () => {
    alert(username + ": " + message);
    setUsername("");
    setMessage("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="유저명"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        type="text"
        name="message"
        placeholder="메세지 입력하세요"
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
```

[맨 위로](#)

## 정리

[맨 위로](#)
