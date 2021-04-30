import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { FiX } from 'react-icons/fi';
import { VscSymbolColor } from 'react-icons/vsc';
import { CirclePicker, SketchPicker } from 'react-color';
import InputField from '../components/form/InputField';
import SimpleHeader from '../components/SimpleHeader';

// Styles
import '../styles/pages/Create.css';
import 'emoji-mart/css/emoji-mart.css';
import getFormInputValues from '../utils/getFormInputValues';
import { useProject } from '../contexts/project';
import SimpleActionButton from '../components/SimpleActionButton';
import Modal from '../components/Modal';
import TaskItem from '../components/TaskItem';

function NewTask() {
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#00bcd4');
  const { id: project_id } = useParams<{ id: string }>();

  const { addNewTask } = useProject();
  const history = useHistory();

  function toggleColorModal() {
    setColorModalIsOpen(!colorModalIsOpen);
  }

  function returnToProjectPage() {
    history.push(`/project/${project_id}`);
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

    returnToProjectPage();
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen overflow-y-auto px-4">
      <section id="create" className="max-w-lg w-full px-4">
        <SimpleHeader>
          <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">Create new Task</h1>
          <SimpleActionButton icon={FiX} onClick={returnToProjectPage} />
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
                    <div />
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
      </section>
    </div>
  );
}

export default NewTask;
