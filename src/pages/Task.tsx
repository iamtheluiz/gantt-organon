import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { FiX } from 'react-icons/fi';
import { VscSymbolColor } from 'react-icons/vsc';

// Components
import { SketchPicker } from 'react-color';
import InputField from '../components/form/InputField';
import SimpleHeader from '../components/SimpleHeader';
import SimpleActionButton from '../components/SimpleActionButton';
import Modal from '../components/Modal';
import TaskItem from '../components/TaskItem';
import Button from '../components/form/Button';

// Contexts
import { Task, useProject } from '../contexts/project';

// Styles
import '../styles/pages/Create.css';
import 'emoji-mart/css/emoji-mart.css';

// Utils
import getTextColorFromBackgroundColor from '../utils/getTextColorFromBackgroundColor';

function TaskPage() {
  const { id: project_id } = useParams<{ id: string }>();
  const defaultDate = new Date(new Date().setHours(0, 0, 0, 0));

  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#00bcd4');
  const [start, setStart] = useState(defaultDate);
  const [end, setEnd] = useState(defaultDate);

  const history = useHistory();
  const { task_id } = useParams<{ task_id?: string }>();
  const {
    getTaskData, addNewTask, editTask, removeTask,
  } = useProject();

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

  // eslint-disable-next-line no-unused-vars
  function handleDateChange(event: FormEvent<HTMLInputElement>, setValue: (date: any) => void) {
    try {
      const { value } = event.currentTarget;

      setValue(new Date(`${value} 00:00`));
    } catch (error) {
      setValue((oldDate: any) => oldDate);
    }
  }

  function handleRemoveTask() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (task_id) {
          const taskData = await getTaskData(task_id);
          await removeTask(taskData);

          history.push(`/project/${project_id}`);
        }

        Swal.fire({
          title: 'Deleted!',
          text: 'Task deleted from project',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Oopps...',
          text: 'We had an error deleting this task',
          icon: 'error',
        });
      }
    });
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
                  className="h-12 w-full px-2 flex justify-center items-center rounded-md"
                  type="button"
                  style={{ backgroundColor: color }}
                  onClick={toggleColorModal}
                >
                  <VscSymbolColor className={`text-3xl ${getTextColorFromBackgroundColor(color) === 'black' ? 'text-gray-800' : 'text-gray-200'}`} />
                </button>
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
                    name: title || 'Planning',
                    start,
                    end,
                    color,
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
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-2">
              <InputField
                id="start"
                name="start"
                type="date"
                label="Start"
                value={start.toISOString().split('T')[0]}
                onChange={(event) => handleDateChange(event, setStart)}
                onKeyDown={(event) => { event.preventDefault(); }}
                required
              />
              <InputField
                id="end"
                name="end"
                type="date"
                label="End"
                value={end.toISOString().split('T')[0]}
                onChange={(event) => handleDateChange(event, setEnd)}
                onKeyDown={(event) => { event.preventDefault(); }}
                required
              />
            </div>
          </div>
          <footer className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {!task_id ? (
              <>
                <Button className="text-gray-800 dark:text-gray-600" type="reset" style={{ backgroundColor: '#dde9f3' }}>
                  Clear
                </Button>
                <Button className="text-white" type="submit" primary>
                  Create
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-red-500 text-white" type="button" onClick={handleRemoveTask}>
                  Remove
                </Button>
                <Button className="text-white" type="submit" primary>
                  Save
                </Button>
              </>
            )}
          </footer>
        </form>
      </section>
    </div>
  );
}

export default TaskPage;
