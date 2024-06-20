import React, { useEffect, useState } from 'react';
import Modal from '../../Components/Modal';
import InputLabel from '../../Components/InputLabel';
import TextInput from '../../Components/TextInput';
import { useForm } from '@inertiajs/inertia-react';
import InputError from '../../Components/InputError';
import TableComponent from '../../Components/TableComponent';
import { getUsers } from '../../UserApi';
import { store } from '../../RegistreProjecteUsuariControllerApi';

const PromptInputHours = ({ isOpen, onClose, onConfirm, onCancel, additionalData }) => {
  const [users, setUsers] = useState([]);
  const [selectedRowInfoUser, setSelectedRowInfoUser] = useState(null);

  useEffect(() => {
    getAllUsers();

    resetForm();
    setData({
      projectId: additionalData.idProject,
    });
  }, [isOpen]);

  const { data, setData, post, processing, errors, reset } = useForm({
    startHour: '',
    endHour: '',
    userId: '',
    projectId: '',
  });

  const handleRowSelectUser = (id, name) => {
    setData('userId', id);
    setSelectedRowInfoUser({ id, name });
  };

  const getAllUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await store(data);

      if (response.status === 'success') {
        onConfirm();
      } else {
        if (response.errors) {
          setData('errors', response.errors);
        }
        console.log('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const resetForm = () => {
    reset();
    setUsers([]);
    setSelectedRowInfoUser(null);
  };

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="sm">
      <div className="p-4">
        <div className="mb-4">
          <InputLabel htmlFor="startHour" value="StartHour" />
          <TextInput
            id="startHour"
            type="datetime-local"
            name="startHour"
            value={data.startHour}
            className="mt-1 block w-full"
            autoComplete="startHour"
            isFocused={true}
            onChange={(e) => setData('startHour', e.target.value)}
          />
          <InputError message={data.errors?.startHour} className="mt-2 text-red-500" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="endHour" value="EndHour" />
          <TextInput
            id="endHour"
            type="datetime-local"
            name="endHour"
            value={data.endHour}
            className="mt-1 block w-full"
            autoComplete="endHour"
            onChange={(e) => setData('endHour', e.target.value)}
          />
          <InputError message={data.errors?.endHour} className="mt-2 text-red-500" />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Assign the worker to these hours.
          </h2>

          <TableComponent
            data={users}
            fieldsToShow={['name', 'email', 'phone']}
            onRowSelect={handleRowSelectUser}
          />
          {selectedRowInfoUser !== null && (
            <p className="mt-3">Client seleccionat: {selectedRowInfoUser.name}</p>
          )}
        </div>
        <InputError message={data.errors?.userId} className="mt-2 text-red-500" />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PromptInputHours;
