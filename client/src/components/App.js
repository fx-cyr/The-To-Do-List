import React, { useState } from "react";
import Home from "./Home";
import Menu from "./Menu";

const App = () => {
  const [allTasks, setAllTasks] = useState([]);

  return <Menu allTasks={allTasks} setAllTasks={setAllTasks} />;
};

export default App;
