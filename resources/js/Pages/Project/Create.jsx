import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { Head, useForm } from '@inertiajs/react';
import TextAreaLabel from '@/Components/TextAreaLabel';
import CustomSelect from '@/Components/CustomSelect';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableComponent from '@/Components/TableComponent';
import { getClients } from '../../ClientApi';
import { getProjectById, store, update } from '../../ProjectApi';

export default function CreateProject({ isOpen, onClose, onConfirm, onCancel, additionalData, auth }) {
  const [clients, setClients] = useState([]);
  const [project, setProject] = useState([]);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    clientId: '',
    startDate: '',
    endDate: '',
    budget: '',
    finalPrice: '',
    expectedHours: '',
  });

  useEffect(() => {
    getAllClients();
    if (additionalData && additionalData.id !== undefined) {
      getProject();
    } else {
      setProject({});
      setData({
        name: '',
        description: '',
        clientId: '',
        startDate: '',
        endDate: '',
        budget: '',
        finalPrice: '',
        expectedHours: '',
      });
    }
  }, [additionalData]);

  const getProject = async () => {
    try {
      const project = await getProjectById(additionalData.id);
      setProject(project.project);
      setData({
        name: project.project.name,
        description: project.project.description,
        startDate: project.project.startDate,
        endDate: project.project.endDate,
        budget: project.project.budget,
        finalPrice: project.project.finalPrice,
        expectedHours: project.project.expectedHours,
        clientId: project.project.clientId,
      });
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const getAllClients = async () => {
    try {
      const clients = await getClients();
      setClients(clients.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (project.id !== undefined) {
      const responseU = await update(project.id, data);
      if (responseU.status === 'success') {
        onCancel();
      } else {
        if (responseU.errors) {
          setData('errors', responseU.errors);
        }
      }
    } else {
      const response = await store(data);
      if (response.status === 'success') {
        onCancel();
      } else {
        if (response.errors) {
          setData('errors', response.errors);
        }
      }
    }
  };

  const handleCancel = () => {
    onCancel();
    reset();
    setData('errors', {});
  };

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth='lg'>
      <Head title={project && project.id != null ? "Edit Project" : "Create Project"} />
      <p className='text-2xl font-bold text-center mt-2'>{project && project.id != null ? "Edit Project" : "Create Project"}</p>
      <div className="px-4 py-3 flex flex-col overflow-y-scroll max-h-screen h-[80vh]">
        <InputLabel htmlFor="name" value="Name" />
        <TextInput
          id="name"
          type="text"
          name="name"
          defaultValue={data.name}
          className="my-1 block w-full text-sm"
          autoComplete="name"
          isFocused={true}
          onChange={(e) => setData('name', e.target.value)}
        />
        <InputError message={data.errors?.name} className="mt-1 text-red-500 text-sm" />

        <InputLabel htmlFor="description" value="Description" />
        <TextAreaLabel
          className="my-1 block w-full text-sm"
          placeholder="Enter project description"
          rows={4}
          defaultValue={data.description}
          onChange={(e) => setData('description', e.target.value)}
        />
        <InputError message={data.errors?.description} className="mt-1 text-red-500 text-sm" />

        <InputLabel htmlFor="expectedHours" value="Expected Hours" />
        <TextInput
          id="expectedHours"
          type="number"
          name="expectedHours"
          defaultValue={data.expectedHours}
          className="my-1 block w-full text-sm"
          autoComplete="name"
          isFocused={true}
          onChange={(e) => setData('expectedHours', e.target.value)}
        />
        <InputError message={data.errors?.expectedHours} className="mt-1 text-red-500 text-sm" />

        <InputLabel htmlFor="budget" value="Budget" />
        <TextInput
          id="budget"
          type="text"
          name="budget"
          defaultValue={data.budget}
          className="my-1 block w-full text-sm"
          autoComplete="budget"
          onChange={(e) => setData('budget', e.target.value)}
        />
        <InputError message={data.errors?.budget} className="mt-1 text-red-500 text-sm" />

        <div className='my-1'>
          <h2 className="text-sm font-semibold m-1 text-center pr-4">Choose the client for this project</h2>
          <TableComponent
            data={clients}
            fieldsToShow={['name', 'email', 'phone']}
            onRowSelect={(id, name) => {
              setData('clientId', id);
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 ml-2 text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
