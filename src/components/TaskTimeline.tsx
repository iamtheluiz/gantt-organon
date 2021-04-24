import React from 'react';

import { useProject } from '../contexts/project';

import TaskInfo from './TaskInfo';
import TaskItem from './TaskItem';
import TaskTimelineContainer from './TaskTimelineContainer';

import '../styles/components/TaskTimeline.css';

interface TaskTimelineProps {
  container?: 'div' | 'scroll';
  daySize?: number;
}

const TaskTimeline: React.FC<TaskTimelineProps> = ({ container = 'scroll', daySize = 1.2 }) => {
  const { tasks, months } = useProject();

  return (
    <>
      <div className="flex flex-row mt-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
        {tasks.length === 0 && (
          <span className="p-4 w-full text-center text-gray-400">No task found. Register one to get started!</span>
        )}
        {tasks.length > 0 && (
        <>
          <aside className="taskList pb-1 w-1 sm:max-w-md sm:w-full border-r-2 border-transparent sm:border-gray-200 sm:dark:border-gray-700">
            <div className="flex items-center text-left w-full h-14 px-4 border-b-2 border-gray-200 dark:border-gray-700">
              <strong className="flex-1 text-gray-400 hidden sm:inline">Task name</strong>
              <strong className="w-24 text-gray-400 hidden sm:inline pl-3">Work Days</strong>
            </div>
            {tasks.map((task) => (
              <TaskInfo key={task.name} task={task} />
            ))}
          </aside>

          <TaskTimelineContainer container={container} className="TaskTimeline flex flex-col w-full">
            {months.length !== 0 && (
              <>
                <header className="flex flex-row w-max items-center h-14 px-4 border-b-2 border-gray-200 dark:border-gray-700">
                  {months.map((month) => (
                    <div key={month.display} className="flex flex-col" style={{ minWidth: `${daySize * month.dayCount}rem` }}>
                      <div className="flex items-center text-left w-full">
                        <strong className="flex-1 text-gray-400">{month.display}</strong>
                      </div>
                    </div>
                  ))}
                </header>
                <div className="relative flex flex-row flex-1 mx-4">
                  <div className="absolute top-0 left-0">
                    {tasks.map((task, index) => (
                      <TaskItem
                        key={task.name}
                        task={task}
                        daySize={daySize}
                        firstTimelineDay={months[0].date}
                        tabIndex={index + 5}
                      />
                    ))}
                  </div>
                  {months.map((month) => (
                    <div
                      key={month.display}
                      className="monthBox flex flex-row h-full border-gray-300 dark:border-gray-500 border-dashed"
                      style={{ minWidth: `${daySize * month.dayCount}rem` }}
                    >
                      {Array(month.dayCount).fill('').map((value, index) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          className="dayBox h-full border-gray-100 dark:border-gray-700"
                          style={{ minWidth: `${daySize}rem` }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </TaskTimelineContainer>
        </>
        )}
      </div>
    </>
  );
};

export default TaskTimeline;
