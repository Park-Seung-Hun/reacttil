import React, { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
  state = {
    pwd: "",
    clicked: false,
    validated: false,
  };

  input = React.createRef();

  handleChange = (e) => {
    this.setState({
      pwd: e.target.value,
    });
  };

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.pwd === "0000",
    });
    this.input.focus();
  };

  render() {
    return (
      <div>
        <input
          ref={(ref) => (this.input = ref)}
          type="password"
          value={this.state.pwd}
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validated
                ? "success"
                : "failure"
              : ""
          }
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;
