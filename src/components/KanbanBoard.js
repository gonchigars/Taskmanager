// src/components/KanbanBoard.js

import React, { useState, useEffect } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { mockTaskService } from "../services/mockTaskService";
import TaskCard from "./TaskCard";

const Column = ({ status, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: () => ({ status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`kanban-column ${isOver ? "column-over" : ""}`}>
      <h2>{status}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDrop={onDrop} />
      ))}
    </div>
  );
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await mockTaskService.getTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  const handleDrop = async (taskId, newStatus) => {
    const updatedTask = await mockTaskService.updateTaskStatus(
      taskId,
      newStatus
    );
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        {["ToDo", "InProgress", "Done"].map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
