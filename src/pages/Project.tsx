import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Picker } from 'emoji-mart';
import {
  FiDownload, FiPlus, FiCheck, FiX,
} from 'react-icons/fi';
import Swal from 'sweetalert2';

// Components
import Header from '../components/Header';
import TaskTimeline from '../components/TaskTimeline';

// Contexts
import { useProject } from '../contexts/project';

// Styles
import '../styles/pages/Project.css';
import Button from '../components/form/Button';
import useDarkTheme from '../hooks/useDarkTheme';

function Project() {
  const [daySize, setDaySize] = useState(1.2);
  const [emojiMenuIsOpen, setEmojiMenuIsOpen] = useState(false);
  const [showUpdateConfirmationButton, setShowUpdateConfirmationButton] = useState(false);
  const [projectEmoji, setProjectEmoji] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const { id: project_id } = useParams<{ id: string }>();
  const { darkTheme } = useDarkTheme();

  const {
    project, getAndSetProjectDataFromId, editProject, tasks,
  } = useProject();
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

  useEffect(() => {
    if (project.title) {
      setProjectEmoji(project.emoji);
      setProjectTitle(project.title);
      setProjectDescription(project.subtitle);
    }
  }, [project]);

  useEffect(() => {
    const { title, subtitle, emoji } = project;

    if (projectTitle !== title || projectDescription !== subtitle || projectEmoji !== emoji) {
      setShowUpdateConfirmationButton(true);
    } else {
      setShowUpdateConfirmationButton(false);
    }
  }, [projectTitle, projectDescription, projectEmoji]);

  async function submitProjectDataUpdate() {
    if (projectTitle.length <= 2) {
      Swal.fire({
        title: 'Warning!',
        text: 'Project title should have, at least, 3 characters',
        icon: 'warning',
      });

      return;
    }

    const updateSuccess = await editProject({
      ...project,
      title: projectTitle,
      subtitle: projectDescription,
      emoji: projectEmoji,
    });

    if (updateSuccess) {
      setShowUpdateConfirmationButton(false);

      Swal.fire(
        'Updated!',
        'Project data updated successfully!',
        'success',
      );
    } else {
      Swal.fire(
        'Error!',
        'Sorry, an error ocurred...',
        'error',
      );
    }
  }

  function cancelProjectDataUpdate() {
    setProjectTitle(project.title);
    setProjectDescription(project.subtitle);
    setProjectEmoji(project.emoji);
  }

  function handleNavigateToNewTask() {
    history.push(`/project/${project_id}/task`);
  }

  function handleExportDiagram() {
    history.push(`/export/${project_id}`);
  }

  return (
    <section id="project" className="flex flex-col items-center w-full min-h-screen">
      {project && (
      <>
        <Header projectId={project_id} backTo="/">
          <div
            id="logo"
            className="flex justify-center items-center h-10 w-10 ml-4 rounded-md relative"
            style={{ backgroundColor: 'var(--primary-purple)' }}
          >
            <button onClick={() => setEmojiMenuIsOpen(!emojiMenuIsOpen)}>
              {projectEmoji}
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
              emoji={projectEmoji}
              onSelect={(emoji: any) => {
                setProjectEmoji(emoji.native ?? '🚀');
                setEmojiMenuIsOpen(false);
              }}
              showPreview={false}
              theme={darkTheme ? 'dark' : 'light'}
            />
          </div>
          <div className="flex flex-row">
            <div className="ml-2 flex flex-col justify-center">
              <input
                type="text"
                className="font-serif text-base dark:text-gray-300 bg-transparent"
                value={projectTitle}
                maxLength={22}
                minLength={2}
                onChange={(event) => setProjectTitle(event.currentTarget.value)}
              />
              <input
                type="text"
                className="text-sm font-light dark:text-gray-300 bg-transparent"
                value={projectDescription}
                onChange={(event) => setProjectDescription(event.currentTarget.value)}
              />
            </div>
            {showUpdateConfirmationButton && (
              <div className="flex flex-row justify-center items-center">
                <FiCheck className="text-green-600 text-2xl cursor-pointer" onClick={submitProjectDataUpdate} />
                <FiX className="text-red-600 text-2xl cursor-pointer" onClick={cancelProjectDataUpdate} />
              </div>
            )}
          </div>
        </Header>

        <main className="p-4 w-full max-w-screen-2xl">

          <header className="flex flex-row-reverse">
            <div className="flex flex-row gap-2">
              {tasks.length > 0 && (
                <Button className="max-w-max" type="button" onClick={handleExportDiagram} primary>
                  <FiDownload color="#fff" size={18} />
                  <span className="text-sm ml-1 text-white">Export</span>
                </Button>
              )}
              <Button className="max-w-max" type="button" onClick={handleNavigateToNewTask} primary>
                <FiPlus color="#fff" size={18} />
                <span className="text-sm ml-1 text-white">Add Task</span>
              </Button>
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
  );
}

export default Project;
