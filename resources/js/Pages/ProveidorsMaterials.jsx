import { useEffect, useState } from 'react';
import TableComponent from '@/Components/TableComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import { getProveidors, destroyProveidor } from '@/ProveidorApi';
import { getAllMaterials, destroyMaterial } from '@/MaterialApi';
import ProveidorCreate from '@/Pages/Proveidor/Create';
import PromptCreaterMaterial from '@/Pages/Material/Create';

export default function ProveidorsMaterials({ status, auth }) {
    const [proveidors, setProveidors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [selectedProveidor, setSelectedProveidor] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [isPromptOpenCreateProveidor, setPromptOpenCreateProveidor] = useState(false);
    const [isPromptOpenCreateMaterial, setPromptOpenCreateMaterial] = useState(false);

    useEffect(() => {
        getAllProveidors();
        getMaterials();
    }, []);

    const handleRowSelectProveidor = (id, name) => {
        console.log('Selected Row ID:', id);
        setSelectedProveidor({ id, name});
    };


    const handleRowSelectMaterial = (id, name) => {
        console.log('Selected Row ID:', id);
        setSelectedMaterial({ id, name });
    };

    const openPromptCreateProveidor = () => {
        setPromptOpenCreateProveidor(true);
    };

    const closePromptCreateProveidor = () => {
        setPromptOpenCreateProveidor(false);
        window.location.reload();
    };


    const openPromptCreateMaterial = () => {
        setPromptOpenCreateMaterial(true);
    };

    const closePromptCreateMaterial = () => {
        setPromptOpenCreateMaterial(false);
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

    const deleteMaterial = () =>{
        destroyMaterial(selectedMaterial.id);
        window.location.reload();
    }

    const cancelPromptCreateMaterial = () => {
        setPromptOpenCreateMaterial(false);
    };

    const getAllProveidors = async () => {
        try {
            const proveidors = await getProveidors();
            setProveidors(proveidors.proveidors);
        } catch (error) {
            console.error('Error fetching proveidors:', error);
        }
    };

    const getMaterials = async () => {
        try {
            const materials = await getAllMaterials();
            setMaterials(materials.materials);
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };



    const filteredMaterials = selectedProveidor && selectedProveidor.id
        ? materials.filter((material) => material.proveidorId === selectedProveidor.id)
        : materials;

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Proveidors and Materials</h2>}
        >
            <Head title="Proveidors and Materials" />

            <div className="py-12 md:flex">
                <div className="max-w-7xl mx-auto">
                    <h2 className='text-center'>Proveidors</h2>
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

                 <PromptCreaterMaterial
                    isOpen={isPromptOpenCreateMaterial}
                    onConfirm={closePromptCreateMaterial}
                    onCancel={cancelPromptCreateMaterial}
                    onClose={closePromptCreateMaterial}
                    additionalData={selectedMaterial != null ? selectedMaterial.id && selectedMaterial.name != null ? selectedMaterial : null : null}
                /> 

                <div className="max-w-7xl mx-auto">
                    <h3 className='text-center'>Materials</h3>
                    <TableComponent
                        data={materials}
                        fieldsToShow={['name', 'proveidorId', 'price']}
                        onRowSelect={handleRowSelectMaterial}
                        messageNull= "There are no Materials"

                  />
                  {auth.user.admin ? selectedMaterial && selectedMaterial.id && selectedMaterial.name != null ? (
                        <div className='flex items-center justify-center space-x-4 mt-3'>
                            <PrimaryButton
                                className="bg-yellow-500 hover:bg-yellow-700"
                                onClick={openPromptCreateMaterial}
                            >
                                Edit Material
                            </PrimaryButton>

                            <PrimaryButton
                                className="bg-red-500 hover:bg-red-700"
                                onClick={deleteMaterial}
                            >
                                Delete Material
                            </PrimaryButton>
                        </div>


                    ) : (
                        <div className='flex items-center justify-center'>
                            <PrimaryButton
                                className="bg-green-500 hover:bg-green-700 mt-2"
                                onClick={openPromptCreateMaterial}
                            >
                                Create Material
                            </PrimaryButton>
                        </div>
                    ): null}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

