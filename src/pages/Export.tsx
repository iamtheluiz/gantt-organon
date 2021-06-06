import { useEffect, useRef } from 'react';
import { FiDownload } from 'react-icons/fi';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { useHistory } from 'react-router-dom';

// Contexts
import { useProject } from '../contexts/project';

// Components
import TaskTimeline from '../components/TaskTimeline';
import Header from '../components/Header';

function Export() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { project } = useProject();
  const history = useHistory();

  useEffect(() => {
    if (!project.title) {
      history.push('/');
    }
  }, []);

  async function createDiagramImage() {
    if (timelineRef.current) {
      const canvas = await html2canvas(timelineRef.current, {
        scale: 1.5,
        allowTaint: true,
        useCORS: true,
      });

      const data = canvas.toDataURL('image/png');
      const newData = data.replace(/^data:image\/png/, 'data:application/octet-stream');

      return newData;
    }
    return '';
  }

  function downloadImage(url: string) {
    // Creating new link node.
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.title?.split(' ').join('-')}.png`;

    // Dispatching click event.
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
    }
  }

  async function handleDownloadImage() {
    Swal.fire({
      title: 'Loading your Diagram',
      html: 'Please wait...',
      onOpen: () => {
        setTimeout(async () => {
          const data = await createDiagramImage();
          downloadImage(data);

          Swal.fire({
            title: 'Exported!',
            html: 'Your diagram has been exported!',
          });
        }, 300);
      },
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
    });
  }

  return (
    <section id="project" className="flex flex-col items-center w-full min-h-screen">
      <Header
        projectId={project.id}
        backTo={`/project/${project.id}`}
      >
        <div className="flex w-full flex-1 px-4">
          <div
            id="logo"
            className="flex justify-center items-center h-10 w-10 rounded-md"
            style={{ backgroundColor: 'var(--primary-purple)' }}
          >
            {project.emoji}
          </div>
          <div className="ml-2 flex flex-1 flex-col justify-center">
            <h1 className="font-serif text-base dark:text-gray-300">{project.title}</h1>
            <span className="text-sm font-light dark:text-gray-300">{project.subtitle}</span>
          </div>
          <button className="button primary w-36 h-full flex justify-center items-center shadow-md" onClick={handleDownloadImage}>
            <FiDownload color="#fff" size={18} />
            <span className="text-sm ml-1 text-white">Download</span>
          </button>
        </div>
      </Header>
      <div className="flex flex-col w-full items-start overflow-x-auto">
        <div className="w-full p-3">
          <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300">Preview</h1>
        </div>
        <div ref={timelineRef} className="toCanvas w-max p-3 dark:bg-black">
          <div className="flex flex-row">
            <div
              className="flex justify-center items-center h-10 w-10 ml-0 rounded-md"
              style={{ backgroundColor: 'var(--primary-purple)' }}
            >
              {project.emoji}
            </div>
            <div className="ml-2 flex flex-col justify-center">
              <h1 className="font-serif text-base dark:text-gray-300">{project.title}</h1>
              <span className="text-sm font-light dark:text-gray-300">{project.subtitle}</span>
            </div>
          </div>
          <TaskTimeline container="div" />
        </div>
      </div>
    </section>
  );
}

export default Export;
