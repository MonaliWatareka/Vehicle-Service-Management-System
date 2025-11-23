import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../Images/logo.jpg";
import add from "../Images/add.jpg";

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const appointmentDetailRef = useRef(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/appointment/all-appointments');
        setAppointments(response.data.AllAppointment || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  useEffect(() => {
    if (selectedAppointment && appointmentDetailRef.current) {
      appointmentDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedAppointment]);

  const handleEdit = () => {
    if (selectedAppointment) {
      navigate(`/Edit/${selectedAppointment._id}`);
    }
  };

  const handleDelete = async () => {
    if (selectedAppointment) {
      try {
        await axios.delete(`http://localhost:8070/api/appointment/delete-appointment/${selectedAppointment._id}`);
        alert('Appointment deleted successfully');
        setAppointments(prev => prev.filter(app => app._id !== selectedAppointment._id));
        setSelectedAppointment(null);
        navigate('/home');
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment');
      }
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.cusname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.phone.includes(searchQuery) ||
    appointment.vehicalmodel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.vehicaltype.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.servicetype.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!appointments.length) {
    return <div>Loading...</div>;
  }

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

      
      <div className="min-h-screen flex-1 flex flex-col p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${add})` }}>
        <h1 className="text-2xl font-bold mb-6 text-center text-white">All Appointments</h1>

        
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 border rounded-md shadow-sm"
          />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="cursor-pointer p-4 border rounded-lg shadow-lg bg-black bg-opacity-50 hover:bg-gray-800 transition"
              onClick={() => handleAppointmentClick(appointment)}
            >
              <h3 className="text-lg font-bold text-white">{appointment.cusname}</h3>
              <p className="text-sm text-white mt-2">
                {appointment.email}<br />
                {appointment.phone}<br />
                {appointment.vehicalmodel}<br />
                {appointment.vehicaltype}<br />
                {appointment.address}<br />
                {appointment.servicetype}<br />
                {appointment.date}<br />
                {appointment.time}
              </p>
            </div>
          ))}
        </div>

        
        {selectedAppointment && (
          <div ref={appointmentDetailRef} className="mt-8 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
            <div className="mb-2"><strong>Customer Name:</strong> {selectedAppointment.cusname}</div>
            <div className="mb-2"><strong>Email:</strong> {selectedAppointment.email}</div>
            <div className="mb-2"><strong>Phone:</strong> {selectedAppointment.phone}</div>
            <div className="mb-2"><strong>Vehicle Model:</strong> {selectedAppointment.vehicalmodel}</div>
            <div className="mb-2"><strong>Vehicle Type:</strong> {selectedAppointment.vehicaltype}</div>
            <div className="mb-2"><strong>Address:</strong> {selectedAppointment.address}</div>
            <div className="mb-2"><strong>Service Type:</strong> {selectedAppointment.servicetype}</div>
            <div className="mb-2"><strong>Date:</strong> {selectedAppointment.date}</div>
            <div className="mb-2"><strong>Time:</strong> {selectedAppointment.time}</div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white px-6 py-1 rounded-md hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
