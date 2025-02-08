import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded

const AddressInfoForm = () => {
  const [participantId, setParticipantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // Fetch the participant ID from the API
  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/participant/id");
        setParticipantId(response.data.participantId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching participant ID:", error);
        setLoading(false);
      }
    };

    fetchParticipantId();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!participantId) {
      alert("Participant ID is required to update the address.");
      return;
    }

    try {
      await axios.patch(`http://localhost:8000/api/participant/${participantId}/address-info`, formData);
      alert("Address Info updated successfully!");
    } catch (error) {
      console.error("Error updating address info:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-secondary">Loading Participant Info...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">Update Address Information</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Street Address:</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your street address"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">State/Province:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your state or province"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">ZIP/Postal Code:</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your ZIP or postal code"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your country"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Update Address Info
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressInfoForm;
