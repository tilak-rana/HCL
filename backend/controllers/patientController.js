import Patient from "../models/patient.model.js";

// Controller to add a new patient to the database
export const addPatient = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      gender,
      maritalStatus,
      address,
      phoneNumber,
      email,
      employmentStatus,
      occupation,
      educationLevel,
      raceEthnicity,
      nationality,
      primaryLanguage,
      healthStatus,
      substanceUse,
      physicalActivityLevel,
      healthData
    } = req.body;

    // Create a new patient instance
    const newPatient = new Patient({
      fullName,
      dob,
      gender,
      maritalStatus,
      address,
      phoneNumber,
      email,
      employmentStatus,
      occupation,
      educationLevel,
      raceEthnicity,
      nationality,
      primaryLanguage,
      healthStatus,
      substanceUse,
      physicalActivityLevel,
      healthData
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    res.status(201).json({ message: "Patient added successfully", patient: savedPatient });
  } catch (error) {
    if (error.code === 11000) {
      // Handle unique field errors (email or phone)
      return res.status(400).json({ message: "Duplicate entry: Email or Phone already exists", error });
    }
    res.status(500).json({ message: "Error adding patient", error });
  }
};
