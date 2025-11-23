import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg"; 
import add from "../Images/add.jpg"; 
import axios from 'axios';

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointment, setAppointments] = useState(null);


  useEffect(() => {
    const fetchLatestAppointment = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/appointment/latest-appointment');
        console.log('Latest appointment:', response.data);
        setAppointments(response.data.appointment);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchLatestAppointment();
  }, []); // Fetch latest appointment when component loads

  if (!appointment) {
    return <div>Loading...</div>;
  }
  const handleEdit = async() => {
    navigate(`/updateAppointment/${appointment._id}`);
  };
  

  const handleDelete = async () => {
    // Call API to delete the appointment
    try {
      await axios.delete(`http://localhost:8070/api/appointment/delete-appointment/${appointment._id}`);
      alert('Appointment deleted successfully');
      // Redirect to another page 
      navigate('/home'); 
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

  return (
    <div className="flex h-screen">
      
      <div className="w-1/5 bg-black text-white p-6 flex flex-col items-start space-y-6">
        <img src={logo} alt="Logo" className="w-24 mb-4" />
        <nav className="space-y-4">
          <Link to="/home" className="block hover:text-gray-400">Home</Link>
          <Link to="/AddAppointment" className="block hover:text-gray-400">Book</Link>
          <Link to="/MyAppointment" className="block hover:text-gray-400">My Appointments</Link>
          <Link to="/displayAppointment" className="block hover:text-gray-400">All Appointments</Link>
          <Link to="/pdf" className="block hover:text-gray-400">PDF</Link>
        </nav>
      </div>
      <div 
                  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
                  style={{ backgroundImage: `url(${add})` }} // Set background image here
              >

      
      <div className="flex flex-col min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center">Appointment Details</h1>
          <button
            onClick={() => navigate('/AddAppointment')}
            className="bg-blue-500 text-white px-6 py-2 rounded-2xl shadow-lg hover:bg-blue-600 transition"
          >
            Book
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Customer Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Vehicle Model</th>
                <th className="p-2 border">Vehicle Type</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Service Type</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 font-bold text-white">
                <td className="p-2 border">{appointment.cusname}</td>
                <td className="p-2 border">{appointment.email}</td>
                <td className="p-2 border">{appointment.phone}</td>
                <td className="p-2 border">{appointment.vehicalmodel}</td>
                <td className="p-2 border">{appointment.vehicaltype}</td>
                <td className="p-2 border">{appointment.address}</td>
                <td className="p-2 border">{appointment.servicetype}</td>
                <td className="p-2 border">{appointment.date}</td>
                <td className="p-2 border">{appointment.time}</td>
                <td className="p-2 border">
                 
                  <button
                    onClick={handleEdit}
                    className="bg-green-500 text-white px-6 py-1 rounded-md hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}<br />
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyAppointments;
