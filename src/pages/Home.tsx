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
    <section id="home" className="container">
      <header>
        <h1>Gantt Organon</h1>
        <span>Project Schedule in WEB</span>
      </header>
      <div className="content">
        <ul>
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
