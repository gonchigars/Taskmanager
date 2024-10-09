// src/services/mockTaskService.js

import { mockTasks } from "../mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTasks = async () => {
  await delay(500); // Simulate network delay
  return mockTasks;
};

const updateTaskStatus = async (taskId, newStatus) => {
  await delay(300);
  const taskIndex = mockTasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    mockTasks[taskIndex].status = newStatus;
  }
  return mockTasks[taskIndex];
};

const addTask = async (newTask) => {
  await delay(300);
  const task = {
    ...newTask,
    id: Math.max(...mockTasks.map((t) => t.id)) + 1,
  };
  mockTasks.push(task);
  return task;
};

export const mockTaskService = {
  getTasks,
  updateTaskStatus,
  addTask,
};
