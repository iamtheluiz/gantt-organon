import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Picker } from 'emoji-mart';

// Components
import InputField from '../components/form/InputField';
import Button from '../components/form/Button';
import SimpleHeader from '../components/SimpleHeader';

// Utilities
import getFormInputValues from '../utils/getFormInputValues';

// Contexts
import { useDatabase } from '../contexts/database';

// Models
import ProjectModel from '../models/Project';

// Styles
import '../styles/pages/Create.css';
import 'emoji-mart/css/emoji-mart.css';
import useDarkTheme from '../hooks/useDarkTheme';

function Create() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('🚀');
  const [emojiMenuIsOpen, setEmojiMenuIsOpen] = useState(false);

  const history = useHistory();
  const { database } = useDatabase();
  const { darkTheme } = useDarkTheme();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = getFormInputValues(form);
    let project_id = '';

    const projectsCollection = database.collections.get<ProjectModel>('projects');

    await database.action(async () => {
      const createdProject = await projectsCollection.create((project) => {
        project.title = formData.title;
        project.subtitle = formData.subtitle;
        project.emoji = formData.emoji;
      });

      project_id = createdProject.id;
    });

    form.reset();

    if (project_id !== '') {
      history.push(`/project/${project_id}`);
    } else {
      history.push('/');
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen overflow-y-auto px-4">
      <section id="create" className="max-w-lg w-full px-4">
        <SimpleHeader backTo="/" />
        <form onSubmit={handleFormSubmit}>
          <div className="w-full pt-4 pb-6">
            <div className="flex flex-row items-center">
              <div className="relative input-field flex flex-col py-2">
                <button type="button" className="text-3xl mr-2" onClick={() => setEmojiMenuIsOpen(!emojiMenuIsOpen)}>
                  {selectedEmoji}
                </button>
                <Picker
                  style={{
                    position: 'absolute',
                    top: '0px',
                    left: '40px',
                    display: emojiMenuIsOpen ? 'initial' : 'none',
                  }}
                  title=""
                  native
                  emoji={selectedEmoji}
                  onSelect={(emoji: any) => {
                    setSelectedEmoji(emoji.native ?? '🚀');
                    setEmojiMenuIsOpen(false);
                  }}
                  showPreview={false}
                  autoFocus={false}
                  theme={darkTheme ? 'dark' : 'light'}
                />
                <input type="hidden" id="emoji" name="emoji" placeholder="Ex: Rocket" value={selectedEmoji} />
              </div>
              <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300">Create new Project</h1>
            </div>
            <InputField
              id="title"
              name="title"
              placeholder="Ex: Rocket"
              label="Title"
              autoComplete="off"
              required
            />
            <InputField
              id="subtitle"
              name="subtitle"
              placeholder="Ex: Send rockets to mars"
              label="Subtitle"
              autoComplete="off"
              required
            />
          </div>
          <footer className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button className="text-gray-800 dark:text-gray-600" type="reset" style={{ backgroundColor: '#dde9f3' }}>
              Clear
            </Button>
            <Button className="text-white" type="submit" primary>Create</Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default Create;
