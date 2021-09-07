import React, { useState } from "react";

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

export default IterationSample;
