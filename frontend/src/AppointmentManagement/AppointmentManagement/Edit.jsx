import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg";
import add from "../Images/add.jpg"; 


const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        const res = await axios.get(`http://localhost:8070/api/appointment/display-appointment/${id}`);
        const data = res.data.appointment;

        // Format the date and time for input fields
        const formattedDate = data.date ? data.date.split('T')[0] : '';
        const formattedTime = data.time ? data.time.substring(0, 5) : '';

        setFormData({
          ...data,
          date: formattedDate,
          time: formattedTime
        });
      } catch (err) {
        console.error('Failed to fetch appointment', err);
        alert('Error fetching appointment');
      }
    };
    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/api/appointment/update-appointment/${id}`, formData);
      alert('Appointment updated');
      navigate('/displayAppointment');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update appointment');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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

<form onSubmit={handleSubmit} className="w-full max-w-sm p-10 bg-white rounded shadow mt-10 mx-auto">
  <h2 className="text-lg font-semibold mb-2 text-center">Update Appointment</h2>

  <input type="text" name="cusname" value={formData.cusname} onChange={handleChange} placeholder="Customer Name" className="w-full mb-1 border px-2 py-0.5 rounded text-sm" required />
  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mb-1 border px-2 py-0.5 rounded text-sm" required />
  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full mb-1 border px-2 py-0.5 rounded text-sm" required />
  <input type="text" name="vehicalmodel" value={formData.vehicalmodel} onChange={handleChange} placeholder="Vehicle Model" className="w-full mb-1 border px-2 py-0.5 rounded text-sm" />
  <input type="text" name="vehicaltype" value={formData.vehicaltype} onChange={handleChange} placeholder="Vehicle Type" className="w-full mb-1 border px-2 py-0.5 rounded text-sm" />
  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full mb-1 border px-2 py-0.5 rounded text-sm" />
  <input type="text" name="servicetype" value={formData.servicetype} onChange={handleChange} placeholder="Service Type" className="w-full mb-1 border px-2 py-0.5 rounded text-sm" />
  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full mb-1 border px-2 py-0.5 rounded text-sm" required />
  <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full mb-1 border px-2 py-0.5 rounded text-sm" required />

  <button type="submit" className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 w-full mt-2">
    Update
  </button>
</form>

    </div>
</div>
  );
};

export default UpdateAppointment;

