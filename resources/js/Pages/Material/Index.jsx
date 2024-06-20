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

export default function Index({ status, auth }) {
    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [isPromptOpenCreateMaterial, setPromptOpenCreateMaterial] = useState(false);

    useEffect(() => {
        getMaterials();
    }, []);




    const handleRowSelectMaterial = (id, name) => {
        console.log('Selected Row ID:', id);
        setSelectedMaterial({ id, name });
    };


    const openPromptCreateMaterial = () => {
        setPromptOpenCreateMaterial(true);
    };

    const closePromptCreateMaterial = () => {
        setPromptOpenCreateMaterial(false);
        getAllMaterials();
    };

    const deleteMaterial = () =>{
        destroyMaterial(selectedMaterial.id);
        getMaterials();
    }

    const cancelPromptCreateMaterial = () => {
        setPromptOpenCreateMaterial(false);
        getMaterials();
    };


    const getMaterials = async () => {
        try {
            const materials = await getAllMaterials();
            setMaterials(materials.materials);
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };


    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Materials</h2>}
        >
            <Head title="Materials" />

            <div className="py-12 md:flex">

                 <PromptCreaterMaterial
                    isOpen={isPromptOpenCreateMaterial}
                    onConfirm={closePromptCreateMaterial}
                    onCancel={cancelPromptCreateMaterial}
                    onClose={closePromptCreateMaterial}
                    additionalData={selectedMaterial != null ? selectedMaterial.id && selectedMaterial.name != null ? selectedMaterial : null : null}
                /> 

                <div className="max-w-7xl mx-auto">
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

