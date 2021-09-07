import React from "react";

const FunctionComp = (props) => {
  return (
    <div>
      {props.name}, 함수형 컴포넌트
      <br />
      {props.children}
    </div>
  );
};

export default FunctionComp;

FunctionComp.defaultProps = {
  name: "기본이름",
};
