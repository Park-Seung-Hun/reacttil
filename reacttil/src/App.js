import "./App.css";
import ClassComp from "./ClassComp";
import FunctionComp from "./FunctionComp";

function App() {
  return (
    <>
      <FunctionComp name="React">Props</FunctionComp>
      <ClassComp name="React" />
    </>
  );
}

export default App;
