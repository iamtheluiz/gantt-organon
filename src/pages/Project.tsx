import { useEffect, useState } from 'react';
import { FiDownload, FiPlus } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import { useTask } from '../context/task';

import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import TaskInfo from '../components/TaskInfo';

import '../styles/pages/Project.css';

function Project() {
  const { tasks } = useTask();
  const [months, setMonths] = useState<{ display: string, dayCount: number}[]>([]);
  const daySize = 0.5;
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
    <section id="project" className="w-full min-h-screen dark:bg-black">
      <Header title="Rocket" subtitle="Send rockets to mars!" backTo="/">
        <BiRocket size={28} color="#FFF" />
      </Header>
      <main className="p-4">
        <header className="flex flex-row-reverse">
          <div className="flex flex-row gap-2">
            <button
              className="button max-w-max flex justify-center items-center shadow-md"
            >
              <FiDownload color="#fff" size={18} />
              <span className="text-sm ml-1 text-white">Export</span>
            </button>
            <button className="button max-w-max flex justify-center items-center shadow-md">
              <FiPlus color="#fff" size={18} />
              <span className="text-sm ml-1 text-white">Add Task</span>
            </button>
          </div>
        </header>

        <div className="flex flex-row mt-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
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
        </div>
      </main>
    </section>
  );
}

export default Project;
