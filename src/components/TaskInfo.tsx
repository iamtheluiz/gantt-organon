import React from 'react';
import { Task } from '../context/task';

import '../styles/pages/Home.css';

interface TaskInfoProps {
  task: Task;
}

export const TaskInfo: React.FC<TaskInfoProps> = ({ task }) => (
  <div
    className="flex flex-row items-center text-left w-full h-14 px-4 border-l-4"
    style={{ borderColor: task.color }}
  >
    <div className="flex flex-row items-center flex-1">
      <strong className="text-base text-gray-600 dark:text-gray-300 ml-1 sm:inline hidden">{task.name}</strong>
    </div>
    <div className="flex flex-row items-center w-24">
      <div
        className="flex flex-row items-center justify-center w-9 h-9 rounded-full"
        style={{ backgroundColor: task.color }}
      >
        <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-600" />
      </div>
      <span className="ml-2 dark:text-gray-300">
        <strong>7</strong>
        /10
      </span>
    </div>
  </div>
);

export default TaskInfo;
