import validator from "validator";
import puppeteer from "puppeteer";
import appointmentModel from "../models/appoinmentModel.js";

//API for adding customers
const addAppoinment = async (req, res) => {
  try {
    const {
      cusname,
      email,
      phone,
      vehicalmodel,
      vehicaltype,
      address,
      servicetype,
      date,
      time,
    } = req.body;

    // checking for all data to add customer
    if (
      !cusname ||
      !email ||
      !phone ||
      !vehicalmodel ||
      !vehicaltype ||
      !address ||
      !servicetype ||
      !date ||
      !time
    ) {
      console.log(
        cusname,
        email,
        phone,
        vehicalmodel,
        vehicaltype,
        address,
        servicetype,
        date,
        time
      );
      return res.json({ success: false, message: "Missing Details" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const appoimentData = {
      cusname,
      email,
      phone,
      vehicalmodel,
      vehicaltype,
      address: address, // If it's a string, no need for JSON.parse()
      servicetype,
      date: Date.now(),
      time: new Date(),
    };

    const newAppointment = new appointmentModel(appoimentData);
    await newAppointment.save();

    // Fetch the latest appointment 
    const latestAppointment = await appointmentModel
      .findOne()
      .sort({ _id: -1 }); // Sort by _id to get the most recent one

    res.json({
      success: true,
      message: "appoiment Added",
      appointment: latestAppointment,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};

//display data

const displayAllAppointment = async (req, res) => {
  try {
    const AllAppointment = await appointmentModel.find();

    return res.json({ success: true, AllAppointment });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const displaySingleAppointment = async (req, res) => {
  try {
    // Fetch the latest appointment (no need for appointmentId from URL)
    const latestAppointment = await appointmentModel
      .findOne()
      .sort({ _id: -1 }); // Sort by _id to get the most recent one

    if (!latestAppointment) {
      return res.json({
        success: false,
        message: "No appointment found",
      });
    }

    res.json({
      success: true,
      appointment: latestAppointment,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching the latest appointment: " + error.message,
    });
  }
};

//delete Appointment

const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await appointmentModel.findByIdAndDelete(appointmentId);
    return res.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update

const updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const {
      cusname,
      email,
      phone,
      vehicalmodel,
      vehicaltype,
      address,
      servicetype,
      date,
      time,
    } = req.body;

    if (
      !cusname ||
      !email ||
      !phone ||
      !vehicalmodel ||
      !vehicaltype ||
      !address ||
      !servicetype ||
      !date ||
      !time
    ) {
      return res.json({
        success: false,
        message: "All fields are required...",
      });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      $set: {
        cusname,
        email,
        phone,
        vehicalmodel,
        vehicaltype,
        address,
        servicetype,
        date,
        time,
      },
    });
    return res.json({
      sucess: true,
      message: "appointment updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const displayAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.json({
        success: false,
        message: "No appointment found",
      });
    }

    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching appointment: " + error.message,
    });
  }
};
// Generate PDF
const generatePDF = async (req, res) => {
  try {
    const appointments = await appointmentModel.find();

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h1>Appointment List</h1>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle Model</th>
                <th>Type</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              ${appointments.map(app => `
                <tr>
                  <td>${app.cusname}</td>
                  <td>${app.email}</td>
                  <td>${app.phone}</td>
                  <td>${app.vehicalmodel}</td>
                  <td>${app.vehicaltype}</td>
                  <td>${app.servicetype}</td>
                  <td>${new Date(app.date).toLocaleDateString()}</td>
                  <td>${new Date(app.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // ✅ Helps on Linux servers
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=appointments.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate PDF: " + error.message });
  }
};


export {
  addAppoinment,
  displayAllAppointment,
  displaySingleAppointment,
  deleteAppointment,
  updateAppointment,
  displayAppointmentById,
  generatePDF,
};
