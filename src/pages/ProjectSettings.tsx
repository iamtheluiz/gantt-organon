import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import Settings from './Settings';

import { useDatabase } from '../contexts/database';
import ProjectModel from '../models/Project';

function ProjectSettings() {
  const { id: project_id } = useParams<{ id: string}>();
  const history = useHistory();

  const { database } = useDatabase();

  async function handleDeleteProject() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const projectData = await database.get<ProjectModel>('projects').find(project_id);
        const projectTasks = await projectData.tasks.fetch();

        await database.action(async () => {
          await projectData.destroyPermanently();
          projectTasks.map(async (task: any) => {
            await task.destroyPermanently();
          });
        });

        Swal.fire(
          'Deleted!',
          'Project delete successfully!',
          'success',
        );

        history.push('/');
      }
    });
  }

  return (
    <Settings>
      <button
        className="w-full flex justify-center items-center bg-red-500 py-3 rounded-md transition-all hover:opacity-80"
        onClick={handleDeleteProject}
      >
        <span className="text-base text-gray-300">Delete Project</span>
      </button>
    </Settings>
  );
}

export default ProjectSettings;
