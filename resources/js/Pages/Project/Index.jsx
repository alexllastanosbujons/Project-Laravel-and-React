import { useEffect, useState } from 'react';
import TableComponent from '@/Components/TableComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import { destroyProject } from '@/ProjectApi';
import PromptCreaterProject from '@/Pages/Project/Create';
import FinishedSelect from '@/Components/FinishedSelect';

export default function Index({ status, auth }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPromptOpenCreateProject, setPromptOpenCreateProject] = useState(false);
  const [projectStatus, setProjectStatus] = useState('0');

  useEffect(() => {
    getAllProjects();
  }, [projectStatus]);

  const handleRowSelectProject = (id, name) => {
    setSelectedProject({ id, name });
  };

  const openPromptCreateProject = () => {
    setPromptOpenCreateProject(true);
  };

  const closePromptCreateProject = () => {
    setPromptOpenCreateProject(false);
    getAllProjects();
  };

  const handleDoubleClickProject = async (id) => {
    console.log(`Double click in the row with ID ${id}`);
    await Inertia.get('/projectView', { id: id });
  };

  const deleteProject = () => {
    destroyProject(selectedProject.id);
    getAllProjects();
  };

  const handleStatusChange = (e) => {
    setProjectStatus(e.target.value);
  };

  const getAllProjects = async () => {
    try {
      const response = await fetch("/api/getAllProjects");
      if (response.ok) {
        const data = await response.json();
        const dataFiltered = data.projects.filter(project => {
            console.log('Filtering Project:', project);
            return project.finished.toString() === projectStatus;
          });
        setProjects(dataFiltered);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error("S'ha produït un error en la crida GET:", error);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth}
      header={<h2 className="text-center font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
    >
      <Head title="Projects" />

      <div className="py-12 flex">

        <PromptCreaterProject
          isOpen={isPromptOpenCreateProject}
          onConfirm={closePromptCreateProject}
          onCancel={closePromptCreateProject}
          additionalData={selectedProject != null ? selectedProject.id && selectedProject.name != null ? selectedProject : null : null}
        />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mr-4 mb-4">
            <label className="mr-2">Status:</label>
            <FinishedSelect value={projectStatus} onChange={handleStatusChange} />
          </div>
          <TableComponent
            data={projects}
            fieldsToShow={['name', 'description', 'budget']}
            onRowSelect={handleRowSelectProject}
            onRowDoubleClick={handleDoubleClickProject}
            messageNull="There are no Projects"
          />
          {auth.user.admin ? selectedProject && selectedProject.id && selectedProject.name != null ? (
            <div className='flex flex-col md:flex-row items-center justify-center space-y-2 md:space-x-4 mt-3'>
              <PrimaryButton
                className="bg-yellow-500 hover:bg-yellow-700 md:w-32"
                onClick={openPromptCreateProject}
              >
                Edit Project
              </PrimaryButton>

              <PrimaryButton
                className="bg-red-500 hover:bg-red-700 mt-2 md:w-32"
                onClick={deleteProject}
              >
                Delete Project
              </PrimaryButton>
            </div>
          ) : (
            <div className='flex items-center justify-center mt-2'>
              <PrimaryButton
                className="bg-green-500 hover:bg-green-700 md:w-32"
                onClick={openPromptCreateProject}
              >
                Create Project
              </PrimaryButton>
            </div>
          ): null}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
