import { useEffect, useState } from 'react';
import TableComponent from '@/Components/TableComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { getUsers } from '@/UserApi';
import { getHourByUserId } from '@/RegistreProjecteUsuariControllerApi';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ status, auth }) {
    const [hours, setHours] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [data, setData] = useState({
        firstDay: null,
        lastDay: null,
    });

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const usersF = await getUsers();
            const usersWithKey = usersF.users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                priceHour: user.priceHour,
                admin: user.admin === 1 ? 'Yes' : 'No',
            }));
            setUsers(usersWithKey);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSelectedUser = (id, name) => {
        console.log('Selected Row ID:', id);
        setSelectedUser({ id, name });
    };

    const getHoursWorked = async () => {
        try {
            console.log(data);
            const hoursUser = await getHourByUserId(selectedUser.id, data);
            setHours(hoursUser.hours);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const getCurrentDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Time Tracking</h2>}
        >
            <Head title="Time Tracking" />

            <div className="py-8 md:py-12 lg:flex lg:justify-center lg:items-center lg:space-x-4 mx-10">
                <div className="lg:w-1/3">
                    <label className="text-gray-700 block mb-2">Select User:</label>
                    <SelectInput
                        options={[{ label: 'Select User', value: '' }, ...users.map((user) => ({
                            label: user.name,
                            value: user.id,
                        }))]}
                        defaultValue={selectedUser}
                        onChange={handleSelectedUser}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="lg:w-1/3 mt-4 lg:mt-0">
                    <label className="text-gray-700 block mb-2">First Day:</label>
                    <input
                        type="date"
                        value={data.firstDay}
                        onChange={(e) => setData({ ...data, firstDay: e.target.value })}
                        max={getCurrentDate()}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="lg:w-1/3 mt-4 lg:mt-0">
                    <label className="text-gray-700 block mb-2">Last Day:</label>
                    <input
                        type="date"
                        value={data.lastDay}
                        onChange={(e) => setData({ ...data, lastDay: e.target.value })}
                        max={getCurrentDate()}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className=" mt-4 lg:mt-8">
                <PrimaryButton
                    className="bg-green-500 hover:bg-green-700 mt-4 lg:mt-0 w-full lg:w-auto"
                    onClick={getHoursWorked}
                >
                    Search
                </PrimaryButton>
                </div>
            </div>

            <div className=" mx-auto m-8  overflow-x-scroll">
                <TableComponent
                    data={hours}
                    fieldsToShow={['projectId', 'userId', 'startHour', 'endHour']}
                    messageNull="There are no Hours Worked"
                    hideSearchBar={true}
                />
            </div>
        </AuthenticatedLayout>
    );
}
