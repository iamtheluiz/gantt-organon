import { FiArrowLeft, FiDownload, FiPlus } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import '../styles/pages/Project.css';

function Project() {
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
      </main>
    </section>
  );
}

export default Project;
