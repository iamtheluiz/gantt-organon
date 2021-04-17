import React, { useEffect, useState } from 'react';
import { Task } from '../contexts/project';
import getDayCount from '../utils/getDayCount';

interface TaskItemProps {
  task: Task;
  daySize: number;
  firstTimelineDay: Date | null;
  tabIndex: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task, daySize, firstTimelineDay, tabIndex,
}) => {
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Get day count
    const dayCount: number = getDayCount(task.start, task.end);

    setWidth(dayCount * daySize);
  }, [task, daySize]);

  useEffect(() => {
    // Offset
    if (firstTimelineDay !== null) {
      const dayCount: number = getDayCount(firstTimelineDay, task.start);

      setOffset((dayCount * daySize) - daySize);
    }
  }, [firstTimelineDay, daySize]);

  function handleToggleOptionsMenu() {
  }

  return (
    <div
      key={task.name}
      className="relative flex flex-col items-center text-lef h-14 py-0.5"
      style={{ width: `${width}rem`, marginLeft: `${offset}rem` }}
    >
      <div
        className="w-full h-full flex flex-col justify-center px-3 rounded-md transition-all"
        style={{ backgroundColor: task.color }}
        onClick={handleToggleOptionsMenu}
        onKeyDown={handleToggleOptionsMenu}
        role="button"
        tabIndex={tabIndex}
      >
        <strong className="text-sm text-gray-800">{task.name}</strong>
        <span className="text-xs text-gray-700">
          {`${task.start.toLocaleDateString()} - ${task.end.toLocaleDateString()}`}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
