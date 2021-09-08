- 리액트 컴포넌트에는 라이프 사이클(생명주기)가 존재한다.
  - 이때 컴포넌트의 수명은 `페이지 렌더링 전 -> 페이지에서 사라질 때`까지 이다
- 리액트 작업 시 `컴포넌트를 처음으로 렌더링 할 때 어떤 작업을 처리` or `컴포넌트 업데이트하기 전후로 작업 처리` or `불필요한 업데이트 방지`하는 작업에서 `라이프사이클 메서드 사용`

## 라이프사이클 메서드의 이해

- 라이프 사이클 메서드의 종류는 총 9가지이다.
  - `Will` 접두사가 붙은 메서드 : 어떤 작업을 동작하기 전에 실행되는 메서드
  - `Did` 접두사가 붙은 메서드 : 어떤 작업을 작동한 후에 실행되는 메서드
- 라이프 사이클은 총 3가지 카테고리로 나뉜다.

  <img src='https://media.vlpt.us/images/whdvkf92/post/00857de6-0258-4b14-ad9b-3f653dca1553/%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4.JPG' height=300px>

- 카테고리 종류

  - `마운트` : DOM이 생성되고 웹 브라우저 상에 컴포넌트가 나타나는 것.
    <img src='https://t1.daumcdn.net/cfile/tistory/99617E3F5C5B153F15' height=300px>

    - constructor : 컴포넌트를 새로 만들 때 마다 호출되는 클래스 생성자 메서드
    - getDerivedStateFromProps : props에 있는 값을 state에 넣을 때 사용하는 메서드.
    - render : 준비한 UI를 렌더링하는 메서드.
    - componentDidMount : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드.

  - `업데이트` : 컴포넌트는 총 4가지 경우에 업데이트한다. (`1.props가 바뀔 때`, `2.state가 바뀔 때`, `3.부모 컴포넌트가 리렌더링 될 때`, `4.this.forceUpdate로 강제로 렌더링을 트리거할 때`)
    <img src='https://thebook.io/img/080203/174.jpg' height=300px>

    - getDerivedStateFromProps : 마운트에서도 호출되고 업데이트 시작전에도 호출
    - shouldComponenteUpdate : 컴포넌트가 리렌더링을 할지 말지 결정하는 메서드. (true or false 반환)
    - render : 컴포넌트를 리렌더링한다.
    - getSnapshotBeforeUpdate : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드.
    - componentDidUpdate : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드.

  - `언마운트` : 마운트의 반대 과정으로, 컴포넌트를 DOM에서 제거하는 것.
    <img src='https://thebook.io/img/080203/175.jpg' height=200px>
    - componentWillUnmount : 컴포넌트가 웹 브라우저 상에서 사라지기 전에 호출하는 메서드

[맨 위로](#)

## 라이프사이클 메서드 살펴보기

1. `render()` : `컴포넌트 모양새를 정의하는 메서드.`(라이프사이클 메서드 중 유일한 필수 메서드)
   - 메서드 안에서 this.props와 this.state에 접근 할 수 있고, 리액트 요소를 반환.
   - 메서드 안에서 이벤트 설정이 아닌 곳에서 setState를 사용하면 안되며, 브라우저의 DOM에 접근 해도 안된다.(DOM 정보를 가져오거나 변화를 줄 경우 componentDidMount에서 처리.)
2. `constructor()` : 컴포넌트의 생성자 메서드로 `컴포넌트를 만들 때 처음으로 실행된다` (초기 state를 정할 수 있다.)
3. `getDerivedStateFromProps()` : props에서 받아 온 값을 state에 동기화 시키는 용도로 사용, 컴포넌트가 마운트 될 때와 업데이트 될 때와 업데이트 될 때 호출.

```js
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.value!=prevState.value){ // 조건에 따라 특정 값 동기화
      return {value : nextProps.value};
    }
    return null; // state 변경 필요 없으면 null 반환
  }
```

4. `componentDidMount()` : 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행. (이 안에서 JS 라이브러리 or 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval,네트워크 요청 같은 비동기 작업 처리)
5. `shouldComponentUpdate()` : props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드. (default는 true 반환, false 반환시 업데이트 중지)
6. `getSnapshotBeforeUpdate()` : render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출.(componentDidMount()의 세 번째 파라미터인 snapshot 값으로 전달받는다.- 업데이트 하기 직전의 값을 참고할 일이 있을 때 활용(스크롤바 유지 등))

```js
  getSnapshotBeforeUpdate(prevProps,prevState){
    if(prevProps.array != this.state.array){
      const {scrollTop, scrollhHeight} = this.list
      return {scrollTop,scrollhHeight}
    }
  }
```

7. `componentDidUpdate()` : 리렌더링을 완료한 후 실행. 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방하다.
8. `componentWillUnmount()` : 컴포넌트를 DOM에서 제거할 때 실행. componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거.
9. `componentDidCatch()` : 컴포넌트 렌더링 도중 에러가 발생했을 때, 애플리케이션이 먹통이 되지 않고 오류 UI를 보여 줄 수 있게 해 준다.

```js
  componentDidCatch(error, info) {
    this.setState({ error: true }); // 어떤 error가 발생한지 알려준다. info는 어디에 있는 코드에서 오류가 발생했는지 정보를 준다.
    console.log({ error, info });
  }
```

[맨 위로](#)

## 라이프사이클 메서드 사용하기

### 예제 컴포넌트 생성

[맨 위로](#)

## 정리

<img src='https://kyun2da.dev/static/69e54fe57da139eabae168b5e8304af4/01645/lifecycle.png' height=500px>

[맨 위로](#)
