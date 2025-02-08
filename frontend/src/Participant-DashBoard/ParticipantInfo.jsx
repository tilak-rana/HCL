import { useState, useEffect } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const ParticipantInfo = () => {
  const [participant, setParticipant] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipantData = async () => {
      try {
        const response = await axios.get("https://api.example.com/participant"); // Replace with actual API
        const participantId = response.data.participantId;
        setParticipantId(participantId);

        const participantResponse = await axios.get(
          `/api/participants/${participantId}`
        );
        const visitsResponse = await axios.get(`/api/visits/${participantId}`);

        setParticipant(participantResponse.data);
        setVisits(visitsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching participant data:", error);
        setLoading(false);
      }
    };

    fetchParticipantData();
  }, [participantId]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!participant) {
    return (
      <div className="text-center mt-5 text-danger">Participant not found!</div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Participant Information</h2>
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Personal Details</h4>
          <p>
            <strong>Name:</strong> {participant.name}
          </p>
          <p>
            <strong>Age:</strong> {participant.age}
          </p>
          <p>
            <strong>Gender:</strong> {participant.gender}
          </p>
          <p>
            <strong>Contact:</strong> {participant.contactInfo}
          </p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Health Data</h4>
          <p>
            <strong>Heart Rate:</strong> {participant.healthData.heartRate} bpm
          </p>
          <p>
            <strong>Blood Pressure:</strong>{" "}
            {participant.healthData.bloodPressure}
          </p>
          <p>
            <strong>Weight:</strong> {participant.healthData.weight} kg
          </p>
          <p>
            <strong>Height:</strong> {participant.healthData.height} cm
          </p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Scheduled Visits</h4>
          {visits.length > 0 ? (
            <table className="table table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Visit Date</th>
                  <th>Visit Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id}>
                    <td>{new Date(visit.visitDate).toLocaleDateString()}</td>
                    <td>{visit.visitType}</td>
                    <td>{visit.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No scheduled visits found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantInfo;
