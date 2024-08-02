import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message,Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../config/apiConfig';
const BookClass = () => {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/api/classes`);
        setClasses(response.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
        message.error('Failed to fetch classes');
      }
    };
    fetchClasses();

    // Retrieve user ID from local storage
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  const handleChange = (e) => {
    setClassId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        message.error('You must be logged in to book a class');
        return;
      }
      await axios.post(`${apiConfig.baseURL}/api/classes/book`, {
        classId,
        userId,
      });
      message.success('Class booked successfully');
    } catch (error) {
      console.error('Error booking class:', error);
      message.error('Failed to book class');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
       <Button 
          onClick={() => navigate('/getClass')}
          className="bg-gray-500 text-white hover:bg-gray-600"
        >
          Back
        </Button>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Book a Class</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Select Class</label>
          <select
            value={classId}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 ease-in-out"
            required
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name} - {cls.type} - {new Date(cls.date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
        >
          Book Class
        </button>
      </form>
    </div>
  );
};

export default BookClass;
