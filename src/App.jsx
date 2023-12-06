import { useState, useEffect } from "react";
import "./App.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [start, setStart] = useState(false);
  const toggleStart = () => {
    setStart(true);
  };
  return <main>{start ? <Quiz /> : <Start toggleStart={toggleStart} />}</main>;
}

export default App;
