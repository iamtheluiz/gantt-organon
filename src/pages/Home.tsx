import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import ProjectItem from '../components/ProjectItem';

import '../styles/pages/Home.css';

function Home() {
  const history = useHistory();

  function handleNavigateToCreateNewProject() {
    history.push('/create');
  }

  function handleNavigateToProject() {
    history.push('/project/1');
  }

  return (
    <section id="home" className="flex justify-center items-center flex-col w-full max-w-xl p-4">
      <header className="text-center w-full">
        <h1 className="text-4xl font-bold text-gray-800">Gantt Organon</h1>
        <span className="text-lg font-light text-gray-600">Project Schedule in WEB</span>
      </header>
      <div className="w-full mt-8 overflow-y-auto max-h-96">
        <ul className="grid grid-cols-3 list-none gap-2">
          <li>
            <ProjectItem
              handleUserClick={handleNavigateToCreateNewProject}
              title="Create Project"
              subtitle="New project schedule"
              color="#359756"
            >
              <FiPlus />
            </ProjectItem>
          </li>
          <li>
            <ProjectItem
              handleUserClick={handleNavigateToProject}
              title="Rocket"
              subtitle="Send rockets to mars!"
            >
              <BiRocket />
            </ProjectItem>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
