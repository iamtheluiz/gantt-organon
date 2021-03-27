import { FormEvent, useState } from 'react';
import { FiDownload, FiPlus, FiX } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import { useTask } from '../context/task';

import Header from '../components/Header';
import TaskTimeline from '../components/TaskTimeline';

import '../styles/pages/Project.css';

function Project() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addNewTask } = useTask();

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleSubmitNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData: Record<string, string> = {};
    const formInputs = form.getElementsByTagName('input');

    for (let inputIndex = 0; inputIndex < formInputs.length; inputIndex++) {
      const input = formInputs[inputIndex];
      const inputName = input.getAttribute('name');

      if (inputName !== null) {
        formData[inputName] = input.value;
      }
    }

    addNewTask({
      name: formData.name,
      color: formData.color,
      start: new Date(formData.start.split('-').join('/')),
      end: new Date(formData.end.split('-').join('/')),
    });

    form.reset();
    setModalIsOpen(false);
  }

  return (
    <>
      {modalIsOpen && (
        <div className="absolute -inset-0 flex items-center justify-center w-full min-h-screen overflow-y-auto bg-black bg-opacity-80 z-30">
          <div className="max-w-lg w-full px-4">
            <form onSubmit={handleSubmitNewTask}>
              <header className="w-full py-4 rounded-lg">
                <button onClick={toggleModal} className="linkHover w-7 flex justify-center items-center">
                  <FiX className="w-full h-full text-gray-300" />
                </button>
              </header>
              <div className="w-full pt-4 pb-6">
                <h1 className="text-4xl font-semibold text-gray-300">Create new Task</h1>
                <div className="input-field flex flex-col py-2">
                  <label htmlFor="name" className="pb-1 text-base font-medium text-gray-400">Name</label>
                  <input
                    className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ex: Planning"
                  />
                </div>
                <div className="input-field flex flex-col py-2">
                  <label htmlFor="color" className="pb-1 text-base font-medium text-gray-400">Color</label>
                  <input
                    className="border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                    type="color"
                    id="color"
                    name="color"
                  />
                </div>
                <div className="input-field flex flex-col py-2">
                  <label htmlFor="start" className="pb-1 text-base font-medium text-gray-400">Start</label>
                  <input
                    className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                    type="date"
                    id="start"
                    name="start"
                    placeholder="Ex: Send rockets to mars"
                  />
                </div>
                <div className="input-field flex flex-col py-2">
                  <label htmlFor="end" className="pb-1 text-base font-medium text-gray-400">End</label>
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
          </div>
        </div>
      )}
      <section id="project" className="w-full min-h-screen dark:bg-black">
        <Header title="Rocket" subtitle="Send rockets to mars!" backTo="/">
          <BiRocket size={28} color="#FFF" />
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
      </section>
    </>
  );
}

export default Project;
