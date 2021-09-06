import React, { Component } from "react";
import PropTypes from "prop-tpyes";

class test extends Component {
  static defaultProps = {
    name: "기본 이름",
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNum: PropTypes.number.isRequired,
  };

  render() {
    const { name, favoriteNum, children } = this.props;
    return (
      <div>
        안녕{name}, <br />
        {children} <br />
        {favoriteNum}는 숫자야
      </div>
    );
  }
}

export default test;
