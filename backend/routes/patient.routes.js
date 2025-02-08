import express from "express";
import { addPatient } from "../controllers/patient.controller.js";

const patientRoute = express.Router();

// Route to add a new patient
patientRoute.post('/patients', addPatient);

export default patientRoute;
