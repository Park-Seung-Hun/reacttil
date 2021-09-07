import React, { Component } from "react";

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
