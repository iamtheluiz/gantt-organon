import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiDownload, FiPlus } from 'react-icons/fi';
import { VscSymbolColor } from 'react-icons/vsc';

// Components
import { CirclePicker, SketchPicker } from 'react-color';
import Header from '../components/Header';
import TaskTimeline from '../components/TaskTimeline';
import Modal from '../components/Modal';

// Utilities
import sortTaskList from '../utils/sortTaskList';
import getFormInputValues from '../utils/getFormInputValues';

// Models
import ProjectModel from '../models/Project';

// Contexts
import { useProject } from '../contexts/project';
import { useDatabase } from '../contexts/database';

// Styles
import '../styles/pages/Project.css';

function Project() {
  const [project, setProject] = useState<ProjectModel>({} as ProjectModel);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const [color, setColor] = useState('#00bcd4');

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

  function toggleColorModal() {
    setColorModalIsOpen(!colorModalIsOpen);
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
              <label htmlFor="name" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-300">Name</label>
              <input
                className="placeholder-gray-600 dark:placeholder-gray-400 border-gray-500 border-b-2 text-base text-gray-500 dark:text-gray-300 px-2.5 py-3.5 bg-transparent"
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Planning"
              />
            </div>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="color" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-300">Color</label>
              <div className="h-full flex flex-row md:flex-col justify-around items-center">
                <input type="hidden" name="color" value={color} />
                <button
                  className="h-24 w-24 flex justify-center items-center md:w-full md:h-12 rounded-md"
                  type="button"
                  style={{ backgroundColor: color }}
                  onClick={toggleColorModal}
                >
                  <VscSymbolColor className="text-gray-200 text-3xl" />
                </button>
                <div className="md:hidden">
                  <CirclePicker color={color} onChange={(value) => setColor(value.hex)} />
                </div>
                {colorModalIsOpen && (
                  <Modal
                    modalIsOpen={colorModalIsOpen}
                    setModalIsOpen={setColorModalIsOpen}
                  >
                    <SketchPicker color={color} onChange={(value) => setColor(value.hex)} />
                  </Modal>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="input-field flex flex-col py-2">
                <label htmlFor="start" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-300">Start</label>
                <input
                  className="placeholder-gray-600 dark:placeholder-gray-400 border-gray-500 border-b-2 text-base text-gray-500 dark:text-gray-300 px-2.5 py-3.5 bg-transparent"
                  type="date"
                  id="start"
                  name="start"
                />
              </div>
              <div className="input-field flex flex-col py-2">
                <label htmlFor="end" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-300">End</label>
                <input
                  className="placeholder-gray-600 dark:placeholder-gray-400 border-gray-500 border-b-2 text-base text-gray-500 dark:text-gray-300 px-2.5 py-3.5 bg-transparent"
                  type="date"
                  id="end"
                  name="end"
                />
              </div>
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

      <section id="project" className="flex flex-col items-center w-full min-h-screen dark:bg-black">
        {project && (
          <>
            <Header
              projectId={project_id}
              backTo="/"
            >
              <div id="logo" className="flex justify-center items-center h-10 w-10 ml-4 rounded-md">
                {project.emoji}
              </div>
              <div className="ml-2 flex flex-col justify-center">
                <h1 className="font-serif text-base dark:text-gray-300">{project.title}</h1>
                <span className="text-sm font-light dark:text-gray-300">{project.subtitle}</span>
              </div>
            </Header>

            <main className="p-4 w-full max-w-screen-2xl">

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

              <TaskTimeline />
            </main>
          </>
        )}
      </section>
    </>
  );
}

export default Project;
