/* eslint-disable no-unused-vars */
import React, {
  createContext, useContext, useState,
} from 'react';
import { useDatabase } from './database';
import TaskModel from '../models/Task';
import sortTaskList from '../utils/sortTaskList';

export type Task = {
  name: string;
  color: string;
  start: Date;
  end: Date;
}

interface ProjectContextProps {
  tasks: Task[];
  setTasks: (arg0: Task[]) => void;
  addNewTask: (task: Task, project_id: string) => void;
}

const ProjectContext = createContext<ProjectContextProps>({} as ProjectContextProps);

const ProjectProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { database } = useDatabase();

  async function addNewTask(task: Task, project_id: string) {
    setTasks(sortTaskList([...tasks, task]));

    await database.action(async () => {
      await database.get<TaskModel>('tasks').create((newTask) => {
        newTask.name = task.name;
        newTask.color = task.color;
        newTask.start = task.start;
        newTask.end = task.end;
        newTask.project.id = project_id;
      });
    });
  }

  return (
    <ProjectContext.Provider value={{
      tasks,
      setTasks,
      addNewTask,
    }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

function useProject(): ProjectContextProps {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }

  return context;
}

export { ProjectProvider, useProject };
