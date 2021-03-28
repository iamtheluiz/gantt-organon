import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPlus, FiSettings } from 'react-icons/fi';
import { useDatabase } from '../context/database';

import ProjectItem from '../components/ProjectItem';

import '../styles/pages/Home.css';

function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const history = useHistory();
  const { database } = useDatabase();

  useEffect(() => {
    async function getProjects() {
      setProjects(await database.get('projects').query().fetch());
    }

    getProjects();
  }, []);

  function handleNavigateToCreateNewProject() {
    history.push('/create');
  }

  function handleNavigateToProject(id: string) {
    history.push(`/project/${id}`);
  }

  return (
    <div className="relative flex justify-center items-center dark:bg-black w-full min-h-screen h-full">
      <Link to="/settings" className="linkHover absolute top-4 right-4 w-7 flex justify-center items-center">
        <FiSettings className="w-full h-full text-gray-700 dark:text-gray-300" />
      </Link>
      <section id="home" className="flex justify-center items-center flex-col w-full max-w-xl p-4">
        <header className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Gantt Organon</h1>
          <span className="text-lg font-light text-gray-600 dark:text-gray-300">Project Schedule in WEB</span>
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
                <FiPlus className="text-gray-700 dark:text-gray-300" />
              </ProjectItem>
            </li>
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectItem
                  handleUserClick={() => handleNavigateToProject(project.id)}
                  title={project.title}
                  subtitle={project.subtitle}
                >
                  <span>{project.emoji}</span>
                </ProjectItem>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
