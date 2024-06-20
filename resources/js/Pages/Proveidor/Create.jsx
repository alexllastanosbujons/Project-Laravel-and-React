import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { store } from '../../ProveidorApi';
import Modal from '@/Components/Modal';
import { getProveidor, updateProveidor } from '../../ProveidorApi';

export default function Create({ isOpen, onClose, onConfirm, onCancel, additionalData, auth }) {

    const [proveidor, setProveidor] = useState({});

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (additionalData && additionalData.id != null) {
            getProveidorById();
        } else {
            setProveidor({});
            setData({
                name: '',
                email: '',
                phone: '',
            });
        }

    }, [additionalData]);

    const getProveidorById = async () => {
        const proveidor1 = await getProveidor(additionalData.id);
        setData({
            name: proveidor1.proveidor.name,
            email: proveidor1.proveidor.email,
            phone: proveidor1.proveidor.phone,
        });
        setProveidor(proveidor1.proveidor);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (proveidor.id != null) {
            const response = await updateProveidor(proveidor.id, data);
            if (response.status === 'success') {
                onClose();
            } else {
                if (response.errors) {
                    setData('errors', response.errors);
                }
                console.log(response);
            }
        } else {
            const response = await store(data);
            if (response.status === 'success') {
                onClose();
            } else {
                if (response.errors) {
                    setData('errors', response.errors);
                }
                console.log(response);
            }
        }
    };


    const handleCancel = () => {
        onCancel();
        reset();
        setData('errors', {});
    }

    return (
        <Modal show={isOpen} onClose={onClose}>

            <Head title={(additionalData && additionalData.id !== null ? "Update Proveidor" : "Create Proveidor")} />
            <div className='m-5'>
                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold mx-auto">{(additionalData && additionalData.id !== null ? "Update Proveidor" : "Create Proveidor")}</h1>
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
                        type="text"
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
                        type="text"
                        name="phone"
                        defaultValue={data.phone}
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(e) => setData('phone', e.target.value)}
                    />

                    <InputError message={data.errors?.phone} className="mt-2 text-red-500" />
                </div>

                <div className="flex items-center justify-between mt-4">
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
}
