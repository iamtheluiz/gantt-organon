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
  getTaskData: (id: string) => Promise<TaskModel>;
  addNewTask: (task: Task, project_id: string) => void;
  editTask: (task: Task, task_id: string) => void;
  removeTask: (task: TaskModel) => Promise<void>;
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

  async function getTaskData(id: string) {
    const taskData = await database.get<TaskModel>('tasks').find(id);

    return taskData;
  }

  async function addNewTask(task: Task, project_id: string) {
    await database.action(async () => {
      const createdTask = await database.get<TaskModel>('tasks').create((newTask) => {
        newTask.name = task.name;
        newTask.color = task.color;
        newTask.start = task.start;
        newTask.end = task.end;
        newTask.project.id = project_id;
      });

      setTasks(sortTaskList([...tasks, createdTask]));
    });
  }

  async function editTask(newTaskData: Task, task_id: string) {
    await database.action(async () => {
      const selectedTask = await getTaskData(task_id);
      await selectedTask.update((taskData) => {
        taskData.name = newTaskData.name;
        taskData.color = newTaskData.color;
        taskData.start = newTaskData.start;
        taskData.end = newTaskData.end;
      });

      setTasks(sortTaskList([...tasks]));
    });
  }

  async function removeTask(task: TaskModel) {
    await database.action(async () => {
      await task.destroyPermanently();
      setTasks(tasks.filter((item) => task.id !== item.id));
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
      getTaskData,
      addNewTask,
      editTask,
      removeTask,
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
