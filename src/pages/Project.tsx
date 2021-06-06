import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiDownload, FiPlus } from 'react-icons/fi';

// Components
import Header from '../components/Header';
import TaskTimeline from '../components/TaskTimeline';

// Contexts
import { useProject } from '../contexts/project';

// Styles
import '../styles/pages/Project.css';
import Button from '../components/form/Button';

function Project() {
  const [daySize, setDaySize] = useState(1.2);

  const { id: project_id } = useParams<{ id: string }>();

  const { project, getAndSetProjectDataFromId } = useProject();
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
            className="flex justify-center items-center h-10 w-10 ml-4 rounded-md"
            style={{ backgroundColor: 'var(--primary-purple)' }}
          >
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
              <Button className="max-w-max" type="button" onClick={handleExportDiagram} primary>
                <FiDownload color="#fff" size={18} />
                <span className="text-sm ml-1 text-white">Export</span>
              </Button>
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
