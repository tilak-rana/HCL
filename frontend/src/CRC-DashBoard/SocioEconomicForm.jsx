import { useState, useEffect } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const SocioEconomicForm = () => {
  const [participantId, setParticipantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employmentStatus: "",
    jobTitle: "",
    educationLevel: "",
  });

  // Fetch participant ID from API
  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/participant/id");
        setParticipantId(response.data.participantId);
      } catch (error) {
        console.error("Error fetching participant ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!participantId) {
      alert("Participant ID is required to submit the form.");
      return;
    }

    try {
      await axios.patch(`http://localhost:8000/api/participant/${participantId}/socio-economic`, formData);
      alert("Socioeconomic data saved successfully!");
    } catch (error) {
      console.error("Error submitting socioeconomic data:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-secondary">Loading Participant Info...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Update Socioeconomic and Cultural Information</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Employment Status:</label>
              <select
                className="form-select"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select Employment Status</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Occupation/Job Title:</label>
              <input
                type="text"
                className="form-control"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter Job Title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Education Level:</label>
              <select
                className="form-select"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Education Level</option>
                <option value="No Formal Education">No Formal Education</option>
                <option value="High School">High School</option>
                <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                <option value="Master’s Degree">Master’s Degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Save Socioeconomic Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocioEconomicForm;
