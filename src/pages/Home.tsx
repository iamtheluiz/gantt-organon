import { FiPlus } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import '../styles/pages/Home.css';
import { CSSProperties } from 'react';

function Home() {
  function handleOpenNewProjectModal() {

  }

  return (
    <section id="home">
      <header>
        <h1>Gantt Organon</h1>
        <span>Project Schedule in WEB</span>
      </header>
      <div className="content">
        <ul>
          <li>
            <div
              className="projectItem"
              style={{ '--active-color': '#359756' } as CSSProperties}
              onClick={handleOpenNewProjectModal}
              onKeyDown={handleOpenNewProjectModal}
              role="button"
              tabIndex={0}
            >
              <div className="iconContainer">
                <FiPlus />
              </div>
              <strong>Create Project</strong>
              <span>New project schedule</span>
            </div>
          </li>
          <li>
            <div className="projectItem" style={{ '--active-color': '#843794' } as CSSProperties}>
              <div className="iconContainer">
                <BiRocket />
              </div>
              <strong>Rocket Project</strong>
              <span>Launched rockets</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
