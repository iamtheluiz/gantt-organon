import React, { useEffect, useState } from 'react';
import { Task } from '../context/task';

interface TaskItemProps {
  task: Task;
  daySize: number;
  firstTimelineDay: Date | null;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, daySize, firstTimelineDay }) => {
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const millisecondsInOneDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    // Get day count
    const dayCount: number = (task.end.getTime() - task.start.getTime()) / millisecondsInOneDay;

    setWidth(dayCount * daySize);
  }, [task, daySize]);

  useEffect(() => {
    // Offset
    if (firstTimelineDay !== null) {
      const dayCount: number = (task.start.getTime() - firstTimelineDay.getTime()) / millisecondsInOneDay;

      setOffset(dayCount * daySize);
    }
  }, [firstTimelineDay]);

  return (
    <div
      key={task.name}
      className="flex flex-row items-center text-lef h-14"
      style={{ width: `${width}rem`, marginLeft: `${offset}rem` }}
    >
      <div className="w-full flex flex-col py-2 px-3 rounded-md" style={{ backgroundColor: task.color }}>
        <strong className="text-sm text-gray-800">{task.name}</strong>
        <span className="text-xs text-gray-700">{`${task.start.toLocaleDateString()} - ${task.end.toLocaleDateString()}`}</span>
      </div>
    </div>
  );
};

export default TaskItem;
