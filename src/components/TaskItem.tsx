import React, { useEffect, useState } from 'react';
import { Task } from '../contexts/project';
import getDayCount from '../utils/getDayCount';
import getTextColorFromBackgroundColor from '../utils/getTextColorFromBackgroundColor';

interface TaskItemProps {
  task: Task;
  daySize: number;
  firstTimelineDay?: Date | undefined;
  tabIndex: number;
  onClick?: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task, daySize, firstTimelineDay, tabIndex, onClick = () => {},
}) => {
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);

  const textColor = getTextColorFromBackgroundColor(task.color);

  useEffect(() => {
    // Get day count
    const dayCount: number = getDayCount(task.start, task.end);

    setWidth(dayCount * daySize);
  }, [task, daySize]);

  useEffect(() => {
    // Offset
    if (firstTimelineDay !== undefined) {
      const dayCount: number = getDayCount(firstTimelineDay, task.start);

      setOffset((dayCount * daySize) - daySize);
    }
  }, [firstTimelineDay, daySize]);

  return (
    <div
      key={task.name}
      className="relative flex flex-col items-center text-lef h-14 py-0.5"
      style={daySize !== 0 ? { width: `${width}rem`, marginLeft: `${offset}rem` } : { width: '100%' }}
    >
      <div
        className="w-full h-full flex flex-col justify-center px-3 rounded-md transition-all"
        style={{ backgroundColor: task.color }}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={tabIndex}
      >
        <strong className={`text-sm whitespace-nowrap overflow-hidden overflow-ellipsis ${textColor === 'black' ? 'text-gray-800' : 'text-gray-200'}`}>{task.name}</strong>
        <span className={`text-xs whitespace-nowrap overflow-hidden overflow-ellipsis ${textColor === 'black' ? 'text-gray-700' : 'text-gray-300'}`}>
          {`${task.start.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' })} - 
          ${task.end.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' })}`}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
