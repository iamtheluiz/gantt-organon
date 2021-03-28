import { useEffect, useState } from 'react';
import { useTask } from '../contexts/task';

import TaskInfo from './TaskInfo';
import TaskItem from './TaskItem';

import '../styles/pages/Project.css';

function TaskTimeline() {
  const { tasks } = useTask();
  const [months, setMonths] = useState<{ display: string, dayCount: number}[]>([]);
  const daySize = 0.6;
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
          <aside className="taskList max-w-min sm:max-w-md w-full border-r-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center text-left w-full h-14 px-4 border-b-2 border-gray-200 dark:border-gray-700">
              <strong className="flex-1 text-gray-400 hidden sm:inline">Task name</strong>
              <strong className="w-24 text-gray-400">Progress</strong>
            </div>
            {tasks.map((task) => (
              <TaskInfo key={task.name} task={task} />
            ))}
          </aside>

          <div className="flex flex-col overflow-x-auto w-full">
            {months !== null && (
              <>
                <header className="flex flex-row w-max items-center h-14 px-4 border-b-2 border-gray-200 dark:border-gray-700">
                  {months.map((month) => (
                    <div key={month.display} className="flex flex-col" style={{ minWidth: `${daySize * 30}rem` }}>
                      <div className="flex items-center text-left w-full">
                        <strong className="flex-1 text-gray-400">{month.display}</strong>
                      </div>
                    </div>
                  ))}
                </header>
                <div className="flex-1 px-4">
                  {tasks.map((task) => (
                    <TaskItem key={task.name} task={task} daySize={daySize} firstTimelineDay={firstMonth} />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default TaskTimeline;
