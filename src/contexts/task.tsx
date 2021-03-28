/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react';

export type Task = {
  name: string;
  color: string;
  start: Date;
  end: Date;
}

interface TaskContextProps {
  tasks: Task[];
  setTasks: (arg0: Task[]) => void;
  addNewTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addNewTask(task: Task) {
    setTasks([...tasks, task]);
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      setTasks,
      addNewTask,
    }}
    >
      {children}
    </TaskContext.Provider>
  );
};

function useTask(): TaskContextProps {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
}

export { TaskProvider, useTask };
