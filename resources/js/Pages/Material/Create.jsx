import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { store } from '../../MaterialApi';
import { getProveidors } from '../../ProveidorApi';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableComponent from '@/Components/TableComponent';
import { getMaterialById, update } from '../../MaterialApi';
import Modal from '@/Components/Modal';

export default function Create({ isOpen, onClose, onConfirm, onCancel, additionalData, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        price: '',
        proveidorId: '',
    });

    const [proveidors, setProveidors] = useState([]);
    const [material, setMaterial] = useState({});
    const [selectedRowInfoProveidor, setSelectedRowInfoProveidor] = useState(null);

    useEffect(() => {
        if (additionalData && additionalData.id != null) {
            getMaterial();
        }
        getAllProveidors();
    }, [additionalData]);

    const getAllProveidors = async () => {
        try {
            const proveidors = await getProveidors();
            setProveidors(proveidors.proveidors);
        } catch (error) {
            console.error('Error fetching proveidors:', error);
        }
    }

    const getMaterial = async () => {
        const material1 = await getMaterialById(additionalData.id);
        setMaterial(material1.material);
        setData({
            name: material1.material.name,
            price: material1.material.price,
            proveidorId: material1.material.proveidorId,
        });
    }

    const handleRowSelectProveidor = (id, name) => {
        setData('proveidorId', id);
        setSelectedRowInfoProveidor({ id, name });
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (material.id != null) {
            const responseU = await update(material.id, data);
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

    const handleCancel = async (e) => {
        e.preventDefault();
        onCancel();
        reset();
        setData('errors', {});
    }

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Head title={material && material.id !== null ? "Update Material" : "Create Material"} />
            <div className='m-5'>
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold mx-auto">{material && material.id !== null ? "Update Material" : "Create Material"}</h1>
                </header>

                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={data.errors?.name} className="mt-2 text-red-500" />
                </div>

                <div className="my-4">
                    <InputLabel htmlFor="price" value="Price" />
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        defaultValue={data.price}
                        className="mt-1 block w-full"
                        autoComplete="price"
                        onChange={(e) => setData('price', e.target.value)}
                    />
                    <InputError message={data.errors?.price} className="mt-2 text-red-500" />
                </div>

                <TableComponent
                    data={proveidors}
                    fieldsToShow={['name', 'email', 'phone']}
                    onRowSelect={handleRowSelectProveidor}
                />
                <InputError message={data.errors?.proveidorId} className="mt-2 text-red-500" />


                <div className="flex content-between justify-between mt-4">
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
        </Modal >
    );
}
