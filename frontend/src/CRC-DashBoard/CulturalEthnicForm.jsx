import { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const CulturalEthnicForm = () => {
  const [formData, setFormData] = useState({
    educationLevel: "",
    raceEthnicity: "",
    nationality: "",
    primaryLanguage: "",
  });

  const [participantId, setParticipantId] = useState(null);

  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const response = await axios.get("https://api.example.com/participant"); // Replace with actual API
        const id = response.data.participantId;
        setParticipantId(id);
      } catch (error) {
        console.error("Error fetching participant ID or data:", error);
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
    try {
      if (participantId) {
        await axios.put(`https://api.example.com/cultural-ethnic/${participantId}`, formData);
        alert("Cultural/Ethnic background data updated successfully!");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center">Update Cultural/Ethnic Information</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Education Level</label>
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

              <div className="mb-3">
                <label className="form-label fw-bold">Race/Ethnicity</label>
                <select
                  className="form-select"
                  name="raceEthnicity"
                  value={formData.raceEthnicity}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Race/Ethnicity</option>
                  <option value="White">White</option>
                  <option value="Black/African American">Black/African American</option>
                  <option value="Asian">Asian</option>
                  <option value="Hispanic/Latino">Hispanic/Latino</option>
                  <option value="Native American">Native American</option>
                  <option value="Pacific Islander">Pacific Islander</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Nationality/Citizenship</label>
                <input
                  type="text"
                  className="form-control"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Enter Nationality or Citizenship"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Primary Language(s)</label>
                <input
                  type="text"
                  className="form-control"
                  name="primaryLanguage"
                  value={formData.primaryLanguage}
                  onChange={handleChange}
                  placeholder="Enter Primary Language(s)"
                  required
                />
              </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success w-100">
                Update Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CulturalEthnicForm;
