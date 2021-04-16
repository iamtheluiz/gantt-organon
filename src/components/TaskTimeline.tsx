import { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useProject } from '../contexts/project';

import TaskInfo from './TaskInfo';
import TaskItem from './TaskItem';

import '../styles/components/TaskTimeline.css';

function TaskTimeline() {
  const { tasks } = useProject();
  const [months, setMonths] = useState<{ display: string, dayCount: number}[]>([]);
  const daySize = 1;
  const [firstMonth, setFirstMonth] = useState<Date | null>(null);

  useEffect(() => {
    if (tasks.length > 0) {
      // On tasks change, reload month list
      // Get first day of the first month
      let firstMonthValue: Date = null as unknown as Date;
      let lastMonthValue: Date = null as unknown as Date;

      tasks.forEach((task) => {
        if (firstMonthValue === null || task.start.getTime() < firstMonthValue.getTime()) {
          firstMonthValue = new Date(task.start);
        }
        if (lastMonthValue === null || task.end.getTime() > lastMonthValue.getTime()) {
          lastMonthValue = new Date(task.end);
        }
      });

      // Set first day
      firstMonthValue.setDate(1);
      lastMonthValue.setDate(1);

      setFirstMonth(new Date(firstMonthValue));

      // Get month list
      const monthList: { display: string, dayCount: number }[] = [];
      while (firstMonthValue <= lastMonthValue) {
        monthList.push({
          display: `${firstMonthValue.getMonth() + 1}/${firstMonthValue.getFullYear()}`,
          dayCount: new Date(firstMonthValue.getFullYear(), firstMonthValue.getMonth() + 1, 0).getDate(),
        });

        // Add one month
        firstMonthValue = new Date(firstMonthValue.setMonth(firstMonthValue.getMonth() + 1));
      }
      setMonths(monthList);
    }
  }, [tasks]);

  return (
    <>
      {tasks.length === 0 && (
        <span className="p-4 w-full text-center text-gray-400">No task found. Register one to get started!</span>
      )}
      {tasks.length > 0 && (
        <>
          <aside className="taskList max-w-min hidden md:inline sm:max-w-md w-full border-r-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center text-left w-full h-14 px-4 border-b-2 border-gray-200 dark:border-gray-700">
              <strong className="flex-1 text-gray-400 hidden sm:inline">Task name</strong>
              <strong className="w-24 text-gray-400">Work Days</strong>
            </div>
            {tasks.map((task) => (
              <TaskInfo key={task.name} task={task} />
            ))}
          </aside>

          <ScrollContainer className="TaskTimeline flex flex-col w-full">
            {months !== null && (
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
                <div className="relative flex flex-row flex-1 px-4">
                  {months.map((month) => (
                    <div
                      className="monthBox flex flex-row h-full border-gray-300 dark:border-gray-500 border-dashed"
                      style={{ minWidth: `${daySize * month.dayCount}rem` }}
                    >
                      {Array(month.dayCount).fill('').map(() => (
                        <div className="dayBox h-full border-gray-100 dark:border-gray-700" style={{ minWidth: `${daySize}rem` }} />
                      ))}
                    </div>
                  ))}
                  <div className="absolute top-0 left-0">
                    {tasks.map((task, index) => (
                      <TaskItem key={task.name} task={task} daySize={daySize} firstTimelineDay={firstMonth} tabIndex={index + 5} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </ScrollContainer>
        </>
      )}
    </>
  );
}

export default TaskTimeline;
