import React from 'react';
import { Task } from '../contexts/project';

import '../styles/pages/Home.css';
import getDayCount from '../utils/getDayCount';

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
    <div className="flex flex-row items-center w-24 pl-3">
      <span className="w-full text-base text-gray-400 hidden sm:inline">
        {getDayCount(task.start, task.end)}
      </span>
    </div>
  </div>
);

export default TaskInfo;
