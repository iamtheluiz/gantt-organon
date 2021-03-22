import React from 'react';
import { Task } from './TaskInfo';

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => (
  <div key={task.name} className="flex flex-row items-center text-lef h-14" style={{ width: '28rem' }}>
    <div className="w-full flex flex-col py-2 px-3 rounded-md" style={{ backgroundColor: task.color }}>
      <strong className="text-sm">{task.name}</strong>
      <span className="text-xs">{`${task.start} - ${task.end}`}</span>
    </div>
  </div>
);

export default TaskItem;
