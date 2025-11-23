import React from "react";
import { Link } from "react-router-dom"; // Use React Router for navigation
import logo from "../Images/logo.jpg"; // Correct path based on file location
import home2 from "../Images/home2.jpg"; // Correct path

const LandingPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-black text-white p-6 flex flex-col items-start space-y-6">
        <img src={logo} alt="Logo" className="w-24 mb-4" />
        <nav className="space-y-4">
          <Link to="/home" className="block hover:text-gray-400">Home</Link>
          <Link to="/AddAppointment" className="block hover:text-gray-400">Book</Link>
          <Link to="/MyAppointment" className="block hover:text-gray-400">My Appointments</Link>
          <Link to="/displayAppointment" className="block hover:text-gray-400">All Appointment</Link>
          <Link to="/pdf" className="block hover:text-gray-400">PDF</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className="flex-1 p-12 flex flex-col justify-center items-start text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${home2})` }} // Corrected syntax
      >
        <h1 className="text-5xl font-bold">Don't wait, book your appointment today!</h1>
        <p className="text-2xl mt-2">Best Services For Your Comfort</p>
        <p className="mt-4">Get ready to look and feel your best</p>
        <button className="mt-6 bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-700">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
