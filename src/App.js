// src/App.js

import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Task Management System</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
