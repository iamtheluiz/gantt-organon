import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { FiX } from 'react-icons/fi';
import { VscSymbolColor } from 'react-icons/vsc';

// Components
import { CirclePicker, SketchPicker } from 'react-color';
import InputField from '../components/form/InputField';
import SimpleHeader from '../components/SimpleHeader';
import SimpleActionButton from '../components/SimpleActionButton';
import Modal from '../components/Modal';
import TaskItem from '../components/TaskItem';

// Contexts
import { Task, useProject } from '../contexts/project';

// Styles
import '../styles/pages/Create.css';
import 'emoji-mart/css/emoji-mart.css';

function NewTask() {
  const defaultDate = new Date(new Date().setHours(0, 0, 0, 0));
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#00bcd4');
  const [start, setStart] = useState(defaultDate);
  const [end, setEnd] = useState(defaultDate);
  const { id: project_id } = useParams<{ id: string }>();

  const {
    getTaskData, addNewTask, editTask, removeTask,
  } = useProject();
  const { task_id } = useParams<{ task_id?: string }>();
  const history = useHistory();

  useEffect(() => {
    async function setTaskData(id: string) {
      const taskData = await getTaskData(id);

      setTitle(taskData.name);
      setColor(taskData.color);
      setStart(taskData.start);
      setEnd(taskData.end);
    }
    if (task_id) {
      setTaskData(task_id);
    }
  }, []);

  function toggleColorModal() {
    setColorModalIsOpen(!colorModalIsOpen);
  }

  function returnToProjectPage() {
    history.push(`/project/${project_id}`);
  }

  async function handleRemoveTask() {
    if (task_id) {
      const taskData = await getTaskData(task_id);

      await removeTask(taskData);
      history.push(`/project/${project_id}`);
    }
  }

  function handleSubmitNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const task: Task = {
      name: title,
      color,
      start,
      end,
    };

    if (!task_id) {
      addNewTask(task, project_id);
    } else {
      editTask(task, task_id);
    }

    returnToProjectPage();
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen overflow-y-auto px-4">
      <section id="create" className="max-w-lg w-full px-4">
        <SimpleHeader>
          <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
            {!task_id ? 'Create new Task' : 'Edit Task'}
          </h1>
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
                    name: title || 'Planning', start, end, color,
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
                value={start.toISOString().split('T')[0]}
                onChange={(event) => setStart(new Date(`${event.currentTarget.value} 00:00`))}
                required
              />
              <InputField
                id="end"
                name="end"
                type="date"
                label="End"
                value={end.toISOString().split('T')[0]}
                onChange={(event) => setEnd(new Date(`${event.currentTarget.value} 00:00`))}
                required
              />
            </div>
          </div>
          <footer className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {!task_id ? (
              <button
                className="button text-gray-800 dark:text-gray-600"
                type="reset"
                style={{ backgroundColor: '#dde9f3' }}
              >
                Clear
              </button>
            ) : (
              <button
                className="button bg-red-500 text-white"
                type="button"
                onClick={handleRemoveTask}
              >
                Remove
              </button>
            )}

            <button className="button primary text-white" type="submit">
              {!task_id ? 'Create' : 'Save'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default NewTask;
