import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import axios from 'axios';
import add from "../Images/add.jpg"; // Import background image

const AddAppointment = () => {
    const navigate = useNavigate(); // for navigation

    const [formData, setFormData] = useState({
        cusname: '', email: '', phone: '', vehicalmodel: '', vehicaltype: '',
        address: '', servicetype: '', date: '', time: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8070/api/appointment/add-appointment', formData);
            if (data.success) {
                alert('Appointment added successfully');
                setFormData({
                    cusname: '', email: '', phone: '', vehicalmodel: '', vehicaltype: '',
                    address: '', servicetype: '', date: '', time: ''
                });
                navigate('/MyAppointment'); // Redirect to appointment details page
            } else {
                console.error("Failed to add appointment: ", data.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 relative"
            style={{ backgroundImage: `url(${add})` }}
        >
            {/*Back Button */}
            <button 
                onClick={() => navigate('/Home')} //Navigates to Home page
                className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
                ← Back
            </button>

            <form onSubmit={onSubmitHandler} className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Book an Appointment</h1>
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
                <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded-lg w-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddAppointment;
