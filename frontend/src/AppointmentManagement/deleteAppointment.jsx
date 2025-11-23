import { useState } from 'react';
import axios from 'axios';
const deleteAppointment = () => {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8070/api/appointment/delete-appointment/:id', formData);
            if (data.success) {
                alert('Appointment delete successfully');
                setFormData({
                    cusname: '', email: '', phone: '', vehicalmodel: '', vehicaltype: '',
                    address: '', servicetype: '', date: '', time: ''
                });
            } else {
                console.error("Failed to add appointment: ", data.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Update an Appointment</h1>
                {[
                    { label: "Customer Name", name: "cusname", type: "text", placeholder: "Enter customer name" },
                    { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
                    { label: "Phone", name: "phone", type: "text", placeholder: "Enter phone number" },
                    { label: "Vehicle Model", name: "vehicalmodel", type: "text", placeholder: "Enter vehicle model" },
                    { label: "Vehicle Type", name: "vehicaltype", type: "text", placeholder: "Enter vehicle type" }
                ].map(({ label, name, type, placeholder }) => (
                    <div key={name}>
                        <label className="block text-gray-700 font-medium">{label}:</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required
                            placeholder={placeholder}
                            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
                <div>
                    <label className="block text-gray-700 font-medium">Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter address"
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Service Type:</label>
                    <select
                        name="servicetype"
                        value={formData.servicetype}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Service Type</option>
                        {["Air Filter", "Battery Testing", "Oil Change", "Wheel Alignment", "Spark Plugs"].map((service) => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit"  className="bg-blue-600 text-white py-3 px-4 rounded-lg w-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                    Delete Appointment
                </button>
            </form>
        </div>
    );
};

export default deleteAppointment;