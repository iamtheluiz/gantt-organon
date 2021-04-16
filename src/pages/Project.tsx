import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiDownload, FiPlus } from 'react-icons/fi';

// Utilities
import sortTaskList from '../utils/sortTaskList';
import getFormInputValues from '../utils/getFormInputValues';

// Models
import ProjectModel from '../models/Project';

// Contexts
import { useProject } from '../contexts/project';
import { useDatabase } from '../contexts/database';

// Components
import Header from '../components/Header';
import TaskTimeline from '../components/TaskTimeline';
import Modal from '../components/Modal';

// Styles
import '../styles/pages/Project.css';

function Project() {
  const [project, setProject] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id: project_id } = useParams<{ id: string}>();
  const { addNewTask, setTasks } = useProject();
  const { database } = useDatabase();

  useEffect(() => {
    async function getProjectData() {
      const projectData = await database.get<ProjectModel>('projects').find(project_id);
      const projectTasks = await projectData.tasks.fetch();

      setProject(projectData);
      setTasks(sortTaskList(projectTasks));
    }
    getProjectData();
  }, []);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleSubmitNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = getFormInputValues(form);

    addNewTask({
      name: formData.name,
      color: formData.color,
      start: new Date(formData.start.split('-').join('/')),
      end: new Date(formData.end.split('-').join('/')),
    }, project_id);

    setModalIsOpen(false);
  }

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <form onSubmit={handleSubmitNewTask}>
          <div className="w-full pt-4 pb-6">
            <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300">Create new Task</h1>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="name" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">Name</label>
              <input
                className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Planning"
              />
            </div>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="color" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">Color</label>
              <input
                className="border-gray-500 border-b-2 "
                type="color"
                id="color"
                name="color"
              />
            </div>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="start" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">Start</label>
              <input
                className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                type="date"
                id="start"
                name="start"
                placeholder="Ex: Send rockets to mars"
              />
            </div>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="end" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">End</label>
              <input
                className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                type="date"
                id="end"
                name="end"
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
      </Modal>
      <section id="project" className="w-full min-h-screen dark:bg-black">
        {project && (
          <>
            <Header title={project.title} subtitle={project.subtitle} backTo="/">
              <span className="text-xl">{project.emoji}</span>
            </Header>

            <main className="p-4">

              <header className="flex flex-row-reverse">
                <div className="flex flex-row gap-2">
                  <button className="button max-w-max flex justify-center items-center shadow-md">
                    <FiDownload color="#fff" size={18} />
                    <span className="text-sm ml-1 text-white">Export</span>
                  </button>
                  <button className="button max-w-max flex justify-center items-center shadow-md" onClick={toggleModal}>
                    <FiPlus color="#fff" size={18} />
                    <span className="text-sm ml-1 text-white">Add Task</span>
                  </button>
                </div>
              </header>

              <div className="flex flex-row mt-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                <TaskTimeline />
              </div>
            </main>
          </>
        )}
      </section>
    </>
  );
}

export default Project;
