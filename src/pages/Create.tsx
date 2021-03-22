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
    <div className="background absolute dark:bg-black flex justify-center items-center w-full h-full min-h-full">
      <section id="create" className="max-w-lg w-full px-4">
        <header className="w-full py-4 rounded-lg">
          <Link to="/" className="linkHover w-7 flex justify-center items-center">
            <FiArrowLeft className="w-full h-full text-gray-700 dark:text-gray-300" />
          </Link>
        </header>
        <form onSubmit={handleFormSubmit}>
          <div className="w-full pt-4 pb-6">
            <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300">Create new Project</h1>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="title" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">Title</label>
              <input
                className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                type="text"
                id="title"
                placeholder="Ex: Rocket"
              />
            </div>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="title" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">Subtitle</label>
              <input
                className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                type="text"
                id="title"
                placeholder="Ex: Send rockets to mars"
              />
            </div>
          </div>
          <footer className="grid grid-cols-2 gap-2">
            <button
              className="button text-gray-800 dark:text-gray-600"
              type="reset"
              style={{ backgroundColor: '#dde9f3' }}
            >
              Clear
            </button>
            <button className="button text-white" type="submit">Create</button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default Create;
