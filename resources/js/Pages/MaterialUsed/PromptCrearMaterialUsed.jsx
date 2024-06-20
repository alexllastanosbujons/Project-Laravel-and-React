import { useEffect, useState } from 'react';
import Modal from '../../Components/Modal';
import InputLabel from '../../Components/InputLabel';
import TextInput from '../../Components/TextInput';
import { useForm } from '@inertiajs/inertia-react';
import InputError from '../../Components/InputError';
import TableComponent from '../../Components/TableComponent';
import { store } from '../../MaterialUsedApi';
import { getAllMaterials } from '../../MaterialApi';


const PromptCrearMaterialUsed = ({ isOpen, onClose, onConfirm, onCancel, additionalData }) => {
  const [materials, setMaterials] = useState([]);
  const [proveidors, setProveidors] = useState([]);
  const [selectedRowInfoMaterial, setSelectedRowInfoMaterial] = useState(null);

  useEffect(() => {
    getMaterials();
    setData('projectId', additionalData.idProject);
  }, []);

  const { data, setData, post, processing, errors, reset } = useForm({
    projectId: '',
    materialId: '',
    quantity: '',
  });

  const handleRowSelectMaterial = (id, name) => {
    setData('materialId', id);
    setSelectedRowInfoMaterial({ id, name });
  };

  const getMaterials = async () => {
    try {
      const materials = await getAllMaterials();
      setMaterials(materials.materials);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  }



  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log(data);
    const response = await store(data);

    if (response.status === 'success') {
      onConfirm();
    } else {
      console.log('Error:', response);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="sm">
      <div className="p-4">
        <div className="mb-4">
          <InputLabel htmlFor="quantity" value="Quantity" />
          <TextInput
            id="quantity"
            type="number"
            name="quantity"
            value={data.quantity}
            className="mt-1 block w-full"
            autoComplete="quantity"
            isFocused={true}
            onChange={(e) => setData('quantity', e.target.value)}
          />
          <InputError message={errors.quantity} className="mt-2 text-red-500" />
        </div>



        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Select the material used
          </h2>

          <TableComponent
            data={materials}
            fieldsToShow={['proveidor', 'name', 'price']}
            onRowSelect={handleRowSelectMaterial}
          />
          {selectedRowInfoMaterial !== null && (
            <p className="mt-3">Material seleccionat: {selectedRowInfoMaterial.name}</p>
          )}
        </div>
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

export default PromptCrearMaterialUsed;
