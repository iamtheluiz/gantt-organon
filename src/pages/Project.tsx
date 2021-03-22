import { useEffect, useState } from 'react';
import {
  FiArrowLeft, FiCode, FiDownload, FiPlus,
} from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import '../styles/pages/Project.css';

interface Task {
  name: string;
  color: string;
}

function Project() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks([
      {
        name: 'Planning',
        color: '#f98e72',
      },
      {
        name: 'Development',
        color: '#79d5f8',
      },
    ]);
  }, []);

  return (
    <section id="project" className="w-full min-h-screen">
      <header className="flex items-center p-4 bg-white shadow-md">
        <Link to="/" className="w-7 flex justify-center items-center">
          <FiArrowLeft className="w-full h-full text-gray-700" />
        </Link>
        <div id="logo" className="flex justify-center items-center h-10 w-10 ml-4 rounded-md">
          <BiRocket size={28} color="#FFF" />
        </div>
        <div className="ml-2 flex flex-col justify-center">
          <h1 className="font-serif text-base">Gantt Organon</h1>
          <span className="text-sm font-light">Project subtitle</span>
        </div>
      </header>
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
              <div
                className="flex flex-row items-center text-left w-full h-14 px-4 border-l-4"
                style={{ borderColor: task.color }}
              >
                <div className="flex flex-row items-center flex-1">
                  <FiCode className="w-7 h-full" color={task.color} />
                  <strong className="text-base text-gray-600 ml-1">{task.name}</strong>
                </div>
                <div className="flex flex-row items-center w-24">
                  <div
                    className="flex flex-row items-center justify-center w-9 h-9 rounded-full"
                    style={{ backgroundColor: task.color }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white" />
                  </div>
                  <span className="ml-2">
                    <strong>7</strong>
                    /10
                  </span>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </main>
    </section>
  );
}

export default Project;
