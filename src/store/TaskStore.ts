import { create } from 'zustand';
import type { Task } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

// Function to read tasks from localStorage
const readTasksFromStorage = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
};

// Function to write tasks to localStorage
const writeTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error writing tasks:', error);
  }
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: readTasksFromStorage(),
  
  addTask: (task) => {
    set((state) => {
      const newTasks = [...state.tasks, task];
      writeTasksToStorage(newTasks);
      return { tasks: newTasks };
    });
  },

  updateTask: (id, updatedTask) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      writeTasksToStorage(newTasks);
      return { tasks: newTasks };
    });
  },

  deleteTask: (id) => {
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      writeTasksToStorage(newTasks);
      return { tasks: newTasks };
    });
  },
}));
