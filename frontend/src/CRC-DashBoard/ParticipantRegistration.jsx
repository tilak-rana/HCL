import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to include Bootstrap CSS


const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/api/participant/personal-info`, formData);
      alert("Personal Info updated successfully!");
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Update Personal Information</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Marital Status:</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Update Personal Info
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
