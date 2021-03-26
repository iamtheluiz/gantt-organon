import React, { createContext, useContext, useState } from 'react';

export type Task = {
  name: string;
  color: string;
  start: Date;
  end: Date;
}

interface TaskContextProps {
  tasks: Task[];
  // eslint-disable-next-line no-unused-vars
  setTasks: (arg0: Task[]) => void;
}

const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: 'Planning',
      color: '#f98e72',
      start: new Date(2021, 1, 1),
      end: new Date(2021, 2, 15),
    },
    {
      name: 'Development',
      color: '#79d5f8',
      start: new Date(2021, 2, 1),
      end: new Date(2021, 3, 15),
    },
    {
      name: 'Deploy',
      color: '#4398b9',
      start: new Date(2021, 2, 15),
      end: new Date(2021, 3, 15),
    },
    {
      name: 'Tests',
      color: '#3ea776',
      start: new Date(2021, 3, 1),
      end: new Date(2021, 4, 30),
    },
    {
      name: 'Party',
      color: '#c2ba4f',
      start: new Date(2021, 4, 8),
      end: new Date(2021, 4, 30),
    },
  ]);

  return (
    <TaskContext.Provider value={{
      tasks,
      setTasks,
    }}
    >
      {children}
    </TaskContext.Provider>
  );
};

function useTask(): TaskContextProps {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useHorse must be used within a HorseProvider');
  }

  return context;
}

export { TaskProvider, useTask };
