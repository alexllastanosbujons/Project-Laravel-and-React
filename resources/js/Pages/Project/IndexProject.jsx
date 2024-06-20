
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getClientById } from '@/ClientApi';
import TableComponent from '@/Components/TableComponent';
import PrimaryButton from '@/Components/PrimaryButton';
import PromptInputHours from '@/Pages/RegisterHours/PromptInputHours';
import { destroyHour, getHoursByProjectId } from '@/RegistreProjecteUsuariControllerApi';
import { destroyMaterialUsed, getMaterialUsedsByProjectId } from '@/MaterialUsedApi';
import PromptCrearMaterialUsed from '@/Pages/MaterialUsed/PromptCrearMaterialUsed';
import { projectFinished } from '@/ProjectApi';

const IndexProject = ({ project, auth }) => {
    const [horesTreballadesTaula, setHoresTreballadesTaula] = useState([]);
    const [horesTreballades, setHoresTreballades] = useState('');
    const [usedMaterials, setUsedMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedHoresTreballades, setSelectedHoresTreballades] = useState(null);
    const [isPromptOpenHours, setPromptOpenHours] = useState(false);
    const [isPromptOpenMaterialUsed, setPromptOpenMaterialUsed] = useState(false);

    const [client, setClient] = useState([]);
    useEffect(() => {
        getClient();
        getHours();
        getUsedMaterials();
    }, []);
    const getHours = async () => {
        try {
            const hours = await getHoursByProjectId(project.id);
            setHoresTreballadesTaula(hours.hours);
            const hores = await calcularHoresIMinutsTotals(hours.hours);
            setHoresTreballades(hores);
        } catch (error) {
            console.error('Error fetching hours:', error);
        }
    };

    const getUsedMaterials = async () => {
        try {
            const materials = await getMaterialUsedsByProjectId(project.id);
            setUsedMaterials(materials.materials);
            console.log(usedMaterials);
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };


    const getClient = async () => {
        const response = await getClientById(project.clientId);
        setClient(response.client);
    }

    const handleRowSelectHoresTreballades = (id, idUser) => {
        console.log('Selected Row ID:', id);
        console.log('Selected Row ID User:', idUser);
        setSelectedHoresTreballades({ id, idUser });
    }

    const handleDoubleClickHoresTreballades = (id) => {
        console.log(`Double click in the row with ID ${id}`);
    }

    const openPromptHours = () => {
        setPromptOpenHours(true);
    };

    const closePromptHours = () => {
        getHours();
        setPromptOpenHours(false);
    };

    const openPromptMaterialUsed = () => {
        setPromptOpenMaterialUsed(true);
    };
    const closePromptMaterialUsed = () => {
        getUsedMaterials();
        setPromptOpenMaterialUsed(false);
    };
    const handleRowSelectMaterial = (id, idUser) => {
        setSelectedMaterial({ id, idUser });
    }


    const calcularHoresIMinutsTotals = (horesTreballades) => {
        let horesTotals = 0;
        let minutsTotals = 0;

        horesTreballades.forEach((hora) => {
            const horaInici = new Date(hora.startHour);
            const horaFi = new Date(hora.endHour);
            const diferenciaMilisegons = horaFi - horaInici;
            const diferenciaHores = Math.floor(diferenciaMilisegons / (1000 * 60 * 60));
            const diferenciaMinuts = Math.floor((diferenciaMilisegons % (1000 * 60 * 60)) / (1000 * 60));
            horesTotals += diferenciaHores;
            minutsTotals += diferenciaMinuts;
        });
        horesTotals += Math.floor(minutsTotals / 60);
        minutsTotals = minutsTotals % 60;

        const resultatFormatejat = minutsTotals > 0 ? `${horesTotals}:${minutsTotals < 10 ? '0' : ''}${minutsTotals}` : `${horesTotals}`;

        return resultatFormatejat;
    };

    const deleteRegister = () => {
        destroyHour(selectedHoresTreballades.id);
        window.location.reload();
    }

    const deleteMaterial = () => {
        destroyMaterialUsed(selectedMaterial.id);
        window.location.reload();
    }

    const handleDoubleClickMaterial = (id) => {
        console.log(`Double click in the row with ID ${id}`);
    }
    const finishedProject = () => {
        projectFinished(project.id);
        window.location.reload();
    }


    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="text-2xl font-semibold mb-4">Project Details</h2>}
        >
            <div className="max-w-2xl lg:max-w-6xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">

                <p className='text-2xl text-black font-bold'>Project Name: {project.name}</p>
                <p>Start Date: {project.startDate}</p>
                <p className={` ${horesTreballades > project.expectedHours ? 'text-red-500' : 'text-black'}`}>
                    Worked Hours/Expected Hours: {horesTreballades}/{project.expectedHours}
                </p>
                <p>Project Budget: {project.budget}€</p>
                <p>Client Name: {client.name}</p>
                <p>Client Email: {client.email}</p>
                <p>Client Phone: {client.phone}</p>
                <p>Project Description: {project.description}</p>
                <p>Project Finished: {project.finished ? 'Yes' : 'No'}</p>
                <PromptInputHours
                    isOpen={isPromptOpenHours}
                    onConfirm={closePromptHours}
                    onCancel={closePromptHours}
                    additionalData={{ idProject: project.id }}
                />
                <PromptCrearMaterialUsed
                    isOpen={isPromptOpenMaterialUsed}
                    onConfirm={closePromptMaterialUsed}
                    onCancel={closePromptMaterialUsed}
                    additionalData={{ idProject: project.id }}
                />
                <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 max-w-7xl mx-auto">

                    <div className="max-w-lg w-full">
                        <h2 className="text-center text-2xl mb-4">Worked Hours</h2>
                        <TableComponent
                            data={horesTreballadesTaula}
                            fieldsToShow={['userName', 'startHour', 'endHour']}
                            onRowSelect={handleRowSelectHoresTreballades}
                            onRowDoubleClick={handleDoubleClickHoresTreballades}
                            messageNull={'There are no hours worked on this project'}
                        />
                        {selectedHoresTreballades !== null && selectedHoresTreballades.id !== null ? (
                            <div className="flex justify-center space-x-4 mt-3">
                                <PrimaryButton className="bg-yellow-500 hover:bg-yellow-700">Edit Register</PrimaryButton>
                                <PrimaryButton className="bg-red-500 hover:bg-red-700" onClick={deleteRegister}>
                                    Delete Register
                                </PrimaryButton>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <PrimaryButton className="bg-green-500 hover:bg-green-700 mt-2" onClick={openPromptHours}>
                                    Input Hours
                                </PrimaryButton>
                            </div>
                        )}
                    </div>

                    <div className="max-w-lg w-full">
                        <h2 className="text-center text-2xl mb-4">Materials Used</h2>
                        <TableComponent
                            data={usedMaterials}
                            fieldsToShow={['material', 'proveidor', 'quantity', 'price', 'total']}
                            onRowSelect={handleRowSelectMaterial}
                            onRowDoubleClick={handleDoubleClickMaterial}
                            messageNull={'There are no materials used on this project'}
                        />
                        {selectedMaterial !== null && selectedMaterial.id !== null ? (
                            <div className="flex justify-center space-x-4 mt-3">
                                <PrimaryButton
                                    className="bg-yellow-500 hover:bg-yellow-700"
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
                            <div className="flex justify-center">
                                <PrimaryButton
                                    className="bg-green-500 hover:bg-green-700 mt-2"
                                    onClick={openPromptMaterialUsed}
                                >
                                    Add Used Material
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                    <div>
                


            </div>
            

            </div>
            {project.finished ? 
            <a href={`//localhost/createPdf/${project.id}`} target='_blank'>Generate PDF</a> : 
            <PrimaryButton 
                className="bg-red-500 hover:bg-red-700 mt-2" 
                 onClick={finishedProject}
                >
                    Finished
                </PrimaryButton>}
                </div>



        </AuthenticatedLayout>
    );
};

export default IndexProject;

