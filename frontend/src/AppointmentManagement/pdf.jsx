import React from 'react';
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg";
import add from "../Images/add.jpg"; 

const DownloadPDF = () => {
  const downloadPDF = async () => {
    try {
      const response = await fetch("http://localhost:8070/api/appointment/generate-pdf", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "appointments.pdf";
      link.click();
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Failed to download PDF. Please try again.");
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
              
    <div style={styles.container}>
      <h1 style={styles.header}>Export Appointments</h1>
      <p style={styles.p}>Click below to download all appointment records as a PDF.</p>
      <button style={styles.button} onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
    </div>
    </div>
  );
  
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "40px",
    marginBottom: "20px",
    color: "#FFF",
  },
  p:{
    color:"#FFF"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    margin:"20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  
  },

};
export default DownloadPDF;
