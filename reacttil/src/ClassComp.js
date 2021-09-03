import React, { Component } from "react";

class ClassComp extends Component {
  render() {
    const { name } = this.props;
    return <div>{name}, 클래스형 컴포넌트</div>;
  }
}

export default ClassComp;
