import { FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/Create.css';

function Create() {
  const history = useHistory();

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    history.push('/project/1');
  }

  return (
    <div className="background">
      <section id="create" className="container">
        <header>
          <Link to="/">
            <FiArrowLeft size={26} color="#696969" />
          </Link>
        </header>
        <form onSubmit={handleFormSubmit}>
          <div className="content">
            <h1>Create new Project</h1>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" placeholder="Ex: Rocket" />
            </div>
            <div className="input-field">
              <label htmlFor="title">Subtitle</label>
              <input type="text" id="title" placeholder="Ex: Send rockets to mars!" />
            </div>
          </div>
          <footer>
            <button
              className="button"
              type="reset"
              style={{ backgroundColor: '#dde9f3', color: '#666' }}
            >
              Clear
            </button>
            <button className="button" type="submit">Create</button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default Create;
