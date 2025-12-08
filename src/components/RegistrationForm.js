import React, { useState, useRef, useEffect, useCallback } from 'react';
import Register from '../API/Register';

function RegistrationForm({ onClose }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
  });

  const formRef = useRef(null);

  // Stable callback to satisfy ESLint + avoid re-renders
  const handleClickOutside = useCallback(
    (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await Register(BASE_URL, formData);
    if (success) {
      onClose();
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
      });
    }
  };

  return (
    <div className='container mx-auto mt-5' ref={formRef}>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
            required
          />
        </div>

        <div className='mb-4'>
          <input
            type='text'
            id='surname'
            name='surname'
            placeholder='Surname'
            value={formData.surname}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
            required
          />
        </div>

        <div className='mb-4'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email Address'
            value={formData.email}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
            required
          />
        </div>

        <div className='mb-4'>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
            required
          />
        </div>

        <div className='text-center'>
          <button
            type='submit'
            className='bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded'
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
