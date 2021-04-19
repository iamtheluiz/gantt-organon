/* eslint-disable no-unused-vars */
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useDatabase } from './database';

// Utils
import sortTaskList from '../utils/sortTaskList';
import getMonthListFromTaskList, { Month } from '../utils/getMonthListFromTaskList';

// Models
import ProjectModel from '../models/Project';
import TaskModel from '../models/Task';

export type Task = {
  id?: string;
  name: string;
  color: string;
  start: Date;
  end: Date;
}

interface ProjectContextProps {
  tasks: Task[];
  months: Month[];
  project: ProjectModel;
  setTasks: (arg0: Task[]) => void;
  setMonths: (arg0: Month[]) => void;
  setProject: (arg0: ProjectModel) => void;
  addNewTask: (task: Task, project_id: string) => void;
  getAndSetProjectDataFromId: (project_id: string) => Promise<boolean>;
}

const ProjectContext = createContext<ProjectContextProps>({} as ProjectContextProps);

const ProjectProvider: React.FC = ({ children }) => {
  const [project, setProject] = useState<ProjectModel>({} as ProjectModel);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [months, setMonths] = useState<Month[]>([]);

  const { database } = useDatabase();

  useEffect(() => {
    if (tasks.length > 0) {
      const monthList = getMonthListFromTaskList(tasks);
      setMonths(monthList);
    }
  }, [tasks]);

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

  async function getAndSetProjectDataFromId(project_id: string): Promise<boolean> {
    try {
      const projectData = await database.get<ProjectModel>('projects').find(project_id);
      const projectTasks = await projectData.tasks.fetch();

      setProject(projectData);
      setTasks(sortTaskList(projectTasks));

      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <ProjectContext.Provider value={{
      tasks,
      months,
      project,
      setTasks,
      setMonths,
      setProject,
      addNewTask,
      getAndSetProjectDataFromId,
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
