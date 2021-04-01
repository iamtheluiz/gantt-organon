import { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Picker } from 'emoji-mart';
import getFormInputValues from '../utils/getFormInputValues';

import { useDatabase } from '../contexts/database';

import ProjectModel from '../models/Project';

import '../styles/pages/Create.css';
import 'emoji-mart/css/emoji-mart.css';

function Create() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('🚀');
  const [emojiMenuIsOpen, setEmojiMenuIsOpen] = useState(false);

  const history = useHistory();
  const { database } = useDatabase();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = getFormInputValues(form);

    const projectsCollection = database.collections.get<ProjectModel>('projects');

    await database.action(async () => {
      await projectsCollection.create((project) => {
        project.title = formData.title;
        project.subtitle = formData.subtitle;
        project.emoji = formData.emoji;
      });
    });

    form.reset();
    history.push('/');
  }

  return (
    <div className="background absolute dark:bg-black flex justify-center items-center w-full min-h-screen overflow-y-auto px-4">
      <section id="create" className="max-w-lg w-full px-4">
        <header className="w-full py-4 rounded-lg">
          <Link to="/" className="linkHover w-7 flex justify-center items-center">
            <FiArrowLeft className="w-full h-full text-gray-700 dark:text-gray-300" />
          </Link>
        </header>
        <form onSubmit={handleFormSubmit}>
          <div className="w-full pt-4 pb-6">
            <div className="flex flex-row items-center">
              <div className="relative input-field flex flex-col py-2">
                <button type="button" className="text-3xl mr-2" onClick={() => setEmojiMenuIsOpen(!emojiMenuIsOpen)}>{selectedEmoji}</button>
                <Picker
                  style={{
                    position: 'absolute', top: '0px', left: '40px', display: emojiMenuIsOpen ? 'initial' : 'none',
                  }}
                  title=""
                  native
                  emoji={selectedEmoji}
                  onSelect={(emoji: any) => {
                    setSelectedEmoji(emoji.native ?? '🚀');
                    setEmojiMenuIsOpen(false);
                  }}
                  showPreview={false}
                />
                <input
                  type="hidden"
                  id="emoji"
                  name="emoji"
                  placeholder="Ex: Rocket"
                  value={selectedEmoji}
                  required
                />
              </div>
              <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300">Create new Project</h1>
            </div>
            <div className="input-field flex flex-1 flex-col py-2">
              <label htmlFor="title" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">Title</label>
              <input
                className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                type="text"
                id="title"
                name="title"
                placeholder="Ex: Rocket"
                required
              />
            </div>
            <div className="input-field flex flex-col py-2">
              <label htmlFor="title" className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">Subtitle</label>
              <input
                className="placeholder-gray-400 border-gray-500 border-b-2 text-base px-2.5 py-3.5"
                type="text"
                id="subtitle"
                name="subtitle"
                placeholder="Ex: Send rockets to mars"
                required
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
