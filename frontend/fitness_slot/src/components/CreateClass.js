import { useState } from 'react';
import axios from 'axios';
import { message, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import 'antd/dist/reset.css';
import apiConfig from '../config/apiConfig';
const CreateClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'yoga',
    capacity: '',
    date: '',
    bookings: [],
    waitlist: [],
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClass(formData);
      message.success('Class created successfully');
      setFormData({
        name: '',
        type: 'yoga',
        capacity: '',
        date: '',
        bookings: [],
        waitlist: [],
      });
      navigate('/getClass');
    } catch (error) {
      message.error('Error creating class');
      console.error('Error creating class:', error);
    }
  };

  const createClass = async (classData) => {
    try {
      await axios.post(`${apiConfig.baseURL}/api/classes/create`, classData);
    } catch (error) {
      console.error('Error creating class:', error);
      throw error; 
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Button 
          onClick={() => navigate('/getClass')}
          className="bg-gray-500 text-white hover:bg-gray-600"
        >
          Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-800">Create New Class</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Class Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
            required
          >
            <option value="yoga">Yoga</option>
            <option value="gym">Gym</option>
            <option value="dance">Dance</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
        >
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
