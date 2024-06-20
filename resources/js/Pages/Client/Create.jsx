import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableComponent from '@/Components/TableComponent';
import { getClientById, update, store } from '../../ClientApi';
import Modal from '@/Components/Modal';

export default function Create({ isOpen, onClose, onConfirm, onCancel, additionalData, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
    });

    const [client, setClient] = useState({});

    useEffect(() => {
        if (additionalData && additionalData.id != null) {
            getClient();
        } else {
            setClient({});
            reset();
        }
    }, [additionalData, isOpen]);

    

    const getClient = async () => {
        const client = await getClientById(additionalData.id);
        setClient(client.client);
        setData({
            name: client.client.name,
            email: client.client.email,
            phone:  client.client.proveidorId,
        });
    }



    const handleConfirm = async (e) => {
        e.preventDefault();
        if (client.id != null) {
            const responseU = await update(client.id, data);
            if (responseU.status === 'success') {
                onClose();
            } else {
                if (responseU.errors) {
                    setData('errors', responseU.errors);
                }
            }
        } else {
            const response = await store(data);
            if (response.status === 'success') {
                onClose();
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
            <Head title={client && client.id != null ? "Update Client" : "Create Client"} />
            <div className='m-5'>
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold mx-auto">{client && client.id != null ? "Update Client" : "Create Client"}</h1>
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

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        defaultValue={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={data.errors?.email} className="mt-2 text-red-500" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" />
                    <TextInput
                        id="phone"
                        type="number"
                        name="phone"
                        defaultValue={data.phone}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={data.errors?.phone} className="mt-2 text-red-500" />
                </div>


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
