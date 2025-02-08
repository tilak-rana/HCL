import { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const HealthDataForm = () => {
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    respiratoryRate: "",
    bodyTemperature: "",
    oxygenSaturation: "",
    weight: "",
    height: "",
    bloodGlucose: "",
    urineOutput: "",
  });

  const [participantId, setParticipantId] = useState(null);

  // Fetch participant ID and health data when the component mounts
  useEffect(() => {
    const fetchParticipantData = async () => {
      try {
        const response = await axios.get("https://api.example.com/participant"); // Replace with actual API
        const id = response.data.participantId;
        setParticipantId(id);

        // Fetch existing health data for the participant
        const healthData = await axios.get(
          `https://api.example.com/health-data/${id}`
        );
        setFormData(healthData.data);
      } catch (error) {
        console.error("Error fetching participant data:", error);
      }
    };
    fetchParticipantData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (participantId) {
        await axios.put(
          `https://api.example.com/health-data/${participantId}`,
          formData
        );
        alert("Health data updated successfully!");
      }
    } catch (error) {
      console.error("Error updating health data:", error);
      alert("Failed to update health data.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center">Health Data</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Heart Rate (bpm)</label>
                <input
                  type="number"
                  className="form-control"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleChange}
                  placeholder="Enter Heart Rate"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Blood Pressure (Systolic)</label>
                <input
                  type="number"
                  className="form-control"
                  name="bloodPressureSystolic"
                  value={formData.bloodPressureSystolic}
                  onChange={handleChange}
                  placeholder="Enter Systolic Pressure"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Blood Pressure (Diastolic)</label>
                <input
                  type="number"
                  className="form-control"
                  name="bloodPressureDiastolic"
                  value={formData.bloodPressureDiastolic}
                  onChange={handleChange}
                  placeholder="Enter Diastolic Pressure"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Respiratory Rate (breaths/min)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={handleChange}
                  placeholder="Enter Respiratory Rate"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Body Temperature (°F)</label>
                <input
                  type="number"
                  className="form-control"
                  name="bodyTemperature"
                  value={formData.bodyTemperature}
                  onChange={handleChange}
                  placeholder="Enter Body Temperature"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Oxygen Saturation (SpO₂ %)</label>
                <input
                  type="number"
                  className="form-control"
                  name="oxygenSaturation"
                  value={formData.oxygenSaturation}
                  onChange={handleChange}
                  placeholder="Enter Oxygen Saturation"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Enter Weight"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Enter Height"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Blood Glucose (mg/dL)</label>
                <input
                  type="number"
                  className="form-control"
                  name="bloodGlucose"
                  value={formData.bloodGlucose}
                  onChange={handleChange}
                  placeholder="Enter Blood Glucose Level"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Urine Output (mL/day)</label>
                <input
                  type="number"
                  className="form-control"
                  name="urineOutput"
                  value={formData.urineOutput}
                  onChange={handleChange}
                  placeholder="Enter Urine Output"
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success w-100">
                Save and Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HealthDataForm;
