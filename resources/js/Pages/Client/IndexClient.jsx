
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

const IndexClient = ({ client, auth }) => {
    const [horesTreballadesTaula, setHoresTreballadesTaula] = useState([]);
    const [horesTreballades, setHoresTreballades] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);


    useEffect(() => {
        getProjects();
    }, []);


    const getProjects = async () => {
        try {
            const projects = await getProjectsByClientId(client.id);
            setProjects(projects.projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleRowSelectProject = (id, idUser) => {
        console.log('Selected Row ID:', id);
        console.log('Selected Row ID User:', idUser);
        setSelectedProject({ id, idUser });
    }

    const handleDoubleClickProject = (id) => {
        console.log(`Double click in the row with ID ${id}`);
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

                <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 max-w-7xl mx-auto">

                    <div className="max-w-lg w-full">
                        <h2 className="text-center text-2xl mb-4">Worked Hours</h2>
                        <TableComponent
                            data={horesTreballadesTaula}
                            fieldsToShow={['name', 'description', 'budget']}
                            onRowSelect={handleRowSelectProject}
                            onRowDoubleClick={handleDoubleClickProject}
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

                </div>

            </div>



        </AuthenticatedLayout>
    );
};

export default IndexClient;

