import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import apiConfig from '../config/apiConfig';
const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/api/classes`);
        setClasses(response.data.classes);
      } catch (error) {
        setError('Error fetching classes.');
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const deleteClass = async (classId) => {
    try {
      await axios.post(`${apiConfig.baseURL}/api/classes/cancel`, { classId });
      setClasses(classes.filter((classItem) => classItem._id !== classId));
    } catch (error) {
      console.error('Error deleting class:', error);
      setError('Failed to delete class.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  if (loading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between">
        <Link to="/createclass">
          <button className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300">
            Create Class
          </button>
        </Link>
        <Link to="/bookclass">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300">
            Book Class
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem._id} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 relative">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">{classItem.name}</h2>
            <p className="text-gray-700">Type: <span className="font-medium">{classItem.type}</span></p>
            <p className="text-gray-700">Date: <span className="font-medium">{new Date(classItem.date).toLocaleDateString()}</span></p>
            <p className="text-gray-700">Capacity: <span className="font-medium">{classItem.capacity}</span></p>
            <p className="text-gray-700">Bookings: <span className="font-medium">{classItem.bookings.length}</span></p>
            <p className="text-gray-700">Waitlist: <span className="font-medium">{classItem.waitlist.length}</span></p>
            <button
              onClick={() => deleteClass(classItem._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Delete Class"
            >
              <AiFillDelete size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
