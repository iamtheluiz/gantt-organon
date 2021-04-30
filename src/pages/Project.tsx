import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiDownload, FiPlus, FiX } from 'react-icons/fi';
import { VscSymbolColor } from 'react-icons/vsc';

// Components
import { CirclePicker, SketchPicker } from 'react-color';
import Header from '../components/Header';
import TaskTimeline from '../components/TaskTimeline';
import Modal from '../components/Modal';
import InputField from '../components/form/InputField';
import TaskItem from '../components/TaskItem';
import SimpleHeader from '../components/SimpleHeader';
import SimpleActionButton from '../components/SimpleActionButton';

// Utilities
import getFormInputValues from '../utils/getFormInputValues';

// Contexts
import { useProject } from '../contexts/project';

// Styles
import '../styles/pages/Project.css';

function Project() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#00bcd4');
  const [daySize, setDaySize] = useState(1.2);

  const { id: project_id } = useParams<{ id: string }>();

  const { addNewTask, project, getAndSetProjectDataFromId } = useProject();
  const history = useHistory();

  useEffect(() => {
    async function setProjectData() {
      // If project isn't already loaded
      if (project.id !== project_id) {
        const success = await getAndSetProjectDataFromId(project_id);

        if (!success) {
          history.push('/');
        }
      }
    }
    setProjectData();
  }, [project_id]);

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

  async function handleExportDiagram() {
    history.push(`/export/${project_id}`);
  }

  return (
    <>
      <Modal modalIsOpen={modalIsOpen}>
        <SimpleHeader>
          <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">Create new Task</h1>
          <SimpleActionButton icon={FiX} onClick={() => setModalIsOpen(!modalIsOpen)} />
        </SimpleHeader>
        <form onSubmit={handleSubmitNewTask}>
          <div className="w-full pb-6">
            <div className="flex flex-row w-full">
              <div className="flex flex-row md:flex-col justify-around items-center pr-2">
                <input type="hidden" name="color" value={color} />
                <button
                  className="w-24 px-2 flex justify-center items-center md:w-full md:h-12 rounded-md"
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
                >
                  <SimpleHeader>
                    <SimpleActionButton icon={FiX} onClick={() => setColorModalIsOpen(!colorModalIsOpen)} />
                  </SimpleHeader>
                  <SketchPicker color={color} onChange={(value) => setColor(value.hex)} />
                </Modal>
                )}
              </div>
              <div className="flex flex-1">
                <TaskItem
                  task={{
                    name: title || 'Planning', start: new Date(), end: new Date(), color,
                  }}
                  tabIndex={-1}
                  daySize={0}
                />
              </div>
            </div>
            <InputField
              id="name"
              name="name"
              placeholder="Ex: Planning"
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <InputField
                id="start"
                name="start"
                type="date"
                label="Start"
                required
              />
              <InputField
                id="end"
                name="end"
                type="date"
                label="End"
                required
              />
            </div>
          </div>
          <footer className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

      <section id="project" className="toCanvas flex flex-col items-center w-full min-h-screen dark:bg-black">
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
                  <button className="button max-w-max flex justify-center items-center shadow-md" onClick={handleExportDiagram}>
                    <FiDownload color="#fff" size={18} />
                    <span className="text-sm ml-1 text-white">Export</span>
                  </button>
                  <button className="button max-w-max flex justify-center items-center shadow-md" onClick={toggleModal}>
                    <FiPlus color="#fff" size={18} />
                    <span className="text-sm ml-1 text-white">Add Task</span>
                  </button>
                </div>
              </header>

              <div className="w-full flex flex-row-reverse pt-4">
                <select value={daySize} onChange={(event) => setDaySize(Number(event.currentTarget.value))}>
                  <option value={0.8}>80%</option>
                  <option value={0.9}>90%</option>
                  <option value={1}>100%</option>
                  <option value={1.1}>110%</option>
                  <option value={1.2}>120%</option>
                </select>
              </div>
              <TaskTimeline container="scroll" daySize={daySize} />
            </main>
          </>
        )}
      </section>
    </>
  );
}

export default Project;
