import { useEffect, useState } from 'react';
import { FiDownload, FiPlus } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';
import TaskInfo, { Task } from '../components/TaskInfo';

import '../styles/pages/Project.css';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';

function Project() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const months = ['Jan/21', 'Fev/21', 'Mar/21', 'Abr/21', 'Mai/21'];

  useEffect(() => {
    setTasks([
      {
        name: 'Planning',
        color: '#f98e72',
        start: '01/03/2021',
        end: '01/05/2021',
      },
      {
        name: 'Development',
        color: '#79d5f8',
        start: '01/03/2021',
        end: '01/05/2021',
      },
      {
        name: 'Deploy',
        color: '#4398b9',
        start: '01/04/2021',
        end: '01/05/2021',
      },
      {
        name: 'Tests',
        color: '#3ea776',
        start: '01/04/2021',
        end: '01/05/2021',
      },
    ]);
  }, []);

  return (
    <section id="project" className="w-full min-h-screen">
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
              <span className="text-sm ml-1">Export</span>
            </button>
            <button className="button max-w-max flex justify-center items-center shadow-md">
              <FiPlus color="#fff" size={18} />
              <span className="text-sm ml-1">Add Task</span>
            </button>
          </div>
        </header>

        <div className="flex flex-row mt-4 rounded-lg bg-white shadow-lg">
          <aside className="taskList max-w-md w-full border-r-2 border-gray-200">
            <div className="flex items-center text-left w-full h-14 px-4 border-b-2 border-gray-200">
              <strong className="flex-1 text-gray-400">Task name</strong>
              <strong className="w-24 text-gray-400">Progress</strong>
            </div>
            {tasks.map((task) => (
              <TaskInfo key={task.name} task={task} />
            ))}
          </aside>

          <div className="flex flex-col overflow-x-auto w-full">
            <header className="flex flex-row w-max items-center h-14 px-4 border-b-2 border-gray-200">
              {months.map((month) => (
                <div key={month} className="flex flex-col" style={{ minWidth: '14rem' }}>
                  <div className="flex items-center text-left w-full">
                    <strong className="flex-1 text-gray-400">{month}</strong>
                  </div>
                </div>
              ))}
            </header>
            <div className="flex-1 px-4">
              {tasks.map((task) => (
                <TaskItem task={task} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Project;
