// src/components/TaskCard.js

import React from "react";
import { useDrag } from "react-dnd";

const TaskCard = ({ task, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(item.id, dropResult.status);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="task-card"
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskCard;
