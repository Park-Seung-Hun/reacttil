import React, { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixNumber: 0,
  };

  render() {
    const { number, fixNumber } = this.state; // state 조회시 this.state 사용
    return (
      <div>
        <h1>{number}</h1>
        <h2>{fixNumber}</h2>
        <button
          onClick={() =>
            this.setState({ number: number + 1 }, () => {
              console.log("setState 이후 동작");
            })
          }
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
