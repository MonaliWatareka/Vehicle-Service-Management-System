import mongoose from "mongoose";

const appoinmentSchema = new mongoose.Schema({
  cusname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "0000000000" },
  vehicalmodel: { type: String, required: true },
  vehicaltype: { type: String, default: "Not Selected" },
  address: { type: String, required: true },
  servicetype: { type: String, default: "Air Filter" },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appoinmentSchema);

export default appointmentModel;
