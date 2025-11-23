import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg";
import add from "../Images/add.jpg"; 

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    cusname: '',
    email: '',
    phone: '',
    vehicalmodel: '',
    vehicaltype: '',
    address: '',
    servicetype: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/appointment/single-appointment/${id}`);
        const data = response.data.appointment;

        // Format date & time for input fields
        const formattedDate = data.date ? data.date.split("T")[0] : ""; 
        const formattedTime = data.time ? data.time.substring(0, 5) : "";

        setAppointment({
          ...data,
          date: formattedDate,
          time: formattedTime
        });
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/api/appointment/update-appointment/${id}`, appointment);
      alert('Appointment updated successfully');
      navigate('/MyAppointment');
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment');
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 flex-1"
      style={{ backgroundImage: `url(${add})` }}
    >
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cusname" value={appointment.cusname} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Customer Name" required />
        <input type="email" name="email" value={appointment.email} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Email" required />
        <input type="text" name="phone" value={appointment.phone} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Phone" required />
        <input type="text" name="vehicalmodel" value={appointment.vehicalmodel} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Vehicle Model" />
        <input type="text" name="vehicaltype" value={appointment.vehicaltype} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Vehicle Type" />
        <input type="text" name="address" value={appointment.address} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Address" />
        <input type="text" name="servicetype" value={appointment.servicetype} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Service Type" />
        <input type="date" name="date" value={appointment.date} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input type="time" name="time" value={appointment.time} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Update</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EditAppointment;
