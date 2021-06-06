import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import Settings from './Settings';

import { useProject } from '../contexts/project';

function ProjectSettings() {
  const history = useHistory();

  const { project, deleteProject } = useProject();

  async function handleDeleteProject() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (deleteProject(project)) {
          Swal.fire(
            'Deleted!',
            'Project delete successfully!',
            'success',
          );

          history.push('/');
        } else {
          Swal.fire(
            'Error!',
            'Sorry, an error ocurred...',
            'error',
          );
        }
      }
    });
  }

  return (
    <Settings>
      <button
        className="w-full flex justify-center items-center bg-red-500 py-3 rounded-md transition-all hover:opacity-80"
        onClick={handleDeleteProject}
      >
        <span className="text-base text-gray-100">Delete Project</span>
      </button>
    </Settings>
  );
}

export default ProjectSettings;
