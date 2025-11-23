import express from "express";
import {
  addAppoinment,
  displayAllAppointment,
  displaySingleAppointment,
  deleteAppointment,
  updateAppointment,
  displayAppointmentById,
  generatePDF,
} from "../controllers/appoinmentController.js";

const appointmentRoute = express.Router();

appointmentRoute.post("/add-appointment", addAppoinment);
appointmentRoute.get("/all-appointments", displayAllAppointment);
appointmentRoute.get("/latest-appointment", displaySingleAppointment);
appointmentRoute.get("/single-appointment/:id", displaySingleAppointment);
appointmentRoute.delete("/delete-appointment/:id", deleteAppointment);
appointmentRoute.put("/update-appointment/:id", updateAppointment);
appointmentRoute.get("/display-appointment/:id", displayAppointmentById);
appointmentRoute.get("/generate-pdf", generatePDF);


export default appointmentRoute;
