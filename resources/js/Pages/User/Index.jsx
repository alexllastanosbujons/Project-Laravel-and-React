import { useEffect, useState } from 'react';
import TableComponent from '@/Components/TableComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import UserCreate from '@/Pages/User/Create';
import { getUsers } from '@/UserApi';
import { destroyUser } from '@/UserApi';
import { updateAdminState } from '@/UserApi';

export default function Index({ status, auth }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPromptOpenCreateUser, setPromptOpenCreateUser] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleRowSelectUser = (id, name) => {
        console.log('Selected Row ID:', id);
        setSelectedUser({ id, name });
    };

    const openPromptCreateUser = () => {
        setPromptOpenCreateUser(true);
    };

    const closePromptCreateUser = () => {
        setPromptOpenCreateUser(false);
        window.location.reload();
    };

    const cancelPromptCreateUser = () => {
        setPromptOpenCreateUser(false);
    };

    const handleDoubleClickUser = async (id) => {
        console.log(`Double click in the row with ID ${id}`);
        await Inertia.get('/clientView', { id: id });
    };

    const updateUserAdmin = () => {
        updateAdminState(selectedUser.id);
        window.location.reload();
    };

    const deleteUser = () => {
        destroyUser(selectedUser.id);
        window.location.reload();
    };

    const getAllUsers = async () => {
        try {
            const users = await getUsers();
            setUsers(users.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <AuthenticatedLayout user={auth} header={<h2 className="text-center font-semibold text-xl text-gray-800 leading-tight">Users</h2>}>
            <Head title="Users" />

            <div className="py-12 md:flex justify-center items-center space-y-4 md:space-y-0">
                <div className="max-w-full md:max-w-2xl mx-auto">
                    {selectedUser && selectedUser.id && selectedUser.name != null ? (
                        <p className="text-center text-gray-500">User selected: {selectedUser.name}</p>
                    ) : (
                        <p className="text-center text-gray-500"></p>
                    )}
                    <div className='w-full overflow-x-scroll'>
                    <TableComponent
                        data={users}
                        onRowSelect={handleRowSelectUser}
                        fieldsToShow={['name', 'email', 'priceHour', 'admin']}
                        messageNull="There are no Users"
                    />
                    </div>
                    {auth.user.admin ? selectedUser && selectedUser.id && selectedUser.name != null ? (
                        <div className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 mt-3'>
                            <PrimaryButton className="bg-yellow-500 hover:bg-yellow-700" onClick={openPromptCreateUser}>
                                Edit User
                            </PrimaryButton>
                            <PrimaryButton className="bg-red-500 hover:bg-red-700" onClick={updateUserAdmin}>
                                Change Admin State
                            </PrimaryButton>
                            <PrimaryButton className="bg-red-500 hover:bg-red-700" onClick={deleteUser}>
                                Delete User
                            </PrimaryButton>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center'>
                            <PrimaryButton className="bg-green-500 hover:bg-green-700 mt-2" onClick={openPromptCreateUser}>
                                Create User
                            </PrimaryButton>
                        </div>
                    ): null}
                </div>
                <UserCreate
                    isOpen={isPromptOpenCreateUser}
                    onConfirm={closePromptCreateUser}
                    onCancel={cancelPromptCreateUser}
                    onClose={closePromptCreateUser}
                    additionalData={selectedUser != null ? (selectedUser.id && selectedUser.name != null ? selectedUser : null) : null}
                />
            </div>
        </AuthenticatedLayout>
    );
};
