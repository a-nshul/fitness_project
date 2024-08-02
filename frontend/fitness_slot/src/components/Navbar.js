import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Fitness Slot Booking</Link>
        <div>
          <Link to="/create" className="text-white px-4">Create Class</Link>
          <Link to="/book" className="text-white px-4">Book Class</Link>
          <Link to="/cancel" className="text-white px-4">Cancel Class</Link>
          <Link to="/" className="text-white px-4">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
