import { FiDownload, FiPlus } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import Header from '../components/Header';
import TaskTimeline from '../components/TaskTimeline';

import '../styles/pages/Project.css';

function Project() {
  return (
    <section id="project" className="w-full min-h-screen dark:bg-black">
      <Header title="Rocket" subtitle="Send rockets to mars!" backTo="/">
        <BiRocket size={28} color="#FFF" />
      </Header>

      <main className="p-4">

        <header className="flex flex-row-reverse">
          <div className="flex flex-row gap-2">
            <button className="button max-w-max flex justify-center items-center shadow-md">
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
          <TaskTimeline />
        </div>
      </main>
    </section>
  );
}

export default Project;
