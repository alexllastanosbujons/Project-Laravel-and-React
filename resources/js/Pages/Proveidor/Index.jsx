import { useEffect, useState } from 'react';
import TableComponent from '@/Components/TableComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import { getProveidors, destroyProveidor } from '@/ProveidorApi';
import ProveidorCreate from '@/Pages/Proveidor/Create';

export default function Index({ status, auth }) {
    const [proveidors, setProveidors] = useState([]);
    const [selectedProveidor, setSelectedProveidor] = useState(null);
    const [isPromptOpenCreateProveidor, setPromptOpenCreateProveidor] = useState(false);

    useEffect(() => {
        getAllProveidors();
    }, []);

    const handleRowSelectProveidor = (id, name) => {
        console.log('Selected Row ID:', id);
        setSelectedProveidor({ id, name});
    };


    const openPromptCreateProveidor = () => {
        setPromptOpenCreateProveidor(true);
    };

    const closePromptCreateProveidor = () => {
        setPromptOpenCreateProveidor(false);
        window.location.reload();
    };


    const cancelPromptCreateProveidor = () => {
        setPromptOpenCreateProveidor(false);
    };
    const handleDoubleClickProveidor = async (id) => {
        console.log(`Double click in the row with ID ${id}`);
        await Inertia.get('/clientView', { id: id });
    
    };


    const deleteProveidor = () =>{
        destroyProveidor(selectedProveidor.id);
        window.location.reload();
    }

  


    const getAllProveidors = async () => {
        try {
            const proveidors = await getProveidors();
            setProveidors(proveidors.proveidors);
        } catch (error) {
            console.error('Error fetching proveidors:', error);
        }
    };


    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="text-center font-semibold text-xl text-gray-800 leading-tight">Proveidors</h2>}
        >
            <Head  title="Proveidors" />

            <div className="py-12 md:flex">
                <div className="max-w-7xl mx-auto">
                    {selectedProveidor && selectedProveidor.id && selectedProveidor.name != null ? (
                        <p className="text-center text-gray-500">Proveidor seleccionat: {selectedProveidor.name}</p>
                    ) : (
                        <p className="text-center text-gray-500"></p>
                    )}
                    <TableComponent
                        data={proveidors}
                        fieldsToShow={['name', 'email', 'phone']}
                        onRowSelect={handleRowSelectProveidor}
                        messageNull= "There are no Proveidors"

                    />
                    {auth.user.admin ? selectedProveidor && selectedProveidor.id && selectedProveidor.name != null ? (
                        <div className='flex items-center justify-center space-x-4 mt-3'>
                            <PrimaryButton
                                className="bg-yellow-500 hover:bg-yellow-700"
                                onClick={openPromptCreateProveidor}

                            >
                                Edit Proveidor
                            </PrimaryButton>

                            <PrimaryButton
                                className="bg-red-500 hover:bg-red-700"
                                onClick={deleteProveidor}
                            >
                                Delete Proveidor
                            </PrimaryButton>
                        </div>


                    ) : (
                        <div className='flex items-center justify-center'>
                            <PrimaryButton
                                className="bg-green-500 hover:bg-green-700 mt-2"
                                onClick={openPromptCreateProveidor}
                            >
                                Create Proveidor
                            </PrimaryButton>
                        </div>
                    ): null}
                </div>
                <ProveidorCreate
                    isOpen={isPromptOpenCreateProveidor}
                    onConfirm={closePromptCreateProveidor}
                    onCancel={cancelPromptCreateProveidor}
                    onClose={closePromptCreateProveidor}
                    additionalData={selectedProveidor != null ? selectedProveidor.id && selectedProveidor.name != null ? selectedProveidor : null : null}
                />

            </div>
        </AuthenticatedLayout>
    );
};

