import React, { useState } from 'react';
import axios from 'axios';

const DemoPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companySize: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await axios.post('http://localhost:5000/api/demo-request', formData);
      setMessage('Thank you! We will be in touch shortly.');
      setFormData({ firstName: '', lastName: '', workEmail: '', companySize: '' });
    } catch (error) {
      setError('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-stretch">
      <div className="md:w-1/2 bg-gradient-to-br from-purple-100 to-white p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Get a demo from our team</h1>
        <p className="text-gray-700 mb-4">
          Need more information before choosing EvalEdge Pro? Submit the form and we'll be in touch to:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
          <li>Explore premium features</li>
          <li>Discover your ideal plan</li>
          <li>Answer all your questions</li>
        </ul>
      </div>

      <div className="md:w-1/2 bg-white p-12 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="workEmail"
            type="email"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="Work e-mail"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>Company size</option>
            <option>1-50</option>
            <option>51-200</option>
            <option>201-1000</option>
            <option>1000+</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
          >
            Submit
          </button>
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <p className="text-xs text-gray-500">
            We will process your data as stated in our Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
};

export default DemoPage;
