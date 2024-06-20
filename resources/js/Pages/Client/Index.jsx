import { useEffect, useState } from 'react';
import TableComponent from '@/Components/TableComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import { destroyClient } from '@/ClientApi';
import { destroyProject } from '@/ProjectApi';
import PromptCreateClient from '@/Pages/Client/Create';
import PromptCreaterProject from '@/Pages/Project/Create';

export default function Index({ status, auth }) {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isPromptOpenCreateClient, setPromptOpenCreateClient] = useState(false);

    useEffect(() => {
        getAllClients();
    }, []);

    const handleRowSelectClient = (id, name) => {
        console.log('Selected Row ID:', id);
        setSelectedClient({ id, name});
    };


    const openPromptCreateClient = () => {
        console.log('selectedClient', selectedClient); 
        setPromptOpenCreateClient(true);
    };

    const closePromptCreateClient = () => {
        setPromptOpenCreateClient(false);
        window.location.reload();
    };


  

    const handleDoubleClickClient = (id) => {
        console.log(`Double click in the row with ID ${id}`);
    };


    const deleteClient = () =>{
        destroyClient(selectedClient.id);
        window.location.reload();
    }

 

    const getAllClients = async () => {
        try {
            const response = await fetch("/api/getAllClients");
            if (response.ok) {
                const data = await response.json();
                setClients(data.clients);
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Clients</h2>}
        >
            <Head title="Clients" />

            <div className="py-12 md:flex">
                <div className="max-w-7xl mx-auto">
                    <h2 className='text-center'>Clients</h2>
                    {selectedClient && selectedClient.id && selectedClient.name != null ? (
                        <p className="text-center text-gray-500">Client seleccionat: {selectedClient.name}</p>
                    ) : (
                        <p className="text-center text-gray-500"></p>
                    )}
                    <TableComponent
                        data={clients}
                        fieldsToShow={['name', 'email', 'phone']}
                        onRowSelect={handleRowSelectClient}
                        onRowDoubleClick={handleDoubleClickClient}
                        messageNull= "There are no Clients"

                    />
                    {auth.user.admin ? selectedClient && selectedClient.id && selectedClient.name != null ? (
                        <div className='flex items-center justify-center space-x-4 mt-3'>
                            <PrimaryButton
                                className="bg-yellow-500 hover:bg-yellow-700"
                                onClick={openPromptCreateClient}

                            >
                                Edit Client
                            </PrimaryButton>

                            <PrimaryButton
                                className="bg-red-500 hover:bg-red-700"
                                onClick={deleteClient}
                            >
                                Delete Client
                            </PrimaryButton>
                        </div>


                    ) : (
                        <div className='flex items-center justify-center'>
                            <PrimaryButton
                                className="bg-green-500 hover:bg-green-700 mt-2"
                                onClick={openPromptCreateClient}
                            >
                                Create Client
                            </PrimaryButton>
                        </div>
                    ): null}
                </div>
                <PromptCreateClient
                    isOpen={isPromptOpenCreateClient}
                    onConfirm={closePromptCreateClient}
                    onCancel={closePromptCreateClient}
                    additionalData={selectedClient != null ? selectedClient.id && selectedClient.name != null ? selectedClient : null : null}
                />

            </div>
        </AuthenticatedLayout>
    );
};

