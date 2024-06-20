import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/inertia-react';
import NavLink from '@/Components/NavLink';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className=' md:ml-8'>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className='flex space-x-4 mx-auto'>
                <div className=" sm:-my-px sm:ms-10 sm:flex">
                    <NavLink href={route('login')} active={route().current('login')}>
                        Login
                    </NavLink>
                </div>
                <div className=" sm:-my-px sm:ms-10 sm:flex">
                    <NavLink href={route('register')} active={route().current('register')}>
                        Register
                    </NavLink>
                </div>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}