import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { getUserById, updateUser, store } from '@/UserApi';

export default function Create({ isOpen, onClose, onConfirm, onCancel, additionalData, auth }) {
  const [user, setUser] = useState({});
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
    priceHour: '',
  });

  useEffect(() => {
    if (additionalData && additionalData.id != null) {
      getUser();
    } else {
      setUser({});
      setData({});
    }

  }, [additionalData]);

  const getUser = async () => {
    const user = await getUserById(additionalData.id);
    setUser(user.user);
    setData({
      name: user.user.name,
      email: user.user.email,
      password: user.user.password,
      password2: user.user.password,
      priceHour: user.user.priceHour,
    });
  }

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.id != null) {
      const response = await updateUser(user.id, data);
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
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Head title={(additionalData && additionalData.id !== null ? "Update User" : "Create User")} />
      <div className='m-5 overflow-y-scroll max-h-screen h-[80vh]'>
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold mx-auto">{(additionalData && additionalData.id !== null ? "Update User" : "Create User")}</h1>
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
          <InputError message={data.errors?.name} className="mt-2" />
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
          <InputError message={data.errors?.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="priceHour" value="Price Hour" />
          <TextInput
            id="priceHour"
            type="number"
            name="priceHour"
            defaultValue={data.priceHour}
            value={data.priceHour}
            className="mt-1 block w-full"
            onChange={(e) => setData('priceHour', e.target.value)}
          />
          <InputError message={data.errors?.priceHour} className="mt-2" />
        </div>

        {additionalData == null ?
          <div>  <div className="mt-4">
            <InputLabel htmlFor="password1" value="Password" />
            <TextInput
              id="password1"
              type="password"
              name="password1"
              defaultValue={data.password}
              value={data.password}
              className="mt-1 block w-full"
              onChange={(e) => setData('password', e.target.value)}
            />
            <InputError message={data.errors?.password} className="mt-2" />
          </div>

            <div className="mt-4">
              <InputLabel htmlFor="password2" value="Repeat Password" />
              <TextInput
                id="password2"
                type="password"
                name="password2"
                defaultValue={data.password2}
                value={data.password2}
                className="mt-1 block w-full"
                onChange={(e) => setData('password2', e.target.value)}
              />
              <InputError message={data.errors?.password2} className="mt-2" />
            </div>
          </div> : null}


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
