import React, { useState } from 'react';
import { submitContactApi } from '../api/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await submitContactApi(formData);
      
      if (response.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(response.message || 'Failed to send message');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Contact submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 px-4'>
      <h1 className='text-4xl font-bold mb-6 text-green-800'>Contact Us</h1>

      {submitted && (
        <p className='mb-4 text-green-700 font-medium'>Thank you for your message!</p>
      )}

      {error && (
        <p className='mb-4 text-red-700 font-medium'>{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4'
      >
        <div>
          <label className='block mb-1 font-semibold text-green-700'>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
          />
        </div>

        <div>
          <label className='block mb-1 font-semibold text-green-700'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
          />
        </div>

        <div>
          <label className='block mb-1 font-semibold text-green-700'>Message</label>
          <textarea
            name='message'
            rows='4'
            value={formData.message}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
          ></textarea>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
