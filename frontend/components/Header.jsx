import React from 'react'
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';

const CustomerDashboard = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/addAppointment");
  }


  return (
    <div>

      <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>AutoExpert</Navbar.Brand>
          <Nav className="ml-auto">

          <Nav.Link as={Link} to="/">Add Apointment</Nav.Link>
          <Nav.Link as={Link} to="/">View Appointment</Nav.Link>
          <Nav.Link as={Link} to="/">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/">About</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      </div>

      <div>
        CustomerDashboard
      </div>

    </div>
  )
}

export default CustomerDashboard