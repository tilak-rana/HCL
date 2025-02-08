import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-Binary'],
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Other'],
    required: true,
  },

  // Contact Information
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Socioeconomic Data
  employmentStatus: {
    type: String,
    enum: ['Employed', 'Unemployed', 'Retired', 'Student', 'Other'],
    required: true,
  },
  occupation: {
    type: String,
  },
  educationLevel: {
    type: String,
    enum: ['No Formal Education', 'High School', 'Bachelor’s Degree', 'Master’s Degree', 'Doctorate', 'Other'],
  },

  // Cultural/Ethnic Background
  raceEthnicity: {
    type: String,
    enum: ['White', 'Black/African American', 'Asian', 'Hispanic/Latino', 'Native American', 'Pacific Islander', 'Mixed', 'Other'],
  },
  nationality: {
    type: String,
  },
  primaryLanguage: {
    type: String,
  },

  // Health & Lifestyle (Optional)
  healthStatus: {
    type: String,
  },
  substanceUse: {
    smoking: { type: Boolean, default: false },
    alcohol: { type: Boolean, default: false },
    drugUse: { type: Boolean, default: false },
  },
  physicalActivityLevel: {
    type: String,
  },
  healthData: {
    type: mongoose.Schema.ObjectId,
    ref: "healthDataModel",
  }
});

export default mongoose.model("Patient", patientSchema);
