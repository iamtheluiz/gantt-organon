import { FiArrowLeft } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import '../styles/pages/Project.css';

function Project() {
  return (
    <section id="project">
      <header>
        <Link to="/">
          <FiArrowLeft size={26} color="#696969" />
        </Link>
        <div id="logo">
          <BiRocket size={28} color="#FFF" />
        </div>
        <div className="details">
          <h1>Gantt Organon</h1>
          <span>Project subtitle</span>
        </div>
      </header>
      <main />
    </section>
  );
}

export default Project;
